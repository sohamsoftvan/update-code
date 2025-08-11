import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../utils/SuperAdmin/Table/CommonTable";

function AllCameraTable({
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
        id: "camera_name", numeric: false, disablePadding: false, label: "Cameras"
    },{
        id: "is_active", numeric: false, disablePadding: false, label: "Camera Status"
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

export default AllCameraTable;
