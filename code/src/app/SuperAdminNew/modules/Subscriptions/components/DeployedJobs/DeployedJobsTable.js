import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../../utils/SuperAdmin/Table/CommonTable";

function DeployedJobsTable({
                           currentItems,
                           pageNo,
                           pageSize,
                           handleChangeRowsPerPage,
                           handleChangePage,
                           editModalDataTable,
                           onChangeSwitch,
                           classNameFlag,
                                 infoModalDataTable,cameraModalDataTable,deployedJob
                       }) {
    const [filterEntities, setFilterEntities] = useState([]);

    useEffect(() => {
        setFilterEntities(currentItems);
    }, [currentItems]);

    let headCells;
    if (deployedJob) {
        headCells = [
            { id: "model_details", numeric: false, disablePadding: false, label: "Model Name" }
        ];
    } else {
        headCells = [
            { id: "model_details_deployment", numeric: false, disablePadding: false, label: "Model Name" },
            { id: "model_status", numeric: false, disablePadding: false, label: "Status" }
        ];
    }

    return (<>
        <CommonTable
            tableHead={headCells}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            pageSize={pageSize}
            editModalDataTable={editModalDataTable}
            pageNo={pageNo}
            handleChangePage={handleChangePage}
            filterEntities={filterEntities}
            totalRecords={filterEntities.length}
            checked={false}
            status={false}
            editFlag={deployedJob}
            editName={"Select Roi Region"}
            infoFlag={true}
            deleteFlag={false}
            onChangeSwitch={onChangeSwitch}
            classNameFlag={classNameFlag}
            infoName={deployedJob ? "Deployed Jobs Information":"Deployment Jobs Information"}
            infoModalDataTable={infoModalDataTable}
            cameraName={"Camera Information"}
            cameraFlag={true}
            cameraModalDataTable={cameraModalDataTable}
        />
    </>);
}

export default DeployedJobsTable;
