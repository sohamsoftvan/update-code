import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const CommonBoootstrapTable = ({
                                          columns,
                                          data,
                                          sizePerPage,
                                          onTableChange,
                                          page,
                                          totalSize,
                                          sizePerPageChange,
                                          hideSizePerPage,
                                          alwaysShowAllBtns,
                                          hidePageListOnlyOnePage,
                                          sizePerPageList,
                                          showTotal,
                                          noDataIndication
                                      }) => {
    const paginationOptions =
        data && data.length > 0
            ? paginationFactory({
                sizePerPage: sizePerPage,
                page: page,
                totalSize: totalSize,
                showTotal: showTotal,
                sizePerPageList: sizePerPageList,
                hideSizePerPage: hideSizePerPage,
                alwaysShowAllBtns: alwaysShowAllBtns,
                hidePageListOnlyOnePage: hidePageListOnlyOnePage,
                onPageChange: onTableChange,
                onSizePerPageChange: sizePerPageChange
            })
            : '';

    return (
        <BootstrapTable
            keyField="_id"
            remote
            classes="table table-head-custom sticky-header-table employeeTable"
            bootstrap4
            bordered={false}
            wrapperClasses="table-responsive"
            data={data}
            columns={columns}
            noDataIndication={noDataIndication}
            pagination={paginationOptions}
        />
    );
};
