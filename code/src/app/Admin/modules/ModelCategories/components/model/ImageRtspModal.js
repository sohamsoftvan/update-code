import React, {useEffect, useRef, useState} from 'react';
import { Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {Row, Col} from "reactstrap";
import 'react-image-crop/dist/ReactCrop.css';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {
    RegionSelect
} from "../../../../../ResultManager/modules/MyResults/components/DeployedRTSPJobs/MyResultTable/my-result-table/Region_Lib/RegionSelect";
import {warningToast} from "../../../../../../utils/ToastMessage";
import TimerIcon from "@mui/icons-material/Timer";
import {
    getCredits, getInferJob, loadRtspInferJob,
    startTesting,
    updateCredits, uploadRtspInferJob,
} from "../../_redux/Model/TestModalApi";
import {addNotification} from "../../../Notification/_redux/notification";
import {shallowEqual, useSelector} from "react-redux";
import Boundingbox from "image-bounding-box-custom";
import BootstrapTable from "react-bootstrap-table-next";
import {loadImageFromRtspURL} from "../../../Cameras/_redux/CameraAPI";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomFrameControls from "../../../../../../utils/SuperAdmin/CustomFrameControls";

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

function ImageRtspModal({show, model, modelName, closeImageRtspModal}) {
    const [rtsp, setRtsp] = useState('');
    const [frames, setFrames] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFrame, setSelectedFrame] = useState(null);
    const [boundingboxModal, setBoundingboxModal] = useState(false);
    const [regions, setRegions] = useState([]);
    const [regionsStoreData, setRegionsStoreData] = useState([]);
    const [curReg, setCurReg] = useState(-1);
    const [scale, setScale] = useState(1);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const [totalMills, setTotalMills] = useState(1000 * 60 * 5);
    const [jobData, setJobData] = useState({});
    const [time, setTime] = useState(0);
    const [closeCreditScore, setCloseCreditScore] = useState(false);
    const [creditData, setCreditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startTest, setStartTest] = useState(false);
    const [isCreditOver, setIsCreditOver] = useState(false);
    const [temp, setTemp] = useState(true);
    const [detectionResponse, setDetectionResponse] = useState(false);
    const [result, setResult] = useState({});
    const [imageSelected, setImageSelected] = useState({});
    const [isFullView, setIsFullView] = React.useState(false);
    const [col, setCol] = React.useState(columns);


    const dataOfTable = [];
    const countLabel = [];
    const totalCount = [];
    const dt = [];

    const [data, setData] = useState(dt);

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


    const {user} = useSelector(
        ({auth}) => ({
            user: auth.user
        }),
        shallowEqual
    );

    const onImageClick = img => {
        setImageSelected(img);
        const toggle = !isFullView;
        setIsFullView(toggle);
    };

    const handleRtspChange = (event) => {
        setRtsp(event.target.value);
        setFrames('');
        setErrorMessage('')
    };


    const processFile = async () => {
        if (rtsp) {
            setProcessing(true);
            setFrames('');

            const { data: byteArray, isSuccess } = await loadImageFromRtspURL(rtsp);
            if(isSuccess){
                setFrames(byteArray);
            }
            if(!byteArray) {
                setErrorMessage('RTSP not working')
            }

            setProcessing(false);
        }
    };

    const handleRegionClick = (event, index) => {
        setCurReg(index);
    };

    const handleZoom = event => {
        setScale(event.scale);
    };

    const onChange = reg => {
        let OrignalWidth;
        let OrignalHeight;

        if (selectedFrame) {
            const img = new Image();
            img.src = selectedFrame;
            img.onload = () => {
                OrignalWidth = img.width;
                OrignalHeight = img.height;

                let detection_data = reg.map(x => ([
                    x.x * (OrignalWidth / 100),
                    x.y * (OrignalHeight / 100),
                    (x.width * (OrignalWidth / 100)) + (x.x * (OrignalWidth / 100)),
                    (x.height * (OrignalHeight / 100)) + (x.y * (OrignalHeight / 100))
                ]));

                setRegions(reg);
                setRegionsStoreData(detection_data);
                setUndoStack(prev => [...prev, {regions: reg, regionsStoreData: detection_data}]);
                setRedoStack([]);
            };
        }
    };

    const imageSelect = (frameUrl) => {
        if (regions.length > 0 && selectedFrame !== frameUrl) {
            warningToast("First remove the old frame region after new frame annotated")
        } else {
            setSelectedFrame(frameUrl);
            setBoundingboxModal(true);
        }

    };


    const closeBoudingBoxModal = () => {
        setBoundingboxModal(false);
    };

    const resetRegions = () => {
        setRegions([]);
        setRegionsStoreData([]);
        setUndoStack([]);
        setRedoStack([]);
    };

    const undoRegion = () => {
        const lastState = undoStack.pop();
        if (lastState) {
            setRedoStack(prev => [...prev, {regions, regionsStoreData}]);
            setRegions(lastState.regions);
            setRegionsStoreData(lastState.regionsStoreData);
        }
    };

    const redoRegion = () => {
        const redoState = redoStack.pop();
        if (redoState) {
            setUndoStack(prev => [...prev, {regions, regionsStoreData}]);
            setRegions(redoState.regions);
            setRegionsStoreData(redoState.regionsStoreData);
        }
    };

    const deleteAllRegions = () => {
        setRegions([]);
        setRegionsStoreData([]);
    };

    function getMins() {
        const minutes = Math.floor(totalMills / 60000);
        const seconds = ((totalMills % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const startTimer = time => {
        setTotalMills(time || 1000 * 60 * 5);
        const timer = setInterval(() => {
            setTotalMills(tm => {
                if (tm <= 0) {
                    clearInterval(timer);
                    closeImageRtspModals()
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

    useEffect(() => {
        if (show)
            (async () => {
                try {

                    const {data: startedModelData, isSuccess} = await startTesting(
                        model.id,
                        model.status
                    );
                    setJobData(jobData => ({...jobData, ...startedModelData}));
                    if (!isSuccess) {
                        warningToast("Error in starting the test for image");
                    } else {
                        setLoading(true);
                        setStartTest(false);
                        startTimer();
                        countTime();
                        const {data: getCreditsScore, isSuccess} = await getCredits();
                        if (!isSuccess) {
                            warningToast("Error getting credits");
                        } else {
                            setCreditData(getCreditsScore[0]);
                            updateCreditsScore(getCreditsScore[0]);
                        }
                    }
                } catch (error) {
                    if (error.detail) {
                       console.log("error.detail",error.detail)
                    }
                }
            })();
        // eslint-disable-next-line
    }, [show]);

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
                    console.log("Error in adding ViolationNotification" ,e);
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
            clearInterval(creditScore.current);
            addNotification(data).catch(e => {
                console.log("Error in adding ViolationNotification",e);
            });
        }
    };


    const updateCreditsApi = creditsData => {
        try {
            (async () => {
                const {data: updatedCreditDetails, isSuccess} = await updateCredits(
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
               console.log("error.detail",error.detail)
            }
        }
    };

    const creditScore = useRef(null);

    const closeImageRtspModals = () => {
        try {
            (async () => {
                setCloseCreditScore(true);
                clearInterval(creditScore.current);
                const seconds = time % 60;
                let crData = {...creditData};
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
            closeImageRtspModal(false);
        } catch (error) {
            if (error.detail) {
               console.log("error.detail",error.detail)
            }
        }
    };


    const testModal = async () => {
        try {
            let response
            let responseNew
            let responseImage
            setStartTest(true);
            setLoading(false);
            var isSuccess1, result2;

                if (model.id === 101 || model.id === 102) {
                    responseNew = await uploadRtspInferJob(jobData.id, rtsp, regionsStoreData);
                } else {
                    response = await loadRtspInferJob(jobData.id, rtsp, JSON.stringify(regionsStoreData));
                }

                if (responseNew) {
                    if (responseNew?.data === "Data inserted") {
                        setLoading(false)
                        setStartTest(false);
                    }
                } else {
                    result2 = response?.data;
                    isSuccess1 = response.isSuccess;

                }
            if (!isSuccess1) {
                if (responseNew?.data === "Data inserted") {
                    setDetectionResponse(false);
                    setLoading(false);
                    let outputapicall = await getInferJob(jobData.id);
                    if (Object.keys(outputapicall.data).length > 0) {
                        if (outputapicall.data.process_status) {
                            setResult(outputapicall?.data?.meta_data);
                            setDetectionResponse(false);
                            setLoading(true);
                            setStartTest(true)
                        } else {
                            setDetectionResponse(true);
                            setLoading(true);
                        }
                    } else {
                        // Call the API initially
                        const intervalId = setInterval(async () => {
                            outputapicall = await getInferJob(jobData.id);
                            if (Object.keys(outputapicall.data).length > 0) {
                                if (outputapicall.data.process_status) {
                                    setResult(outputapicall?.data?.meta_data);
                                    setDetectionResponse(false);
                                    setLoading(true);
                                    setStartTest(true)
                                    clearInterval(intervalId);  // Stop the interval when data is received
                                } else {
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
                }

            }
            else {
                setResult(result2);
                setDetectionResponse(false);
                setLoading(true);
                setTimeout(() => closeImageRtspModals(), totalMills);
                window.addEventListener("beforeunload", ev => {
                    ev.preventDefault();
                    closeImageRtspModals();
                });
            }
        } catch (error) {
            setDetectionResponse(true);
            setLoading(true);
            setCloseCreditScore(true);
            if (error.detail) {
               console.log("error.detail",error.detail)
            }
        }
    };


    return (
        <>
            <CommonModal
                size="xl"
                show={show}
                handleClose={closeImageRtspModals}
                arialabelledby="example-modal-sizes-title-xl"
                title={modelName}
                className={(boundingboxModal || isFullView) ? "lower-z-index" : ""}
                backdrop="static"
                closeButtonFlag={true}
                applyButton={false}
                content={
                    <>
                        {!loading ? (
                            <>
                                <div className="overlay-layer bg-transparent text-center">
                                    <div className="spinner-border text-info text-center"/>
                                </div>
                                <div className="w-100 text-center">
                                    <b>Processing Input</b>
                                </div>
                            </>
                        ) : !detectionResponse ? (
                            <>

                                <Row>
                                    <Col xs={12} lg={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>RTSP</Form.Label>
                                            <Form.Control type="text" value={rtsp} onChange={handleRtspChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} lg={4}>
                                    </Col>
                                    <Col xs={12} lg={3} className="d-flex justify-content-center align-items-center">
                                        {/*|| !video*/}
                                        <Button color="primary" onClick={processFile}
                                                disabled={processing || !!errorMessage || !rtsp}>
                                            {processing ? "Processing..." : "Submit"}
                                        </Button>
                                    </Col>
                                    <Col lg={1} sm={12} className="text-right">
                                        <div
                                            className="d-inline-block"
                                            style={{fontSize: 15, width: 48}}
                                        >
                                            {getMins()}
                                        </div>
                                        <div
                                            className="d-inline-block"
                                            style={{width: 50, fontSize: 18}}
                                        >
                                            <TimerIcon/>
                                        </div>
                                    </Col>

                                    <Col xs={12} lg={12}>
                                        {errorMessage && (
                                            <p style={{color: "red", fontSize: "14px", marginTop: "5px"}}>
                                                {errorMessage}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <hr/>

                                {!startTest &&
                                    <Row>
                                        <Col lg={12} xl={12} sm={12}>
                                            {frames && <h3>Extracted Frames:</h3>}
                                        </Col>
                                        <Col lg={9} xl={9} sm={12}>
                                            {frames && (
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                                        gap: "10px",
                                                        height: "500px",
                                                        overflowY: "auto",
                                                        border: "1px solid #ccc",
                                                        padding: "10px",
                                                        borderRadius: "5px"
                                                    }}
                                                >
                                                    <img
                                                        src={`data:image/png;base64,${frames}`}
                                                        name={rtsp}
                                                        style={{
                                                            width: "100%",
                                                            cursor: "pointer",
                                                            border: regions?.length > 0 && frames
                                                                ? "2px solid red"  // Mark frames that have annotations
                                                                : "none",
                                                            borderRadius: "5px",
                                                            transition: "border 0.2s ease-in-out"
                                                        }}
                                                        onClick={() => imageSelect(`data:image/png;base64,${frames}`)}
                                                    />
                                                </div>
                                            )}
                                        </Col>
                                        <Col lg={3} xl={3} sm={12}>
                                            {regionsStoreData.length > 0 && !boundingboxModal && (
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                                        gap: "10px",
                                                        height: "500px",
                                                        overflowY: "auto",
                                                        border: "1px solid #ccc",
                                                        padding: "10px",
                                                        borderRadius: "5px"
                                                    }}
                                                >
                                                    {regionsStoreData.map((region, index) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                borderBottom: "1px solid #ddd",
                                                            }}
                                                        >
                                                            <p><strong>Selected ROI - {index + 1}</strong></p>
                                                            <p><strong>x:</strong> {region[0]}</p>
                                                            <p><strong>y:</strong> {region[1]}</p>
                                                            <p><strong>Width:</strong> {region[2]}</p>
                                                            <p><strong>Height:</strong> {region[3]}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </Col>

                                    </Row>}

                                {startTest ? (
                                    <Row>
                                        {result.length > 0 ?
                                            <>
                                                <Col xl={8} xs={12} md={12} lg={12} sm={12}>
                                                    <TransformWrapper
                                                        defaultScale={1}
                                                        defaultPositionX={200}
                                                        defaultPositionY={100}
                                                    >
                                                        {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                                                            <React.Fragment>
                                                                <div
                                                                    className="boundimage-full"
                                                                    style={{width: "100%", margin: "0 auto"}}
                                                                >
                                                                    <div className="tools mb-2 text-right">
                                                                        <CustomFrameControls
                                                                            zoomIn={zoomIn}
                                                                            zoomOut={zoomOut}
                                                                            resetTransform={resetTransform}
                                                                            frameData={true}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="w-100"
                                                                        style={{height: "400px", overflow: "auto"}}
                                                                    >
                                                                        {result !== "No Detection Found" &&
                                                                            result.length > 0 && (
                                                                                result.map(img => (
                                                                                    <div onClick={() => onImageClick(img)}>
                                                                                        <div style={{height: "5px"}}></div>
                                                                                        <TransformComponent
                                                                                            style={{width: "100%"}}
                                                                                        >
                                                                                            <Boundingbox
                                                                                                className="row m-auto mt-2 mb-2 col-12 p-0 text-center"
                                                                                                image={img?.image_url}
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
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )}
                                                    </TransformWrapper>
                                                </Col>
                                                {result.length > 0 &&
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
                                            </>: <b style={{color: "red"}}>
                                                No Results Found
                                            </b>}
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
                            <CustomizedButtons className={'btn mr-2'} color={'secondary'} title={'Cancel'} submit={closeImageRtspModal}/>
                            <CustomizedButtons className={'btn'} color={'primary'} title={'Next'} submit={testModal}
                                               flag={isCreditOver || regionsStoreData.length === 0}/>
                        </div>
                    </>
                }
                footerCustom={true}

            />

            <CommonModal
                size="lg"
                show={boundingboxModal}
                handleClose={closeBoudingBoxModal}
                arialabelledby="example-modal-sizes-title-lg"
                title={"Bounding box Selected Frame"}
                backdrop="static"
                closeButtonFlag={true}
                applyButton={false}
                content={
                    <>
                        <div className={'d-flex mb-3'}>
                            <CustomFrameControls
                                resetRegions={resetRegions}
                                undoRegion={undoRegion}
                                redoRegion={redoRegion}
                                deleteAllRegions={deleteAllRegions}
                                boundingBoxFrame={true}
                            />
                        </div>


                        <TransformWrapper
                            defaultScale={1}
                            defaultPositionX={200}
                            defaultPositionY={100}
                            initialScale={1}
                            onZoomChange={handleZoom}
                            pan={{disabled: true}}
                            wheel={{limitsOnWheel: true}}
                            options={{
                                centerContent: true,
                                limitToBounds: true,
                                maxScale: 2
                            }}
                        >
                            {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                                <React.Fragment>
                                    <div className="boundimage-full w-100" style={{margin: "0 auto"}}>
                                        <TransformComponent>
                                            <RegionSelect
                                                regions={regions}
                                                constraint
                                                onChange={onChange}
                                                onClick={handleRegionClick}
                                                scale={scale}
                                            >
                                                <img
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "90vh",
                                                        margin: "auto",
                                                        width: 752,
                                                        height: 470
                                                    }}
                                                    src={selectedFrame}
                                                    width="100%"
                                                    height="100%"
                                                    alt=""
                                                />
                                            </RegionSelect>
                                        </TransformComponent>
                                    </div>
                                </React.Fragment>
                            )}
                        </TransformWrapper>

                    </>
                }
            />
            <CommonModal
                show={isFullView}
                handleClose={() => setIsFullView(false)}
                content={
                <>
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

export default ImageRtspModal;


