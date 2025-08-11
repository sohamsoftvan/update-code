import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../utils/SuperAdmin/Table/CommonTable";

function AllCameraLogTable({
                         currentItems,
                         pageNo,
                         pageSize,
                         handleChangeRowsPerPage,
                         handleChangePage,
                     }) {
    const [filterEntities, setFilterEntities] = useState([]);

    useEffect(() => {
        setFilterEntities(currentItems);
    }, [currentItems]);

    const headCells = [{
        id: "camera_detail", numeric: false, disablePadding: false, label: "Cameras"
    }, {
            id: "created_date", numeric: false, disablePadding: false, label: "Date"
        },{
        id: "rtsp_status", numeric: false, disablePadding: false, label: "Camera Status"
    },

    ];

    return (<>
        <CommonTable
            tableHead={headCells}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            pageSize={pageSize}
            pageNo={pageNo}
            handleChangePage={handleChangePage}
            filterEntities={filterEntities}
            totalRecords={filterEntities.length}
            checked={false}
            status={false}
            editFlag={false}
            infoFlag={false}
            deleteFlag={false}
        />
    </>);
}

export default AllCameraLogTable;
