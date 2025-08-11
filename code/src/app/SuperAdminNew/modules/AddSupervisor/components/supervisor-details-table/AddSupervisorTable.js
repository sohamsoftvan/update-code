import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../../utils/SuperAdmin/Table/CommonTable";

function AddSupervisorTable({
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
    id: "user_email", numeric: false, disablePadding: false, label: "Email"
  },{
      id: "locations", numeric: false, disablePadding: false, label: "Location"
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
        editName={"Edit Supervisor"}
        infoFlag={false}
        deleteFlag={true}
        deleteName={"Delete Supervisor"}
        onChangeSwitch={onChangeSwitch}
        assignedUserData={assignedUserData}
        deleteModalDataTable={deleteModalDataTable}
        classNameFlag={classNameFlag}
    />
  </>);
}

export default AddSupervisorTable;
