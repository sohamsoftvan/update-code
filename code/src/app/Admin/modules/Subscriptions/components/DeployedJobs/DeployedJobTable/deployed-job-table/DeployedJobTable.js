import React, { useEffect, useMemo, useRef, useState } from "react";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import {
  entitiesSorter,
  getFilteredAndPaginatedEntities,
  getPaginationOptions,
  headerSortingClasses,
  sortCaret,
} from "../../../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../../../_metronic/_partials/controls";
import { useDeployedJobsUIContext } from "../DeployedJobsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as deployedRTSPJobsActions from "../../../../_redux/DeployedRTSPJobs/DeployedRTSPJobsAction";
import { SearchText } from "../../../../../../../../utils/SearchText";
import { AutoServingTable } from "../../../../../../../../utils/AutoServingTable";
import { CSVDownloader } from "../../../../../../../../utils/CSVDownloader";
import { PlotRegionPage } from "../../../../../Modal/plotRegionPage";
import { DeployedRTSPJobsCameraSettingsDialog } from "../deployed-rstp-job-camera-settings-dialog/DeployedRTSPJobsCameraSettingsDialog";
import { matchSorter } from "match-sorter";
import { Col } from "reactstrap";
import BlockUi from "react-block-ui";
import TableLoader from "../../../../../../../../utils/SuperAdmin/Loader/TableLoader";

