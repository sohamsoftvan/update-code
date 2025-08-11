import React, {useEffect, useState} from "react";
import CommonTable from "../../../../../../utils/SuperAdmin/Table/CommonTable";

function CompanyUserTable({
                         currentItems,
                         pageNo,
                         pageSize,
                         handleChangeRowsPerPage,
                         handleChangePage,
                         editModalDataTable,
                         onChangeSwitch,
                         assignedUserData,
                              infoModalDataTable,
                         classNameFlag,configuredModalDataTable
                       }) {
  const [filterEntities, setFilterEntities] = useState([]);

  useEffect(() => {
    setFilterEntities(currentItems);
  }, [currentItems]);

  const headCells = [{
    id: "company_name", numeric: false, disablePadding: false, label: "company Name"
  },{
    id: "created_date", numeric: false, disablePadding: false, label: "Created Date"
  }, {
    id: "updated_date", numeric: false, disablePadding: false, label: "Updated Date"
  },{
      id:"configured", numeric: false, disablePadding: false, label: "configured"
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
        editName={"Edit Company User"}
        infoFlag={true}
        infoName={"Company User Information"}
        infoModalDataTable={infoModalDataTable}
        deleteFlag={false}
        onChangeSwitch={onChangeSwitch}
        assignedUserData={assignedUserData}
        classNameFlag={classNameFlag}
        configured={true}
        ConfiguredName={"company User Configuration"}
        configuredModalDataTable={configuredModalDataTable}
    />
  </>);
}

export default CompanyUserTable;
