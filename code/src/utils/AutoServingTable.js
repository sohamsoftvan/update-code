import * as uiHelpers from "./UIHelpers";
import {getHandlerTableChange, NoRecordsFoundMessage, PleaseWaitMessage,} from "../_metronic/_helpers";
import BootstrapTable from "react-bootstrap-table-next";
import React from "react";

export const AutoServingTable = ({
                                   items,
                                   columns,
                                   tableChangeHandler,
                                   paginationTableProps,
                                   selectRow, className,noDataIndication
                                 }) => {
  const {page, sizePerPage} = paginationTableProps?.pagination?.options;
  const idxStart = (page - 1) * sizePerPage + 1;
  return (
      <div className={className}>
        <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes={"table table-head-custom sticky-header-table employeeTable table-vertical-center table-horizontal-center"}
            bootstrap4
            remote
            keyField="id"
            data={items?.map((i, idx) => ({...i, idx: idxStart + idx})) || []}
            columns={columns}
            defaultSorted={uiHelpers.defaultSorted}
            onTableChange={getHandlerTableChange(tableChangeHandler)}
            hideSelectColumn
            noDataIndication={noDataIndication}
            {...paginationTableProps}
            selectRow={selectRow}

        >
          <PleaseWaitMessage entities={items}/>
          <NoRecordsFoundMessage entities={items}/>
        </BootstrapTable>
      </div>
  );
};
