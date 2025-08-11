import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import {CardMedia ,Tooltip} from "@mui/material";
import Boundingbox from "image-bounding-box-custom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CustomizedButtons from "../../../../../../../../utils/SuperAdmin/CustomizedButtons";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import CustomFrameControls from "../../../../../../../../utils/SuperAdmin/CustomFrameControls";

const useStyles = makeStyles({
  card: {
    maxWidth: 254,
    height: "100%",
    margin: "auto",
    marginTop: "15px"
  },
  media: {
    height: 290
  },
  header: {
    paddingBottom: "0rem"
  },
  learnMore: {
    position: "absolute",
    bottom: 0
  },

  modalContent: {
    height: 100
  }
});

export function MyEventViewDialog({ show, onHide, event, cameraName }) {
  const [modaldata, setModaldata] = useState([]);

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
      dataField: "EVENT DESCRIPTION",
      text: "Event DESCRIPTION",
      formatter: () => {
        return (
          <>
            <Tooltip
              className="tools"
              title={<div className="tooltip-font">{event.event_desc}</div>}
              placement={"bottom"}
            >
              <div
                style={{ width: "200px" }}
                className="short-label-name-length"
              >
                {event.event_desc}
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
      dataField: "date",
      text: "Event Date"
    }
  ];

  useEffect(() => {
    if (Object.keys(event).length > 0) {
      getColumnsAndData();
      //eslint-disable-next-line
    }
  }, [event]);


  const getColumnsAndData = () => {
    let modal_data = [];
    let camera_name = cameraName[event.camera_id];
    let event_name = event.event_name;
    let event_desc = event.event_desc;
    let event_type = event.event_type;
    let Date = moment
      .utc(event?.event_date.$date)
      .local()
      .format("MMMM DD YYYY, h:mm:ss a");

    modal_data.push({
      camera_name: camera_name,
      event_name: event_name,
      event_desc: event_desc,
      event_type: event_type,
      date: Date
    });
    setModaldata(modal_data);
  };

  return (

      <CommonModal
          size="xl"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Event Details"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <>
                {event && (
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
              </>
              <div>
                {event?.image_list && event?.image_list ? (
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
                                    <div className={"mt-5 mb-5"}>
                                      <CardMedia
                                          style={{ cursor: "pointer" }}
                                          alt={"Image Here 1"}
                                      >
                                        <Boundingbox
                                            className="row m-auto col-12 p-0 text-center"
                                            image={
                                              event.image_list[0]?.imageUrl
                                                  ? event.image_list[0]?.imageUrl
                                                  : event.image_list[0]
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
                                    <div className={"mt-5 mb-5"}>
                                      <CardMedia
                                          style={{ cursor: "pointer" }}
                                          alt={"Image Here 1"}
                                      >
                                        <Boundingbox
                                            className="row m-auto col-12 p-0 text-center"
                                            image={
                                              event.image_list[event.image_list.length - 1]
                                                  ?.imageUrl
                                                  ? event.image_list[
                                                  event.image_list.length - 1
                                                      ]?.imageUrl
                                                  : event?.image_list[
                                                  event.image_list.length - 1
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
          footerCustom={true}
          footerContent={<Row>
            <Col xl={6} lg={6} xs={12} md={6} sm={12}>
              {event?.image_list[0] && event?.image_list[0]?.imageDate ? (
                  <span className={"font-weight-bolder"}>
                Entry Time :{" "}
                    {moment
                        .utc(event?.image_list[0]?.imageDate)
                        .local()
                        .format("DD MMMM YYYY, h:mm:ss a")}{" "}
                    - Exit Time :{" "}
                    {moment
                        .utc(
                            event?.image_list[event?.image_list.length - 1]?.imageDate
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
              <CustomizedButtons
                  title={"Cancel"}
                  submit={() => onHide(false)}
                  color={"secondary"}
              />
            </Col>
          </Row>}
      />
  );
}

