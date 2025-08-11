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
        id: "location_details", numeric: false, disablePadding: false, label: "Location"
    },{
        id: "camera_name", numeric: false, disablePadding: false, label: "Cameras"
    },{
        id: "ai_model_details", numeric: false, disablePadding: false, label: "Models"
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
