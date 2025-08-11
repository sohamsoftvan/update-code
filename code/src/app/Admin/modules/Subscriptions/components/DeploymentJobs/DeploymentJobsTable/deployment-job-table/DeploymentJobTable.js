import React, { useEffect, useMemo, useRef, useState } from "react";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";

import {
  entityFilter,
  getFilteredAndPaginatedEntities,
  getPaginationOptions,
  headerSortingClasses,
  sortCaret
} from "../../../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../../../_metronic/_partials/controls";
import { useDeploymentJobsUIContext } from "../DeploymentJobsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as deploymentRTSPJobActions from "../../../../_redux/DeploymentRTSPJobs/DeploymentRTSPJobsAction";
import { SearchText } from "../../../../../../../../utils/SearchText";
import { AutoServingTable } from "../../../../../../../../utils/AutoServingTable";
import { CSVDownloader } from "../../../../../../../../utils/CSVDownloader";
import { DeploymentRTSPJobsCameraSettingsDialog } from "../deployment-rstp-job-camera-setting-dialog/DeploymentRTSPJobsCameraSetingDialog";
import { Col } from "reactstrap";
import TableLoader from "../../../../../../../../utils/SuperAdmin/Loader/TableLoader";

export function DeploymentJobTable() {
  const deploymentJobsUIContext = useDeploymentJobsUIContext();
  const deploymentJobsUIProps = useMemo(() => deploymentJobsUIContext, [
    deploymentJobsUIContext
  ]);
  const [cameraDetailsModal, setCameraDetailsModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  // Table columns
  const columns = [
    {
      dataField: "idx",
      text: "Index",
      sort: true,
      style: {
        minWidth: "55px"
      }
    },
    {
      dataField: "model_details.model_name",
      text: "Model Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: "status",
      text: "Status",
      formatter: columnFormatters.StatusFormatter,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openViewDeploymentJobDialog:
          deploymentJobsUIProps.openViewDeploymentJobDialog,
        openViewDeploymentRTSPJobDialog:
          deploymentJobsUIProps.openViewDeploymentRTSPJobDialog,
        openViewCameraSettingsDialog: openCameraDetailsModal
      }
    }
  ];

  function openCameraDetailsModal(id) {
    setRecordId(id);
    setCameraDetailsModal(true);
  }

  const csvFields = {
    index: "#",
    deployment_type: "Deployment Type",
    image_size: "Image Size",
    iou_threshold: "IOU Threshold",
    confidence_threshold: "Confidence Threshold"
  };

  const getCsvData = data =>
    data?.map((d, idx) => ({
      index: idx + 1,
      deployment_type: d.deployment_type?.deployment_type_name,
      image_size: d.image_size,
      iou_threshold: d.iou_threshold,
      confidence_threshold: d.confidence_threshold
    }));

  const { deploymentJobsState } = useSelector(
    state =>
      (() => {
        return { deploymentJobsState: state.deploymentJobs };
      })(),
    shallowEqual
  );

  const { deploymentRTSPJobsState } = useSelector(
    state =>
      (() => {
        return { deploymentRTSPJobsState: state.deploymentRTSPJobs };
      })(),
    shallowEqual
  );
  const { entities: deploymentJobData } = deploymentJobsState;
  const {
    entities: deploymentRTSPJobData,
    deploymentRTSPJobLoading,
    showTable,
    listLoading
  } = deploymentRTSPJobsState;
  const [filterEntities, setFilterEntities] = useState([
    ...deploymentJobData,
    ...deploymentRTSPJobData
  ]);
  const searchInput = useRef("");
  let currentItems = getFilteredAndPaginatedEntities(
    filterEntities || [...deploymentJobData, ...deploymentRTSPJobData],
    deploymentJobsUIProps.queryParams
  );

  const filterDeploymentJobs = e => {
    const searchStr = e?.target?.value || searchInput.current.value;
    const keys = ["id", "model_details.model_name"];
    currentItems = entityFilter(
      [...deploymentJobData, ...deploymentRTSPJobData] || filterEntities,
      searchStr,
      keys,
      deploymentJobsUIProps.queryParams,
      setFilterEntities
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deploymentRTSPJobActions.fetchDeploymentRTSPJobs());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    filterDeploymentJobs();
    // eslint-disable-next-line
  }, [deploymentJobData, deploymentRTSPJobData]);

  return (
    <>
      <div className="row mb-3">
        <Col
            xl={3}
            lg={6}
            xs={12}
            md={12}
            style={{ paddingLeft: "2.5px" }}
        >
          <div className={"searchText"}>
            <SearchText
                reference={searchInput}
                onChangeHandler={filterDeploymentJobs}
            />
          </div>
        </Col>
        <Col xl={9} lg={6} xs={12} md={12}>
          <CSVDownloader
              className="text-right searchTextbtn"
              data={getCsvData([
                ...deploymentJobData,
                ...deploymentRTSPJobData
              ])}
              filename={"RequestedModelDeploymentJobDetails"}
              fields={csvFields}
              buttonName={"Download Job Details As XLS"}
          />
        </Col>
      </div>

      <div className={"table-tab-wrapper"}>
        {listLoading ? (
              <TableLoader rows={currentItems?.length} columns={columns.length} />
        ) : (
            <PaginationProvider
                pagination={paginationFactory(
                    getPaginationOptions(filterEntities?.length, deploymentJobsUIProps.queryParams)
                )}
            >
              {({ paginationProps, paginationTableProps }) => (
                  <>
                    <AutoServingTable
                        columns={columns}
                        items={currentItems}
                        tableChangeHandler={deploymentJobsUIProps.setQueryParams}
                        paginationTableProps={paginationTableProps}
                        className={
                          currentItems?.length > 0
                              ? "table-tab-wrapper"
                              : "table-tab-wrapper-no-data"
                        }
                        noDataIndication={() => (
                            <div className="table-noDataIndication">No Data Found</div>
                        )}
                    />
                    {currentItems?.length > 0 && (
                        <Pagination
                            isLoading={listLoading || deploymentRTSPJobLoading}
                            paginationProps={paginationProps}
                        />
                    )}
                  </>
              )}
            </PaginationProvider>
        )}
      </div>


      <DeploymentRTSPJobsCameraSettingsDialog
        show={cameraDetailsModal}
        id={recordId}
        onHide={setCameraDetailsModal}
      />
    </>
  );
}
