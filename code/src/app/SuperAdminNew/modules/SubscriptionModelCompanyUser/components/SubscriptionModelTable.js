import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../utils/SuperAdmin/Table/CommonTable";

function SubscriptionModelTable({
                                    currentItems,
                                    pageNo,
                                    pageSize,
                                    handleChangeRowsPerPage,
                                    handleChangePage,
                                    editModalDataTable,
                                    onChangeDeploymentStatus,
                                    classNameFlag,loading
                                }) {
    const [filterEntities, setFilterEntities] = useState([]);

    useEffect(() => {
        setFilterEntities(currentItems);
    }, [currentItems]);

    const headCells = [{
        id: "company_name", numeric: false, disablePadding: false, label: "Company Name"
    }, {
        id: "user_email", numeric: false, disablePadding: false, label: "User Name"
    }, {
        id: "model_name", numeric: false, disablePadding: false, label: "Model Name"
    }, {
        id: "deployment_status", numeric: false, disablePadding: false, label: "Deployment Status"
    },

    ];

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
            editFlag={false}
            editName={"Edit deploy model"}
            infoFlag={false}
            deleteFlag={false}
            classNameFlag={classNameFlag}
            loading={loading}
            handleDeployment={onChangeDeploymentStatus}
        />
    </>);
}

export default SubscriptionModelTable;
