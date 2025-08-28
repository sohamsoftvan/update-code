import {Col,Row} from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import "photoswipe/style.css";
// import "photoswipe/dist/photoswipe.css";
// import "photoswipe/dist/default-skin/default-skin.css";
import {
  getCredits, getInferJob,
  loadInferJob,
  loadVideoInferJob,
  startTesting,
  updateCredits, uploadVideoInferJob
} from "../../_redux/Model/TestModalApi";
import { warningToast } from "../../../../../../utils/ToastMessage";
import { urlToFile } from "../../../../../../utils/FileConverter";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Boundingbox from "image-bounding-box-custom";
import TimerIcon from "@mui/icons-material/Timer";
import { Input } from "reactstrap";
import { addNotification } from "../../../Notification/_redux/notification";
import { shallowEqual, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import BootstrapTable from "react-bootstrap-table-next";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomFrameControls from "../../../../../../utils/SuperAdmin/CustomFrameControls";

export function StartTestingModal({ model, show, setShow }) {
  const [jobData, setJobData] = React.useState({});
  const [result, setResult] = React.useState({});
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [totalMills, setTotalMills] = React.useState(1000 * 60 * 5);
  const [loading, setLoading] = React.useState(false);
  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const [startTest, setStartTest] = React.useState(false);
  const [File, setFile] = React.useState(null);
  const [time, setTime] = React.useState(0);
  const [closeCreditScore, setCloseCreditScore] = React.useState(false);
  const [creditData, setCreditData] = React.useState(null);
  const [isFileSupported, setIsFileSupported] = React.useState(true);
  const [isVideoUploaded, setIsVideoUploaded] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState({});
  const [isFullView, setIsFullView] = React.useState(false);
  const [isCreditOver, setIsCreditOver] = React.useState(false);
  const [fileErrorMsg, setFileErrorMsg] = React.useState("");
  const [detectionResponse, setDetectionResponse] = React.useState(false);
  const columns = [
    {
      dataField: "label",
      text: "Labels"
    },
    {
      dataField: "total_detection",
      text: "Total Detection"
    }
  ];
  const dataOfTable = [];
  const countLabel = [];
  const totalCount = [];
  const [col, setCol] = React.useState(columns);
  const dt = [];
  const [data, setData] = React.useState(dt);
  const [temp, setTemp] = React.useState(true);
  const checkCount = (dataOfTable, countLabel) => {
    for (let i = 0; i < dataOfTable.length; i++) {
      let counter = 0;
      for (let j = 0; j < countLabel.length; j++) {
        if (dataOfTable[i] === countLabel[j]) {
          counter++;
        }
      }
      totalCount.push(counter);
      let obj = {
        label: dataOfTable[i],
        total_detection: totalCount[i]
      };
      dt.push(obj);
    }
    setCol(columns);
    setData(dt);
    setTemp(false);
  };
  // eslint-disable-next-line
  const { isAuthorized = false, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user?.id && new Cookies().get("access_token"),
      user: auth.user
    }),
    shallowEqual
  );

  const onImageClick = img => {
    setImageSelected(img);
    const toggle = !isFullView;
    setIsFullView(toggle);
  };

  const startTimer = time => {
    setTotalMills(time || 1000 * 60 * 5);
    const timer = setInterval(() => {
      setTotalMills(tm => {
        if (tm <= 0) {
          clearInterval(timer);
          closeTestModal();
        }
        return tm - 1000;
      });
    }, 1000);
  };
  const countTime = () => {
    const timer = setInterval(() => {
      setTime(tm => {
        if (closeCreditScore) {
          clearInterval(timer);
        }
        return tm + 1;
      });
    }, 1000);
  };
  const updateCreditsApi = creditsData => {
    try {
      (async () => {
        const { data: updatedCreditDetails, isSuccess } = await updateCredits(
          creditsData
        );
        if (!isSuccess) {
          warningToast("Error in updating credits");
        } else {
          setCreditData(updatedCreditDetails);
          return null;
        }
      })();
    } catch (error) {
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
    }
  };

  const creditScore = useRef(null);
  const updateCreditsScore = creditsData => {
    let credits = creditsData["total_credits"];
    creditScore.current = setInterval(() => {
      if (credits <= 0) {
        clearInterval(creditScore.current);
        let data = {
          notification_message: "Your credits are over ",
          type_of_notification: "string",
          user_id: user?.id,
          status: true,
          is_unread: true
        };
        warningToast("You don't have enough credits to perform this operation");
        addNotification(data).catch(e => {
          warningToast("Error in adding ViolationNotification");
        });
      } else if (closeCreditScore) {
        clearInterval(creditScore.current);
      } else {
        credits = credits - 1;
        if (credits < 0) {
          credits = 0;
        }
        creditsData["total_credits"] = credits.toFixed(2);
        creditsData["updated_date"] = new Date().toISOString();
        updateCreditsApi(creditsData);
      }
    }, 1000 * 60);
    if (credits <= 0) {
      setIsCreditOver(true);
      let data = {
        notification_message: "Your credits are over ",
        type_of_notification: "string",
        user_id: user?.id,
        status: true,
        is_unread: true
      };
      warningToast("You don't have enough credits to perform this operation");
      clearInterval(creditScore.current);
      addNotification(data).catch(e => {
        warningToast("Error in adding ViolationNotification");
      });
    }
  };

  useEffect(() => {
    if (show)
      (async () => {
        try {
          //const { imageSize, confThresh, iouThresh } = testData;
          const { data: startedModelData, isSuccess } = await startTesting(
            model.id,
            model.status
          );
          setJobData(jobData => ({ ...jobData, ...startedModelData }));
          if (!isSuccess) {
            warningToast("Error in starting the test for image");
          } else {
            setLoading(true);
            setStartTest(false);
            startTimer();
            countTime();
            const { data: getCreditsScore, isSuccess } = await getCredits();
            if (!isSuccess) {
              warningToast("Error getting credits");
            } else {
              setCreditData(getCreditsScore[0]);
              updateCreditsScore(getCreditsScore[0]);
            }
          }
        } catch (error) {
          if (error.detail) {
            warningToast(error.detail);
          } else {
            warningToast("Something went Wrong");
          }
        }
      })();
    // eslint-disable-next-line
  }, [show]);

  const closeTestModal = () => {
    try {
      (async () => {
        setCloseCreditScore(true);
        clearInterval(creditScore.current);
        const seconds = time % 60;
        let crData = { ...creditData };
        if (seconds !== 0 && crData.total_credits > 0) {
          crData.total_credits = parseFloat(
            (crData.total_credits - seconds / 60).toFixed(2)
          );
          if (crData.total_credits < 0) {
            crData.total_credits = 0;
          }
          crData.updated_date = new Date().toISOString();
          updateCreditsApi(crData);
        }

        window.addEventListener("beforeunload", null);
      })();
      setShow(false);
    } catch (error) {
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
    }
  };

  const uploadFile = (base64, filename, fileExtension) => {
    (async () => {
      try {
        setIsFileUploaded(false);
        if (["mp4", "avi"].includes(fileExtension)) {
          const file = await urlToFile(
            base64,
            "video." + fileExtension,
            fileExtension === "mp4" ? "video/mp4" : "video/x-msvideo"
          );
          setFile(file);
        } else {
          const file = await urlToFile(base64, "image.jpeg", "text/jpeg");
          setSelectedImage(base64);
          setFile(file);
        }
        setIsFileUploaded(true);
      } catch (error) {
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      }
    })();
  };

  function getMins() {
    const minutes = Math.floor(totalMills / 60000);
    const seconds = ((totalMills % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const testModal = async () => {
    try {
      let response
      let responseNew
      let responseImage
      setStartTest(true);
      setLoading(false);
      setIsFileUploaded(false);
      var isSuccess1, result2;
      if (isVideoUploaded) {

        if(model.id === 101 || model.id === 102 ){
          responseNew = await uploadVideoInferJob(jobData.id, File);
        }else {
          response = await loadVideoInferJob(jobData.id, File);
        }

        if(responseNew) {
          if(responseNew?.data === "File Uploaded"){
            setLoading(false)
            setStartTest(false);
          }
        }else if(responseImage){
          if(responseImage?.data === "File Uploaded"){
            setLoading(false)
            setStartTest(false);
          }
        } else {
          result2 = response.data;
          isSuccess1 = response.isSuccess;
        }
      } else {
        if(model.id === 101 || model.id === 102 ){
          responseImage = await uploadVideoInferJob(jobData.id, File);
        }else {
          response = await loadInferJob(jobData.id, File);
        }

        if(responseNew) {
          if(responseNew?.data === "File Uploaded"){
            setLoading(false)
            setStartTest(false);
          }
        }else if(responseImage){
          if(responseImage?.data === "File Uploaded"){
            setLoading(false)
            setStartTest(false);
          }
        }

        else {
          result2 = response.data;
          isSuccess1 = response.isSuccess;
        }
      }
      if (!isSuccess1) {
        if(responseNew?.data === "File Uploaded"){
          setDetectionResponse(false);
          setLoading(false);
          let outputapicall = await getInferJob(jobData.id);
          if(Object.keys(outputapicall.data).length > 0){
              if(outputapicall.data.process_status  ){
                setResult(outputapicall?.data?.meta_data);
                setDetectionResponse(false);
                setLoading(true);
                setStartTest(true)
                setIsVideoUploaded(true)
              }else {
                setDetectionResponse(true);
                setLoading(true);
              }
          }else {
            // Call the API initially
            const intervalId = setInterval(async () => {
              outputapicall = await getInferJob(jobData.id);
              if (Object.keys(outputapicall.data).length > 0) {
                if(outputapicall.data.process_status){
                  setResult(outputapicall?.data?.meta_data);
                  setDetectionResponse(false);
                  setLoading(true);
                  setStartTest(true)
                  setIsVideoUploaded(true)
                  clearInterval(intervalId);  // Stop the interval when data is received
                }else {

                  setDetectionResponse(true);
                  setLoading(true);
                }
              }
            }, 3000); // 3 seconds interval
            // Stop after 90 seconds
            setTimeout(() => {
              clearInterval(intervalId);  // Clear the interval after 90 seconds
              setLoading(true)
              setDetectionResponse(true);
              }, 90000); // 90 seconds
          }
        }
        else if(responseImage?.data === "File Uploaded"){
          setDetectionResponse(false);
          setLoading(false);
          let outputapicallImages = await getInferJob(jobData.id);
          if(Object.keys(outputapicallImages.data).length > 0){

            if(outputapicallImages.data.process_status){
              setResult(outputapicallImages.data.meta_data[0]);
              setSelectedImage(outputapicallImages.data.meta_data[0]?.image_url);
              setDetectionResponse(false);
              setLoading(true);
              setStartTest(true)
              setIsVideoUploaded(false)

            }else {
              setDetectionResponse(true);
              setLoading(true);
            }
          }else {

            // Call the API initially
            const intervalId = setInterval(async () => {
              outputapicallImages = await getInferJob(jobData.id);

              if (Object.keys(outputapicallImages.data).length > 0) {
                if(outputapicallImages.data.process_status){
                  setResult(outputapicallImages.data.meta_data[0]);
                  setSelectedImage(outputapicallImages.data.meta_data[0]?.image_url);
                  setDetectionResponse(false);
                  setLoading(true);
                  setStartTest(true)
                  setIsVideoUploaded(false)
                  clearInterval(intervalId);  // Stop the interval when data is received
                }else {
                  setDetectionResponse(true);
                  setLoading(true);
                }
              }
            }, 3000); // 3 seconds interval

            // Stop after 90 seconds
            setTimeout(() => {
              clearInterval(intervalId);  // Clear the interval after 90 seconds
              setLoading(true)
              setDetectionResponse(true);
            }, 90000); // 90 seconds

          }

        }
        else {
          setDetectionResponse(true);
          setLoading(true);
          warningToast("Error loading the job for testing images");
        }

      } else {
        setResult(result2);
        setDetectionResponse(false);
        setLoading(true);
        setTimeout(() => closeTestModal(), totalMills);
        window.addEventListener("beforeunload", ev => {
          ev.preventDefault();
          closeTestModal();
        });
      }
    } catch (error) {
      setDetectionResponse(true);
      setLoading(true);
      setCloseCreditScore(true);
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
    }
  };

  const onPick = e => {
    try {
      setTemp(true);
      setStartTest(false);
      const file = e.target.files[0];
      const filename = document.getElementById("upload").value;
      const filenameSplit = filename.split(".");
      const imageExtension = ["png", "jpeg", "jpg"];
      const videoExtension = ["mp4", "avi"];
      const fileExtension = filenameSplit[filenameSplit.length - 1];
      if (imageExtension.includes(fileExtension)) {
        if (file.size > 50000000) {
          setIsFileSupported(false);
          setFileErrorMsg("Please upload a file of less than 50MB");
        } else {
          //setIsFileUploaded(true);
          setIsFileSupported(true);
          setIsVideoUploaded(false);
          read(uploadFile, file, filename, fileExtension);
        }
      } else if (videoExtension.includes(fileExtension)) {
        if (file.size > 50000000) {
          setIsFileSupported(false);
          setFileErrorMsg("Please upload a file of less than 50MB");
        } else {
          setIsVideoUploaded(true);
          setIsFileSupported(true);
          read(uploadFile, file, filename, fileExtension);
        }
      } else {
        setIsVideoUploaded(false);
        setIsFileUploaded(false);
        setIsFileSupported(false);
        setFileErrorMsg("Only .mp4,.jpg,.jpeg,.png,.avi formats are supported");
      }
    } catch (error) {
      if (error.detail) {
        warningToast(error.detail);
      } else {
        warningToast("Something went Wrong");
      }
    }
  };

  function read(callback, file, filename, fileExtension) {
    try {
      let reader = new FileReader();
      reader.onload = function() {
        callback(reader.result, filename, fileExtension);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      warningToast("Can't read file");
    }
  }

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={() => setShow(false)}
          arialabelledby="example-modal-sizes-title-xl"
          title={model?.model_name}
          style={{ marginTop: "0vh" }}
          backdrop="static"
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              {!loading ? (
                  <>
                    <div className="overlay-layer bg-transparent text-center">
                      <div className="spinner-border text-info text-center" />
                    </div>
                    <div className="w-100 text-center">
                      <b>Processing Input</b>
                    </div>
                  </>
              ) : !detectionResponse ? (
                  <>
                    <Row style={{ color: "#17c191" }}>
                      <Col xl={6} xs={6} md={6} lg={6} sm={6}>
                        <Input
                            type="file"
                            color="primary"
                            id="upload"
                            onChange={onPick}
                        />
                      </Col>
                      <Col xl={6} xs={6} md={6} lg={6} sm={6} className="text-right">
                        <div
                            className="d-inline-block"
                            style={{ fontSize: 15, width: 48 }}
                        >
                          {getMins()}
                        </div>
                        <div
                            className="d-inline-block"
                            style={{ width: 50, fontSize: 18 }}
                        >
                          <TimerIcon />
                        </div>
                      </Col>
                    </Row>
                    <span
                        style={{ color: "red", display: isFileSupported ? "None" : "" }}
                    >
                {fileErrorMsg}
              </span>

                    {startTest ? (
                        <Row>
                          <Col xl={8} xs={12} md={12} lg={12} sm={12}>
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                  <React.Fragment>
                                    <div
                                        className="boundimage-full"
                                        style={{ width: "100%", margin: "0 auto" }}
                                    >
                                      <div className="tools mb-2 text-right">
                                        <CustomFrameControls
                                            zoomIn={zoomIn}
                                            zoomOut={zoomOut}
                                            resetTransform={resetTransform}
                                            frameData={true}
                                        />
                                      </div>
                                      {!isVideoUploaded ? (
                                          <TransformComponent>
                                            <Boundingbox
                                                className="row m-auto col-12 p-0 text-center "
                                                image={selectedImage}
                                                boxes={result?.detection?.map(d => ({
                                                  coord: [
                                                    d.location[0],
                                                    d.location[1],
                                                    d.location[2] - d.location[0],
                                                    d.location[3] - d.location[1]
                                                  ],
                                                  label: d.label
                                                }))}
                                                options={{
                                                  colors: {
                                                    normal: "red",
                                                    selected: "red",
                                                    unselected: "red"
                                                  },
                                                  style: {
                                                    maxWidth: "100%",
                                                    maxHeight: "90vh",
                                                    margin: "auto",
                                                    width: 700,
                                                    color: "red",
                                                    height: 470
                                                  }
                                                }}
                                            />
                                          </TransformComponent>
                                      ) : (
                                          <div
                                              className="w-100"
                                              style={{ height: "400px", overflow: "auto" }}
                                          >
                                            {result.detail !== "No Detection Found" &&
                                            result.length > 0 ? (
                                                result.map(img => (
                                                    <div onClick={() => onImageClick(img)}>
                                                      <div style={{ height: "5px" }}> </div>
                                                      <TransformComponent
                                                          style={{ width: "100%" }}
                                                      >
                                                        <Boundingbox
                                                            className="row m-auto mt-2 mb-2 col-12 p-0 text-center"
                                                            image={img["image_url"]}
                                                            boxes={img?.detection?.map(d => ({
                                                              coord: [
                                                                d.location[0],
                                                                d.location[1],
                                                                d.location[2] - d.location[0],
                                                                d.location[3] - d.location[1]
                                                              ],
                                                              label: d.label
                                                            }))}
                                                            options={{
                                                              colors: {
                                                                normal: "red",
                                                                selected: "red",
                                                                unselected: "red"
                                                              },
                                                              style: {
                                                                maxWidth: "100%",
                                                                maxHeight: "90vh",
                                                                margin: "auto",
                                                                width: 700,
                                                                color: "red",
                                                                height: 470
                                                              }
                                                            }}
                                                        />
                                                      </TransformComponent>
                                                    </div>
                                                ))
                                            ) : (
                                                <TransformComponent>
                                                  <b style={{ color: "red" }}>
                                                    No Results Found
                                                  </b>
                                                </TransformComponent>
                                            )}
                                          </div>
                                      )}
                                    </div>
                                    {!isVideoUploaded && !result?.detection?.length && (
                                        <b style={{ color: "red" }}>No Results Found</b>
                                    )}
                                  </React.Fragment>
                              )}
                            </TransformWrapper>
                          </Col>
                          {!isVideoUploaded &&
                              result?.detection?.length > 0 &&
                              result.detection.map(d => {
                                if (!dataOfTable.includes(d.label)) {
                                  dataOfTable.push(d.label);
                                  countLabel.push(d.label);
                                } else {
                                  countLabel.push(d.label);
                                }
                                return true;
                              })}
                          {isVideoUploaded &&
                              result.length > 0 &&
                              result.map(d =>
                                  d.detection.map(x => {
                                    if (!dataOfTable.includes(x.label)) {
                                      dataOfTable.push(x.label);
                                      countLabel.push(x.label);
                                    } else {
                                      countLabel.push(x.label);
                                    }
                                    return true;
                                  })
                              )}
                          {temp ? checkCount(dataOfTable, countLabel) : null}
                          <Col xl={4} xs={12} md={12} lg={12} sm={12} className="mt-2">
                            {!temp ? (
                                <>
                                  <BootstrapTable
                                      classes="table table-head-custom table-vertical-center overflow-hidden mt-3"
                                      bootstrap4
                                      wrapperClasses="table-responsive"
                                      keyField="label"
                                      bordered={false}
                                      data={data}
                                      columns={col}
                                  ></BootstrapTable>
                                </>
                            ) : null}
                          </Col>
                        </Row>
                    ) : null}
                  </>
              ) : (
                  <div className="w-100 text-center">
                    <b>Please try Again</b>
                  </div>
              )}

            </>
          }
          footerContent={
            <>
              <div className={"d-flex justify-content-end"}>
                <CustomizedButtons className={'btn mr-2'} color={'secondary'} title={'Cancel'} submit={closeTestModal}/>
                <CustomizedButtons className={'btn'} color={'primary'} title={'Test'} submit={testModal} flag={!isFileUploaded || isCreditOver}/>
              </div>
            </>
          }
          footerCustom={true}

      />


      <CommonModal
          show={isFullView}
          handleClose={() => setIsFullView(false)}
          title=""
          className="mb-lg-6"
          content={<>
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <div>
                    <div className="tools mb-2 text-right">
                      <CustomFrameControls
                          zoomIn={zoomIn}
                          zoomOut={zoomOut}
                          resetTransform={resetTransform}
                          frameData={true}
                      />
                    </div>
                    <div
                        //onClick={()=>onImageClick({})}
                    >
                      <TransformComponent>
                        <Boundingbox
                            className="row m-auto mt-2 mb-2 col-12 p-0 text-center"
                            image={imageSelected["image_url"]}
                            boxes={imageSelected?.detection?.map(d => ({
                              coord: [
                                d.location[0],
                                d.location[1],
                                d.location[2] - d.location[0],
                                d.location[3] - d.location[1]
                              ],
                              label: d.label
                            }))}
                            options={{
                              colors: {
                                normal: "red",
                                selected: "red",
                                unselected: "red"
                              },
                              style: {
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                margin: "auto",
                                width: 620,
                                color: "red",
                                height: 570
                              }
                            }}
                        />
                      </TransformComponent>
                    </div>
                  </div>
              )}
            </TransformWrapper>
          </>}
          hideFooter={true}
          size="md"
          closeButtonFlag={true}
      />
    </>
  );
}
