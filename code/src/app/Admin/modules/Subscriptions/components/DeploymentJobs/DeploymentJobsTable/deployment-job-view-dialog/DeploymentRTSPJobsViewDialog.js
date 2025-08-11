import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDeploymentRTSPJobById } from "../../../../_redux/DeploymentRTSPJobs/DeploymentRTSPJobsAction";
import * as moment from "moment";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";

export function DeploymentRTSPJobsViewDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const { deploymentRTSPJobsFetchedById } = useSelector(
    state => ({
      deploymentRTSPJobsFetchedById:
        state.deploymentRTSPJobs.deploymentRTSPJobsFetchedById
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) dispatch(fetchDeploymentRTSPJobById(id));
    /* eslint-disable */
  }, [id]);

  return (

      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Details"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
                <div className="row col-12 view-title text-center">
          <span
              className="w-100 font-weight-bold"
              style={{
                  background: "#147b82",
                  color: "white",
                  margin: "20px auto"
              }}
          >
            Deployment RTSP Job Details
          </span>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Image Size</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {deploymentRTSPJobsFetchedById?.image_size}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Confidence Threshold</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {deploymentRTSPJobsFetchedById?.confidence_threshold}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>IOU Threshold</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {deploymentRTSPJobsFetchedById?.iou_threshold}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Created Date</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {moment
                            .utc(deploymentRTSPJobsFetchedById?.created_date)
                            .local()
                            .format("MMMM DD YYYY, h:mm:ss a")}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Updated Date</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {moment
                            .utc(deploymentRTSPJobsFetchedById?.updated_date)
                            .local()
                            .format("MMMM DD YYYY, h:mm:ss a")}
                    </div>
                </div>

                <div className="row col-12 view-title text-center">
          <span
              className="w-100 font-weight-bold"
              style={{
                  background: "#147b82",
                  color: "white",
                  margin: "20px auto"
              }}
          >
            Deployment Type
          </span>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Deployment Type Name</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {
                            deploymentRTSPJobsFetchedById?.deployment_type
                                ?.deployment_type_name
                        }
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Deployment Description</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {
                            deploymentRTSPJobsFetchedById?.deployment_type
                                ?.deployment_type_description
                        }
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Created Date</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {moment
                            .utc(deploymentRTSPJobsFetchedById?.deployment_type?.created_date)
                            .local()
                            .format("MMMM DD YYYY, h:mm:ss a")}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Updated Date</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {moment
                            .utc(deploymentRTSPJobsFetchedById?.deployment_type?.updated_date)
                            .local()
                            .format("MMMM DD YYYY, h:mm:ss a")}
                    </div>
                </div>

                <div className="row col-12 view-title text-center">
          <span
              className="w-100 font-weight-bold"
              style={{
                  background: "#147b82",
                  color: "white",
                  margin: "20px auto"
              }}
          >
            Model Details
          </span>
                </div>

                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Model Name</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {deploymentRTSPJobsFetchedById?.model_details?.model_name}
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Model Category</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {
                            deploymentRTSPJobsFetchedById?.model_details
                                ?.model_category_details?.model_category_name
                        }
                    </div>
                </div>
                <div className="row mt-5 mb-5 font-size-base">
                    <div className="col col-md-6">
            <span>
              <b>Model Description</b>
            </span>
                    </div>
                    <div className="col col-md-6">
                        {deploymentRTSPJobsFetchedById?.model_details?.model_description}
                    </div>
                </div>

            </>
          }
      />
  );
}
