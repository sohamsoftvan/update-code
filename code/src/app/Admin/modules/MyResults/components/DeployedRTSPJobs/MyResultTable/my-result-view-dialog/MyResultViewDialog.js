import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { warningToast } from "../../../../../../../../utils/ToastMessage";
import Boundingbox from "image-bounding-box-custom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { boundBoxOptions } from "../../../../../../../../utils/BoundingBoxConfig";
import { Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import CustomFrameControls from "../../../../../../../../utils/SuperAdmin/CustomFrameControls";

export function MyResultViewDialog({ id, show, onHide, row }) {
  const [modalData, setModalData] = useState([]);
  const columns = [
    {
      dataField: "camera_name",
      text: "camera"
    },
    {
      dataField: "count",
      text: "Count"
    },
    {
      dataField: "date",
      text: "Date"
    },
    {
      dataField: "labels",
      text: "labels"
    }
  ];

  useEffect(() => {
    if (Object.keys(row).length > 0) {
      getColumnsAndData();
      //eslint-disable-next-line
    }
  }, [row]);

  const { entities } = useSelector(
    state => ({
      entities: state.myResult.entities
    }),
    shallowEqual
  );

  const [myResultFetchedById, setMyResultFetchedById] = useState({});
  useEffect(() => {
    if (id && entities) {
      const deployedRTSPJob = entities.filter(d => d._id.$oid === id);
      if (deployedRTSPJob.length) {
        setMyResultFetchedById(deployedRTSPJob[0]);
      } else warningToast("No deployedRTSP job found with that id");
    }

    return () => setMyResultFetchedById({});
  }, [id, entities]);

  const getColumnsAndData = () => {
    let modal_data = [];
    let camera_name = row.camera_name;
    let count = row.result.detection.length;
    let Date = moment
      .utc(row.created_date.$date)
      .local()
      .format("MMMM DD YYYY, h:mm:ss a");
    let labels = Object.keys(row.counts).toString();
    modal_data.push({
      camera_name: camera_name,
      count: count,
      date: Date,
      labels: labels
    });
    setModalData(modal_data);
  };

  return (

      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"My Result Details"}
          scrollable={false}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <Row>
                <Col xl={12} xs={12} md={12} lg={12} sm={12} className="mt-2">
                  {row && modalData && (
                      <BootstrapTable
                          classes="table table-head-custom table-vertical-center overflow-hidden mt-3"
                          bootstrap4
                          wrapperClasses="table-responsive"
                          keyField="label"
                          bordered={false}
                          data={modalData}
                          columns={columns}
                      />
                  )}
                </Col>
                <Col xl={12} xs={12} md={12} lg={12} sm={12}>
                  {/*<div className="row m-auto col-12 text-center" style={{background: "linear-gradient(to right, #0054d0, #019f8c)", color: 'white'}}>*/}
                  <TransformWrapper
                      defaultScale={1}
                      defaultPositionX={200}
                      defaultPositionY={100}
                  >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                          <div
                              className="tools text-right"
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
                              <Boundingbox
                                  className="row m-auto col-12 p-0 text-center"
                                  image={myResultFetchedById?.image_url}
                                  boxes={myResultFetchedById?.result?.detection.map(
                                      d => ({
                                        coord: [
                                          d.location[0],
                                          d.location[1],
                                          d.location[2] - d.location[0],
                                          d.location[3] - d.location[1]
                                        ],
                                        label: d.label
                                      })
                                  )}
                                  options={boundBoxOptions}
                              />
                            </TransformComponent>
                          </div>
                        </React.Fragment>
                    )}
                  </TransformWrapper>
                </Col>
                {/*</div>*/}
              </Row>

            </>
          }
      />
  );
}
