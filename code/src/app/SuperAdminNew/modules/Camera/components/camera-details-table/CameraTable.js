import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../../utils/SuperAdmin/Table/CommonTable";

function CameraTable({
                         currentItems,
                         pageNo,
                         pageSize,
                         handleChangeRowsPerPage,
                         handleChangePage,
                         editModalDataTable,
                         onChangeSwitch,
                         assignedUserData,
                         deleteModalDataTable,
                         classNameFlag
                       }) {
  const [filterEntities, setFilterEntities] = useState([]);

  useEffect(() => {
    setFilterEntities(currentItems);
  }, [currentItems]);

  const headCells = [{
      id: "location_details", numeric: false, disablePadding: false, label: "Location Name"
  },{
    id: "camera_name", numeric: false, disablePadding: false, label: "Camera Name"
  },{
    id: "created_date", numeric: false, disablePadding: false, label: "Created Date"
  }, {
    id: "updated_date", numeric: false, disablePadding: false, label: "Updated Date"
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
        checked={true}
        status={true}
        editFlag={true}
        editName={"Edit Camera"}
        infoFlag={false}
        deleteFlag={true}
        deleteName={"Delete Camera"}
        onChangeSwitch={onChangeSwitch}
        assignedUserData={assignedUserData}
        deleteModalDataTable={deleteModalDataTable}
        classNameFlag={classNameFlag}
    />
  </>);
}

export default CameraTable;
