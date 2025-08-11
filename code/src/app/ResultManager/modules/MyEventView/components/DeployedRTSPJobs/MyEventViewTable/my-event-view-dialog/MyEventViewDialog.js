import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { warningToast } from "../../../../../../../../utils/ToastMessage";
import Boundingbox from "image-bounding-box-custom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { boundBoxOptions } from "../../../../../../../../utils/BoundingBoxConfig";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
import CustomFrameControls from "../../../../../../../../utils/SuperAdmin/CustomFrameControls";

export function MyEventViewDialog({ id, show, onHide }) {
  const { entities } = useSelector(
    (state) => ({
      entities: state.myResultSliceResultManager.entities,
    }),
    shallowEqual
  );

  const [myResultFetchedById, setMyResultFetchedById] = useState({});
  useEffect(() => {
    if (id && entities) {
      const deployedRTSPJob = entities.filter((d) => d._id.$oid === id);
      if (deployedRTSPJob.length) {
        setMyResultFetchedById(deployedRTSPJob[0]);
      } else warningToast("No deployedRTSP job found with that id");
    }

    return () => setMyResultFetchedById({});
  }, [id, entities]);

  return (

    <CommonModal
        size="lg"
        show={show}
        handleClose={onHide}
        arialabelledby="example-modal-sizes-title-lg"
        title={"My Result Details"}
        My Result Details
        closeButtonFlag={true}
        applyButton={false}
        content={
          <>
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
                            boxes={myResultFetchedById?.result?.detection.map((d) => ({
                              coord: [
                                d.location[0],
                                d.location[1],
                                d.location[2] - d.location[0],
                                d.location[3] - d.location[1],
                              ],
                              label: d.label,
                            }))}
                            options={boundBoxOptions}
                        />
                      </TransformComponent>
                    </div>
                  </React.Fragment>
              )}
            </TransformWrapper>

          </>
        }
    />
  );
}