export function DeployedJobTable() {
  const deployedJobsUIContext = useDeployedJobsUIContext();
  const deployedJobsUIProps = useMemo(
    () => deployedJobsUIContext,
    [deployedJobsUIContext]
  );
  const [openROIModal, setOpenROIModal] = React.useState(false);
  const [cameraDetailsModal, setCameraDetailsModal] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);
  // const [show, setShow] = React.useState(false);
  const csvFields = {
    index: "#",
    api_endpoint: "API Endpoint",
    instance_id: "Instance Id",
    instance_status: "Instance Status",
    model_name: "Model Name",
  };

  const getCsvData = (data) =>
    data?.map((d, idx) => ({
      index: idx + 1,
      api_endpoint: d.api_endpoint,
      deployment_job_id: d.deployment_job_id,
      instance_id: d.instance_id,
      instance_status: d.instance_status,
      model_name: d.deployment_job_rtsp_details.model_details.model_name,
    }));
  // Table columns
  const columns = [
    {
      dataField: "idxx",
      text: "Index",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "55px",
      },
    },
    {
      dataField: "deployment_job_rtsp_details.model_details.model_name",
      text: "Model name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",

      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openViewDeployedJobDialog:
          deployedJobsUIProps.openViewDeployedJobDialog,
        openViewDeployedRTSPJobDialog:
          deployedJobsUIProps.openViewDeployedRTSPJobDialog,
        openViewCameraSettingsDialog: openCameraDetailsModal,
        openROIModal: openROIM,
        // openSweetAlert: openAlert,
      },
    },
  ];

  // function openAlert() {
  //   setShow(true);
  // }

  function openROIM(id) {
    setRecordId(id);
    setOpenROIModal(true);
  }

  function openCameraDetailsModal(id) {
    setRecordId(id);
    setCameraDetailsModal(true);
  }

  const { deployedJobsCurrentState } = useSelector(
    (state) =>
      (() => {
        return { deployedJobsCurrentState: state.deployedJobs };
      })(),
    shallowEqual
  );

  const { deployedRTSPJobsCurrentState } = useSelector(
    (state) =>
      (() => {
        return { deployedRTSPJobsCurrentState: state.deployedRTSPJobs };
      })(),
    shallowEqual
  );

  const { entities: deployedJobsData, deployedJobsLoading } =
    deployedJobsCurrentState;
  const {
    entities: deployedRTSPJobsData,
    deployedRTSPJobLoading,
    showTable,
    listLoading,
  } = deployedRTSPJobsCurrentState;
  const [filterEntities, setFilterEntities] = useState([
    ...deployedJobsData,
    ...deployedRTSPJobsData,
  ]);
  const searchInput = useRef("");
  let currentItems = getFilteredAndPaginatedEntities(
    filterEntities || [...deployedJobsData, ...deployedRTSPJobsData],
    deployedJobsUIProps.queryParams
  );

  const filterDeployedJobs = (e) => {
    if (deployedRTSPJobsData.length > 0) {
      const searchStr = e?.target?.value || searchInput.current.value;
      const keys = ["deployment_job_rtsp_details.model_details.model_name"];
      // const keys = ['id', 'api_endpoint', 'instance_id', 'instance_status','model_name'];
      currentItems = sortFilter(
        deployedRTSPJobsData?.map((i, idx) => ({
          ...i,
          idxx: idx + 1,
        })) || filterEntities,
        searchStr,
        keys,
        deployedJobsUIProps.queryParams,
        setFilterEntities
      );
    }
    // currentItems = entityFilter([...deployedJobsData, ...deployedRTSPJobsData] || filterEntities, searchStr, keys, deployedJobsUIProps.queryParams, setFilterEntities)
  };

  const sortFilter = (
    entities,
    searchStr,
    keys,
    filterParams,
    filteredEntitiesSetter
  ) => {
    if (searchStr) {
      filteredEntitiesSetter(matchSorter(entities, searchStr, { keys }));
    } else {
      if (entities)
        filteredEntitiesSetter(
          entities.slice().sort(entitiesSorter(filterParams))
        );
      else filteredEntitiesSetter(entities);
    }
    return getFilteredAndPaginatedEntities(entities, filterParams);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deployedRTSPJobsActions.fetchDeployedRTSPJobs());
    /* eslint-disable */
  }, [dispatch]);

  useEffect(() => {
    filterDeployedJobs();
    /* eslint-disable */
  }, [deployedJobsUIProps.queryParams, deployedJobsData, deployedRTSPJobsData]);

  return (
    <>

      <div className="row mb-3">
        <Col
            xl={3}
            lg={6}
            xs={12}
            md={12}
            style={{ paddingLeft: "0.5px" }}
        >
          <div className={"searchText"}>
            <SearchText
                reference={searchInput}
                onChangeHandler={filterDeployedJobs}
            />
          </div>
        </Col>
        <Col xl={9} lg={6} xs={12} md={12}>
          {currentItems?.length > 0 && (
          <CSVDownloader
              className="text-right searchTextbtn"
              data={getCsvData([
                ...deployedJobsData,
                ...deployedRTSPJobsData,
              ])}
              filename={"RequestedModelDeployedJobDetails"}
              fields={csvFields}
              buttonName={"Download Job Details As XLS"}
          />)}
        </Col>
      </div>

      <div className={"table-tab-wrapper"}>
        {listLoading ? (
              <TableLoader rows={currentItems?.length} columns={columns.length} />
        ) : (
            <PaginationProvider
                pagination={paginationFactory(
                    getPaginationOptions(filterEntities?.length, deployedJobsUIProps.queryParams)
                )}
            >
              {({ paginationProps, paginationTableProps }) => (
                  <>
                    <AutoServingTable
                        columns={columns}
                        items={currentItems}
                        tableChangeHandler={deployedJobsUIProps.setQueryParams}
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
                            isLoading={deployedJobsLoading || deployedRTSPJobLoading}
                            paginationProps={paginationProps}
                        />
                    )}
                  </>
              )}
            </PaginationProvider>
        )}
      </div>
      {/*<SweetAlert*/}
      {/*  showCancel={true}*/}
      {/*  showConfirm={true}*/}
      {/*  confirmBtnText="Confirm"*/}
      {/*  confirmBtnBsStyle="primary"*/}
      {/*  cancelBtnBsStyle="light"*/}
      {/*  cancelBtnStyle={{ color: "black" }}*/}
      {/*  title={"Are you sure ?"}*/}
      {/*  onConfirm={() => {*/}
      {/*    setShow(false);*/}
      {/*  }}*/}
      {/*  onCancel={() => setShow(false)}*/}
      {/*  show={show}*/}
      {/*  focusCancelBtn*/}
      {/*/>*/}

      <PlotRegionPage
        openROIModal={openROIModal}
        id={recordId}
        setOpenROIModal={setOpenROIModal}
      />

      <DeployedRTSPJobsCameraSettingsDialog
        show={cameraDetailsModal}
        id={recordId}
        onHide={setCameraDetailsModal}
      />
    </>
  );
}
