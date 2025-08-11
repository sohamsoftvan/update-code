import React from "react";
import * as moment from "moment";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {dateTimeFormatter} from "../../../../../../utils/DateTimeFormatter";

export function DeployedRTSPJobsViewDialog({onHide, show, infoData ,deployedJobs}) {

    return (

        <CommonModal
            size="lg"
            show={show}
            handleClose={onHide}
            arialabelledby="example-modal-sizes-title-lg"
            title={`Details`}
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
                  margin: "20px auto",
              }}
          >
           {deployedJobs ? " Deployed RTSP Job Details" :"Deployment RTSP Job Details"}
          </span>
                </div>

                {deployedJobs && <>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
            <span>
              <b>API Endpoint</b>
            </span>
                        </div>

                        <div className="col col-md-6">
                            <a
                                style={{ wordBreak: "break-all" }}
                                href={infoData?.api_endpoint}
                                target={"_blank"}
                            >
                                {infoData?.api_endpoint}
                            </a>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
                            <span>
                                <b>Instance Id</b>
                             </span>
                        </div>
                        <div className="col col-md-6">
                            {infoData?.instance_id}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
            <span>
              <b>Instance Status</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {infoData?.instance_status}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
            <span>
              <b>Created Date</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {dateTimeFormatter(infoData?.created_date)}
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col col-md-6">
            <span>
              <b>Updated Date</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {dateTimeFormatter(infoData?.updated_date)}
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
            Deployment Job Details
          </span>
                    </div>                    </>}
                    <div className="row mt-5 mb-5 font-size-base">
                        <div className="col col-md-6">
            <span>
              <b>Image Size</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {deployedJobs ? infoData?.deployment_job_rtsp_details?.image_size : infoData?.image_size}
                        </div>
                    </div>
                    <div className="row mt-5 mb-5 font-size-base">
                        <div className="col col-md-6">
            <span>
              <b>Confidence Threshold</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {deployedJobs ?  infoData?.deployment_job_rtsp_details?.confidence_threshold : infoData?.confidence_threshold}
                        </div>
                    </div>
                    <div className="row mt-5 mb-5 font-size-base">
                        <div className="col col-md-6">
            <span>
              <b>IOU Threshold</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            { deployedJobs ? infoData?.deployment_job_rtsp_details?.iou_threshold : infoData?.iou_threshold}
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
                                .utc(deployedJobs ? infoData?.deployment_job_rtsp_details?.created_date : infoData?.created_date)
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
                                .utc(deployedJobs ? infoData?.deployment_job_rtsp_details?.updated_date : infoData?.updated_date)
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
                            {deployedJobs ?
                            infoData?.deployment_job_rtsp_details?.deployment_type?.deployment_type_name
                                : infoData?.deployment_type?.deployment_type_name
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
                            {deployedJobs ?
                                infoData?.deployment_job_rtsp_details?.deployment_type
                                    ?.deployment_type_description : infoData?.deployment_type?.deployment_type_description
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
                                .utc(deployedJobs ? infoData?.deployment_job_rtsp_details?.deployment_type?.created_date : infoData?.deployment_type?.created_date)
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
                                .utc(deployedJobs ? infoData?.deployment_job_rtsp_details?.deployment_type?.updated_date : infoData?.deployment_type?.updated_date)
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
                            {deployedJobs ? infoData?.deployment_job_rtsp_details?.model_details?.model_name : infoData?.model_details?.model_name}
                        </div>
                    </div>
                    <div className="row mt-5 mb-5 font-size-base">
                        <div className="col col-md-6">
            <span>
              <b>Model Category</b>
            </span>
                        </div>
                        <div className="col col-md-6">
                            {deployedJobs ?
                                infoData?.deployment_job_rtsp_details?.model_details
                                    ?.model_category_details?.model_category_name : infoData?.model_details?.model_category_details?.model_category_name
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
                            {deployedJobs ? infoData?.deployment_job_rtsp_details?.model_details?.model_description : infoData?.model_details?.model_description}
                        </div>
                    </div>
                </>
            }
        />
    );
}
