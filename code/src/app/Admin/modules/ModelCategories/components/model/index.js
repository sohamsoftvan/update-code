import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useSubheader} from "../../../../../../_metronic/layout";
import {Card} from "@mui/material";
import {
    CardBody,
    CardHeader
} from "../../../../../../_metronic/_partials/controls";
import {makeStyles} from "@mui/styles";
import {getOneModel} from "../../_redux/Model/ModelApi";
import {warningToast} from "../../../../../../utils/ToastMessage";
import {DeployNowTab} from "./DeployNowTab";
import BlockUi from "react-block-ui";
import SweetAlert from "react-bootstrap-sweetalert";
import {StartTestingModal} from "./StartTestingModal";
import CameraDetailsModal from "./CameraDetailsModal";
import {useDispatch} from "react-redux";
import {setModelName} from "../../../../../../redux/subscriptionReducer";
import ImageVideoModal from "./ImageVideoModal";
import VideoCameraRtspUploadModal from "./VideoCameraRtspUploadModal";
import ImageRtspModal from "./ImageRtspModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    header: {
        paddingBottom: "0rem"
    },
    title: {
        display: "inline-flex",
        margin: "1rem 0"
    },
    root: {
        flexGrow: 1
    }
}));

export default function Model() {
    const {id} = useParams();
    const classes = useStyles();
    const subheader = useSubheader();
    subheader.setTitle("Marketplace");
    const dispatch = useDispatch();
    const [loaderState, setLoaderState] = useState(false);
    const [model, setModel] = useState({});
    const [imageURL, setURL] = useState("");
    const [showSub, setSub] = React.useState(false);
    const [showCamera, setCamera] = React.useState(false);
    const [deployedJob, setDeployedJob] = React.useState({});
    const [activeId, setId] = React.useState(-1);
    const [alertData, setAlertData] = React.useState({
        show: false,
        title: "Are you sure ?"
    });
    const [show, setShow] = React.useState(false);



    const [modalShow, setModalShow] = React.useState(false);
    const [modalRoiShow, setModalRoiShow] = React.useState(false);
    const [modalRtspRoiShow, setModalRtspRoiShow] = React.useState(false);

    const handleClick = (e, URL) => {
        setId(parseInt(e.target.id));
        setURL(URL);
    };
    const handleChange = e => {
        e.target.style.border = "";
    };

    const handleSubscriber = () => {
        setSub(true);
    };

    const uploadtwo = () => {
        setModalShow(true);
    }
    const closeVideoCameraRtspUploadModal = () => {
        setModalShow(false);
    }

    const closeImageVideoModal = () =>{
        setModalRoiShow(false)
    }

    const closeImageRtspModal = () =>{
        setModalRtspRoiShow(false)
    }
    const nextModal = (data)=>{
        if(data?.value === 1) {
            setModalShow(false)
            setShow(true)

        }else if(data?.value === 2) {
            setModalShow(false)
            setModalRoiShow(true)
        }else if(data?.value === 3) {
            setModalShow(false)
            setModalRoiShow(false)
            setModalRtspRoiShow(true)

        }

    }

    useEffect(() => {
        // const upload = new FileUploadWithPreview('myFirstImage')
        (async () => {
            try {
                setLoaderState(true);
                const res = await getOneModel(id);
                if (res.isSuccess) {
                    setLoaderState(false);
                    setModel(res.data);
                    setURL(res.data.model_result_img[0].image_url);
                    dispatch(setModelName(res.data.model_name));
                    setId(0);
                } else {
                    setLoaderState(false);
                    warningToast("Error getting model details");
                    throw new Error("error getting model id");
                }
            } catch (e) {
                setLoaderState(false);
                warningToast("Something went wrong");
            }
        })();
        // eslint-disable-next-line
    }, []);



    return (
        <>
            {showSub && (
                <DeployNowTab
                    sho={showSub}
                    setSub={setSub}
                    modelId={model.id}
                    showCamera={showCamera}
                    setCamera={setCamera}
                    job={deployedJob}
                    setDeployedJob={setDeployedJob}
                />
            )}
      {showCamera && (
          <CameraDetailsModal
              showCamera={showCamera}
              setCamera={setCamera}
              job={deployedJob}
              setDeployedJob={setDeployedJob}
          />
      )}
      {show && (
          <StartTestingModal model={model} show={show} setShow={setShow}/>
      )}



            <Card className="example example-compact mb-4">
                <BlockUi tag="div" blocking={loaderState} color="#147b82">
                    <CardHeader
                        title={model?.model_name}
                        headerClassName={classes.header}
                        className={classes.title}
                    />
                    <CardBody>
                        <span>{model?.model_description}</span>
                        <div className="separator separator-dashed my-7"></div>

                        <div>
                            <img
                                style={{height: "500px"}}
                                className="d-block w-100"
                                src={
                                    imageURL ||
                                    "https://www.iotforall.com/wp-content/uploads/2018/02/Coming-Soon-to-a-Hotel-Near-You-AI-for-Building-Maintenance-696x428.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <Row className="mt-2">
                            <Col xl={4} xs={12} md={12} className="vertical mt-2">
                                <p style={{fontWeight: "bold", fontSize: "15px"}}>
                                    Choose a Sample Image
                                </p>
                                <p style={{fontSize: "12px"}}>
                                    Try our sample Images for detection.
                                </p>
                                {model?.model_result_img?.map((img, index) => {
                                    return (
                                        <img
                                            className={activeId === index ? "my-image" : "my-images"}
                                            style={{height: "110px", width: "110px"}}
                                            id={index}
                                            onClick={e => {
                                                handleClick(e, img.image_url);
                                            }}
                                            onChange={e => {
                                                handleChange(e);
                                            }}
                                            src={
                                                img?.image_url
                                                    ? img.image_url
                                                    : "https://www.iotforall.com/wp-content/uploads/2018/02/Coming-Soon-to-a-Hotel-Near-You-AI-for-Building-Maintenance-696x428.jpg"
                                            }
                                            alt="First slide"
                                        />
                                    );
                                })}
                            </Col>
                            <Col xl={4} xs={12} md={12} lg={12} sm={12}>
                                <div className="vertical2 mt-2">
                                    <p style={{fontWeight: "bold", fontSize: "15px"}}>
                                        Use your own image
                                    </p>

                                    <p style={{fontSize: "12px"}}>
                                        Image must be .jpeg or .png and video must be .mp4 format
                                        and can't be larger than 50MB.
                                    </p>
                                </div>
                                <br/>
                                <div className={'d-flex'} style={{"justifyContent": "space-around"}}>
                                    <CustomizedButtons
                                        title={"Upload"}
                                        submit={() => {
                                            uploadtwo();
                                        }}
                                        color={"primary"}
                                    />
                                </div>


                                <br/>
                                <br/>
                                <h2 style={{fontWeight: "bold"}} className="orclass">
                                    OR
                                </h2>
                                <br/>
                                <div className="vertical2">
                                    <br/>
                                    <br/>
                                    <p style={{fontSize: "12px"}} className="note">
                                        Note:- Credits will be cut from your account.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={4} xs={12} md={12} lg={12} sm={12} className="mt-2">
                                <p style={{fontWeight: "bold", fontSize: "15px"}}>
                                    Subscribe Now
                                </p>
                                <p style={{fontSize: "12px"}}>
                                    Subscribe to the Model to train and test your images and
                                    videos.
                                </p>
                                <div className="mt-5">
                                    <CustomizedButtons
                                        title={"Subscribe"}
                                        submit={() => {
                                            handleSubscriber();
                                        }}
                                        className={'py-3 px-8 subscribe-btn'}
                                        color={"primary"}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </BlockUi>
                <Row>
                    <Col>
                        <SweetAlert
                            info
                            showConfirm
                            showCancel
                            closeOnClickOutside
                            confirmBtnText="Yes"
                            confirmBtnBsStyle="primary"
                            cancelBtnBsStyle="light"
                            cancelBtnStyle={{color: "black"}}
                            title={alertData.title}
                            show={alertData.show}
                            focusCancelBtn
                            onConfirm={() => {
                                setAlertData({...alertData, show: false});
                                setShow(true);
                            }}
                            onCancel={() => {
                                setAlertData({...alertData, show: false});
                            }}
                        />
                    </Col>


                </Row>
            </Card>


            {modalRoiShow && (
                <ImageVideoModal
                    show={modalRoiShow}
                    model={model}
                    modelName={"Upload Image & Video Roi Option"}
                    closeImageVideoModal={closeImageVideoModal}
                  />
            )}
            {modalRtspRoiShow && (
                <ImageRtspModal
                    show={modalRtspRoiShow}
                    model={model}
                    modelName={"RTSP Roi Option"}
                    closeImageRtspModal={closeImageRtspModal}
                />
            )}
            {modalShow && (
                <VideoCameraRtspUploadModal
                    show={modalShow}
                    model={model}
                    closeImageVideoModal={closeVideoCameraRtspUploadModal}
                    nextModal={nextModal}
                  />
            )}
        </>
    );
}
