import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDeploymentJobById } from "../../../../_redux/DeploymentJobs/DeploymentJobsAction";
import { dateTimeFormatter } from "../../../../../../../../utils/DateTimeFormatter";
import * as moment from "moment";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";

export function DeploymentJobsViewDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const { deploymentJobsFetchedById } = useSelector(
    (state) => ({
      deploymentJobsFetchedById: state.deploymentJobs.deploymentJobsFetchedById,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) dispatch(fetchDeploymentJobById(id));
    // eslint-disable-next-line
  }, [id]);

  return (


      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Deployment Job Details"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <div className="row col-12 view-title">
                <span>Deployment Job Details</span>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Image Size</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.image_size}
                </div>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Confidence Threshold</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.confidence_threshold}
                </div>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>IOU Threshold</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.iou_threshold}
                </div>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Created Date</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {dateTimeFormatter(deploymentJobsFetchedById?.created_date)}
                </div>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Updated Date</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {dateTimeFormatter(deploymentJobsFetchedById?.updated_date)}
                </div>
              </div>

              <div className="row col-12 view-title">
                <span>Deployment Type</span>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Deployment Type Name</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.deployment_type?.deployment_type_name}
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
                    deploymentJobsFetchedById?.deployment_type
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
                      .utc(deploymentJobsFetchedById?.deployment_type?.created_date)
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
                      .utc(deploymentJobsFetchedById?.deployment_type?.updated_date)
                      .local()
                      .format("MMMM DD YYYY, h:mm:ss a")}
                </div>
              </div>

              <div className="row col-12 view-title">
                <span>Model Details</span>
              </div>

              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Model Name</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.model_details?.model_name}
                </div>
              </div>
              <div className="row mt-5 mb-5 font-size-base">
                <div className="col col-md-6">
            <span>
              <b>Model Description</b>
            </span>
                </div>
                <div className="col col-md-6">
                  {deploymentJobsFetchedById?.model_details?.model_description}
                </div>
              </div>

            </>
          }
      />
  );
}
