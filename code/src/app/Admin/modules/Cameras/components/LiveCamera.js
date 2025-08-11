import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import CardHeader from "@mui/material/CardHeader";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import * as actions from "../_redux/CameraAction";
import { useDispatch } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { loadImageFromRtspURL } from "../_redux/CameraAPI";
import ImageGridLoader from "../../../../../utils/SuperAdmin/Loader/ImageGridLoader";
import BlockUi from "react-block-ui";

const useStyles = makeStyles({
  card1: {},
  media: {
    height: 270
  },
  header: {
    paddingBottom: "0rem"
  },
  card: {
    maxWidth: 380,
    height: "100%"
  },
  title: {
    display: "inline-flex",
    margin: "1rem 0"
  },
  learnMore: {
    position: "absolute",
    bottom: 0
  }
});
export default function LiveCamera() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [rtspData, setRtspData] = useState([]);
  const [resData, setResData] = useState([]);
  const [actionsLoading, setActionLoading] = useState(false);
  // Customers UI Context
  const dispatch = useDispatch();

  useEffect(() => {
    setActionLoading(true);
    dispatch(actions.fetchDeployedRTSPJobs()).then(res => {
      setTemp(res?.data);
      setActionLoading(false);
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    let rtspData = [];
    temp && temp.map((item, index) => {
      item.deployment_job_rtsp_details.camera_settings.map((item, index) => {
        if (!data.includes(item.rtsp_url)) {
          data.push(item.rtsp_url);
          rtspData.push({
            rtsp_url: item.rtsp_url,
            camera_name: item.camera_name,
            id: item.id
          });
        }
        return null;
      });
      return null;
    });
    setData(data);
    setRtspData(rtspData);
    //eslint-disable-next-line
  }, [temp]);

  useEffect(() => {
    rtspData.map((item, index) => {
      getByteArray(item.rtsp_url);
      return null;
    });
    //eslint-disable-next-line
  }, [rtspData]);
  const res = [];
  const getByteArray = async rtsp_url => {
    setActionLoading(true);
    const { data: byteArray, isSuccess } = await loadImageFromRtspURL(rtsp_url);
    if (!isSuccess) {
    } else {
      res.push({ byteArray: byteArray, rtsp_url: rtsp_url });
      setActionLoading(false);
    }
    setResData([...res]);
  };
  const handleClick = async e => {
    let id = e.target.id;
    loadImageFromRtspURL(e.target.name).then(response => {
      let res = [...resData];
      let item = { ...res[id] };
      item.byteArray = response.data;
      res[id] = item;
      setResData(res);
    });
  };

  return (
    <>
      <Card className="example example-compact fixed-height-card">
        <CardBody className="custom-card-body">
          <Row className="align-items-center">
            <Col xs={12} md={12}>
              <CardHeader title="Live Preview" className="p-2" />
            </Col>
          </Row>
          <hr />
          <Row className="mb-5 ml-2" style={{overflow: "auto",height:"calc(100vh - 250px)"}}>
          {actionsLoading ? (
              <ImageGridLoader />
          ) : (
              <>
          {/*  <BlockUi tag="div" blocking={true} color="#147b82">*/}

            {resData.length > 0 &&
                        resData.map((item, index) => (
                            <Col
                                key={index}
                                xl={4}
                                md={4}
                                sm={4}
                                lg={4}
                                className={classes.card1}
                                style={{ marginBottom: "20px" }}
                            >
                              <Card>
                                <CardMedia>
                                  <div className="bg bg_blur_image">
                                    <img
                                        name={item.rtsp_url}
                                        id={index}
                                        className={classes.media}
                                        src={
                                          item.byteArray
                                              ? `data:image/png;base64,${item.byteArray}`
                                              : "http://accordelectrotechnics.in/img/product/no-preview/no-preview.png"
                                        }
                                        alt=""
                                    />
                                    <div className="overlay">
                                      <img
                                          className="licameraSVG"
                                          name={item.rtsp_url}
                                          id={index}
                                          onClick={handleClick}
                                          src={toAbsoluteUrl("/media/svg/icons/General/Update.svg")}
                                          alt=""
                                      />
                                    </div>
                                  </div>
                                </CardMedia>
                              </Card>
                            </Col>
                        ))}
            {/*</BlockUi>*/}
              </>
          )}
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
