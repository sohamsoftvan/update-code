import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../utils/SuperAdmin/Table/CommonTable";

function CameraLabelMappingTable({
                         currentItems,
                         pageNo,
                         pageSize,
                         handleChangeRowsPerPage,
                         handleChangePage,
                         editModalDataTable,
                         classNameFlag
                       }) {
  const [filterEntities, setFilterEntities] = useState([]);

  useEffect(() => {
    setFilterEntities(currentItems);
  }, [currentItems]);

  const headCells = [{
    id: "company_name", numeric: false, disablePadding: false, label: "Company Name"
  },{
    id: "role", numeric: false, disablePadding: false, label: "User Role"
  }, {
    id: "camera_name", numeric: false, disablePadding: false, label: "Camera Name"
  },{
      id: "camera_labels", numeric: false, disablePadding: false, label: "Labels"
  }

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
        status={false}
        editFlag={true}
        editName={"Edit label mapping"}
        infoFlag={false}
        deleteFlag={false}
        classNameFlag={classNameFlag}
    />
  </>);
}

export default CameraLabelMappingTable;
