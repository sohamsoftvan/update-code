import {Card ,CardMedia ,CardContent ,Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { successToast } from "../../../../../../../../utils/ToastMessage";
import * as actions from "../../../../_redux/MyEventViewAction";
import moment from "moment";
import {Col, Row} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Tooltip} from "@mui/material";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Boundingbox from "image-bounding-box-custom";
import CustomizedButtons from "../../../../../../../../utils/SuperAdmin/CustomizedButtons";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import CustomFrameControls from "../../../../../../../../utils/SuperAdmin/CustomFrameControls";
import CustomizedSwitch from "../../../../../../../../utils/SuperAdmin/CustomizedSwitch";

const useStyles = makeStyles({
  card: {
    maxWidth: 416,
    height: "116%",
    margin: "auto"
  },
  media: {
    height: 380
  },
  header: {
    paddingBottom: "0rem"
  },
  learnMore: {
    position: "absolute",
    bottom: 0
  }
});

export function MyEventViewCardsUI({ data, cameraOptions }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [switchToggle, setSwitchToggle] = useState(data?.is_hide);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modaldata, setModaldata] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const columns = [
      {
        dataField: "event_name",
        text: "event"
      },
      {
        dataField: "event_type",
        text: "event type"
      },
      {
        dataField: "event_desc",
        text: "Event DESCRIPTION",
        formatter: (cellContent, row) => {
          return (
            <>
              <Tooltip
                className="tools"
                title={<div className="tooltip-font">{row.event_desc}</div>}
                placement={"bottom"}
              >
                <div
                  style={{ width: "200px" }}
                  className="short-label-name-length"
                >
                  {row.event_desc}
                </div>
              </Tooltip>
            </>
          );
        }
      },

      {
        dataField: "camera_name",
        text: "Camera Name"
      },
      {
        dataField: "data",
        text: "Event Date",
        formatter: (_, row) =>
          moment
            .utc(row?.date)
            .local()
            .format("MMMM DD YYYY, h:mm:ss a")
      }
    ];
    setColumns(columns);
    getColumnsAndData();
    //eslint-disable-next-line
  }, [data]);

  const handleChange = e => {
    dispatch(actions.changeEventStatus(data._id.$oid, !data.is_hide)).then(
      () => {
        setSwitchToggle(!switchToggle);
        successToast("Events status change successfully");
      }
    );
  };
  const getColumnsAndData = () => {
    let modal_data = [];
    let event_name = data.event_name;
    let event_type = data.event_type;
    let event_desc = data.event_desc;
    let camera_name = cameraOptions.find(
      camera => camera.value.toString() === data.camera_id.toString()
    ).label;
    let date = data?.event_date.$date;
    modal_data.push({
      event_name: event_name,
      event_type: event_type,
      event_desc: event_desc,
      camera_name: camera_name,
      date: date
    });
    setModaldata(modal_data);
  };
  const handleClick = e => {
    setIsModalOpen(true);
  };
  const onHide = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        <Card className={clsx(classes.card)} style={{ padding: 0 }}>
          <CardMedia
            className={classes.media}
            title={"Events"}
            alt={"Image Here"}
          >
            <Boundingbox
              className="row m-auto col-12 p-0 text-center"
              image={
                data?.image_list[0]?.imageUrl
                  ? data.image_list[0]?.imageUrl
                  : data?.image_list[0]
              }
            />
          </CardMedia>
          <CardContent style={{ minHeight: "100px" }}>
            <Typography gutterBottom varia nt="h6" component="h2">
              <span
                style={{
                  color: " #147b82",
                  fontWeight: "500",
                  fontSize: "1.15rem"
                }}
              >
                {data.event_name}
              </span>
              <br />
              <span>
                <Tooltip
                  className="tools"
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: "400",
                    color: "#3F4254"
                  }}
                  title={<div className="tooltip-font">{data.event_desc}</div>}
                  placement={"bottom"}
                >
                  <div
                    style={{
                      width: "150px",
                      fontSize: "1.15rem",
                      fontWeight: "500",
                      color: "#3F4254"
                    }}
                    className="short-label-name-length"
                  >
                    {data.event_desc}
                  </div>
                </Tooltip>
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  color: "#808080"
                }}
              >
                {moment(new Date(data.event_date.$date).toISOString()).format(
                  "MMMM DD YYYY, h:mm:ss a"
                )}
              </span>
              <br />
              <span
                className="svg-icon svg-icon-md svg-icon-light-inverse"
                style={{ float: "right" }}
                onClick={e => {
                  handleClick(e);
                }}
              >
                <VisibilityIcon
                  color={"action"}
                  style={{ fontSize: "2rem", color: "#147b82" }}
                />
              </span>
              <span
                style={{
                  fontSize: "1.15rem",
                  fontWeight: "500",
                  color: "#3F4254"
                }}
              >
                Hide aaa
              </span>
              <CustomizedSwitch
                  checked={switchToggle}
                  onChange={e => {
                    handleChange(e);
                  }}
                  name="isHideStatus"
                  color={"primary"}
                  className={"cursor-pointer"}
              />
            </Typography>
          </CardContent>
        </Card>
      }
      {/*{isModalOpen && (*/}

      <CommonModal
          size="xl"
          show={isModalOpen}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-xl"
          title={"Event Details"}
          backdrop="static"
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <Row>
                <Col xl={12} xs={12} md={12} lg={12} sm={12} className="mt-2">
                  {data && (
                      <BootstrapTable
                          classes="table table-head-custom table-vertical-center overflow-hidden mt-3"
                          bootstrap4
                          wrapperClasses="table-responsive"
                          keyField="label"
                          bordered={false}
                          data={modaldata}
                          columns={columns}
                      />
                  )}
                </Col>
              </Row>

              <div>
                {data?.image_list && data?.image_list ? (
                    <Row>
                      <Col xl={6} md={6} sm={12} lg={6}>
                        <TransformWrapper
                            defaultScale={1}
                            defaultPositionX={200}
                            defaultPositionY={100}
                        >
                          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                              <React.Fragment>
                                <div
                                    className="tools"
                                    style={{ width: "100%", marginBottom: "4px" }}
                                >
                                  <CustomFrameControls
                                      zoomIn={zoomIn}
                                      zoomOut={zoomOut}
                                      resetTransform={resetTransform}
                                      frameData={true}
                                  />
                                </div>
                                <div
                                    className="boundimage-full w-100"
                                    style={{ margin: "0 auto" }}
                                >
                                  <TransformComponent>
                                    <div className={"mb-5 mt-5"}>
                                      <CardMedia
                                          style={{ cursor: "pointer" }}
                                          alt={"Image Here 1"}
                                      >
                                        <Boundingbox
                                            className="row m-auto col-12 p-0 text-center"
                                            image={
                                              data?.image_list[0]?.imageUrl
                                                  ? data?.image_list[0]?.imageUrl
                                                  : data?.image_list[0]
                                            }
                                            options={{
                                              colors: {
                                                normal: "red",
                                                selected: "red",
                                                unselected: "red"
                                              },
                                              style: {
                                                maxWidth: "100%",
                                                maxHeight: "100vh",
                                                margin: "auto",
                                                width: "100vw",
                                                color: "red",
                                                height: 510
                                              }
                                            }}
                                        />
                                      </CardMedia>
                                    </div>
                                  </TransformComponent>
                                </div>
                              </React.Fragment>
                          )}
                        </TransformWrapper>
                      </Col>
                      <Col xl={6} md={6} sm={12} lg={6}>
                        <TransformWrapper
                            defaultScale={1}
                            defaultPositionX={200}
                            defaultPositionY={100}
                        >
                          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                              <React.Fragment>
                                <div
                                    className="tools"
                                    style={{ width: "100%", marginBottom: "4px" }}
                                >
                                  <CustomFrameControls
                                      zoomIn={zoomIn}
                                      zoomOut={zoomOut}
                                      resetTransform={resetTransform}
                                      frameData={true}
                                  />
                                </div>
                                <div
                                    className="boundimage-full w-100"
                                    style={{ margin: "0 auto" }}
                                >
                                  <TransformComponent>
                                    <div className={"mb-5 mt-5"}>
                                      <CardMedia
                                          style={{ cursor: "pointer" }}
                                          alt={"Image Here 1"}
                                      >
                                        <Boundingbox
                                            className="row m-auto col-12 p-0 text-center"
                                            image={
                                              data?.image_list[data.image_list.length - 1]
                                                  ?.imageUrl
                                                  ? data?.image_list[
                                                  data?.image_list.length - 1
                                                      ]?.imageUrl
                                                  : data?.image_list[
                                                  data?.image_list.length - 1
                                                      ]
                                            }
                                            options={{
                                              colors: {
                                                normal: "red",
                                                selected: "red",
                                                unselected: "red"
                                              },
                                              style: {
                                                maxWidth: "100%",
                                                maxHeight: "100vh",
                                                margin: "auto",
                                                width: "100vw",
                                                // width: 358,
                                                color: "red",
                                                height: 510
                                              }
                                            }}
                                        />
                                      </CardMedia>
                                    </div>
                                  </TransformComponent>
                                </div>
                              </React.Fragment>
                          )}
                        </TransformWrapper>
                      </Col>
                    </Row>
                ) : (
                    <></>
                )}
              </div>
            </>
          }
          footerContent={
            <>
              <Row>
                <Col xl={6} lg={6} xs={12} md={6} sm={12}>
                  {data.image_list[0]?.imageDate ? (
                      <span className={"font-weight-bolder"}>
                  Entry Time :{" "}
                        {moment
                            .utc(data.image_list[0]?.imageDate)
                            .local()
                            .format("DD MMMM YYYY, h:mm:ss a")}{" "}
                        - Exit Time :{" "}
                        {moment
                            .utc(
                                data.image_list[data?.image_list.length - 1]?.imageDate
                            )
                            .local()
                            .format("DD MMMM YYYY, h:mm:ss a")}{" "}
                </span>
                  ) : (
                      <></>
                  )}
                </Col>
                <Col
                    xl={6}
                    lg={6}
                    xs={12}
                    md={6}
                    sm={12}
                    className={"d-flex justify-content-end"}
                >
                  <CustomizedButtons color={'secondary'} title={'Cancel'} submit={() => onHide()}/>
                </Col>
              </Row>
            </>
          }
          footerCustom={true}

      />
      {/*)}*/}
    </>
  );
}
