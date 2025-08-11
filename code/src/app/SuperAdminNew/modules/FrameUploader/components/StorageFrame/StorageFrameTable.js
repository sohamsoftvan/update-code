import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../../utils/SuperAdmin/Table/CommonTable";

function StorageFrameTable({
                                    currentItems,
                                    pageNo,
                                    pageSize,
                                    handleChangeRowsPerPage,
                                    handleChangePage,handleUploadModal
                                }) {
    const [filterEntities, setFilterEntities] = useState([]);

    useEffect(() => {
        setFilterEntities(currentItems);
    }, [currentItems]);

    const headCells = [{
        id: "user_role", numeric: false, disablePadding: false, label: "User Role"
    }, {
        id: "user_email", numeric: false, disablePadding: false, label: "User Name"
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
            editFlag={false}
            infoFlag={false}
            deleteFlag={false}
            uploadName={"Upload Frame"}
            uploadFrame={true}
            uploadModal={handleUploadModal}
        />
    </>);
}

export default StorageFrameTable;
