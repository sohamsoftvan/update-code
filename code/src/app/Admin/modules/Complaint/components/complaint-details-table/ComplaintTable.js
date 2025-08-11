import React, {useEffect, useMemo, useRef, useState} from "react";
import paginationFactory, {PaginationProvider} from "react-bootstrap-table2-paginator";
import {
    entityFilter,
    getFilteredAndPaginatedEntities,
    getPaginationOptions,
    headerSortingClasses,
    sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import {Pagination} from "../../../../../../_metronic/_partials/controls";
import {useComplaintUIContext} from "../ComplaintUIContext";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../_redux/ComplaintAction";
import {SearchText} from "../../../../../../utils/SearchText";
import {AutoServingTable} from "../../../../../../utils/AutoServingTable";
import BlockUi from "react-block-ui";
import * as moment from "moment";

export function ComplaintTable() {
    // Customers UI Context
    const complaintUIContext = useComplaintUIContext();
    const complaintUIProps = useMemo(() => complaintUIContext, [complaintUIContext]);

    // Table columns
    const columns = [
        {
            dataField: "idx",
            text: "Index",
            style: {
                minWidth: '55px'
            }
        },
        {
            dataField: "complaint_message",
            text: "Complaint Name",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {
                minWidth: '165px'
            }
        },
        {
            dataField: "created_date",
            text: "Created Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            //formatter: dateTimeFormatter,
            formatter: (_, row) =>moment.utc(row?.created_date).local().format("MMMM DD YYYY, h:mm:ss a"),

            style: {
                minWidth: 180
            }
        },
        {
            dataField: "updated_date",
            text: "Updated Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            //formatter: dateTimeFormatter,
            formatter: (_, row) =>moment.utc(row?.updated_date).local().format("MMMM DD YYYY, h:mm:ss a"),

            style: {
                minWidth: 180
            }
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openViewComplaintImage: complaintUIProps.openViewComplaintImage,
            },
            style: {
                minWidth: "100px",
            },
        },
    ];

    const {currentState} = useSelector(
        (state) => ({currentState: state.complaint}),
        shallowEqual
    );

    const {entities, listLoading,tableData} = currentState;
    const [filterEntities, setFilterEntities] = useState(entities);
    const searchInput = useRef('');
    let currentItems = getFilteredAndPaginatedEntities(filterEntities || entities, complaintUIProps.queryParams);

    const filterComplaint = (e) => {
        const searchStr = e?.target?.value || searchInput.current.value;
        const keys = ['id', 'complaint_message'];
        currentItems = entityFilter(entities || filterEntities, searchStr, keys, complaintUIProps.queryParams, setFilterEntities)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchComplaint());
    }, [complaintUIProps.queryParams, dispatch]);

    useEffect(() => {
        filterComplaint();
        // eslint-disable-next-line
    }, [entities])

    return (
        <>
            {tableData ?
            <PaginationProvider
                pagination={
                    paginationFactory(getPaginationOptions(filterEntities?.length, complaintUIProps.queryParams))
                }
            >
                {({paginationProps, paginationTableProps}) => {
                    return (
                        <Pagination
                           // isLoading={listLoading}
                            paginationProps={paginationProps}
                        >
                            <SearchText className="col-xl-3 col-md-3 col-12 " reference={searchInput} onChangeHandler={filterComplaint}/>
                            <BlockUi tag="div" blocking={listLoading} color="#147b82">
                          
                            <AutoServingTable
                                columns={columns}
                                items={currentItems}
                                tableChangeHandler={complaintUIProps.setQueryParams}
                                paginationTableProps={paginationTableProps}
                            />
                            </BlockUi>
                        </Pagination>
                    );
                }}
            </PaginationProvider>:
                <h3 style={{paddingTop: "40px"}} className="text-center">No Data Found</h3>
            }
        </>
    );
}
