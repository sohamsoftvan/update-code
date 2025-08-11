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
import {useFeedbackUIContext} from "../FeedbackUIContext";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../_redux/FeedbackAction";
import {SearchText} from "../../../../../../utils/SearchText";
import {AutoServingTable} from "../../../../../../utils/AutoServingTable";
import BlockUi from "react-block-ui";
import * as moment from "moment";

export function FeedbackTable() {
    // Customers UI Context
    const feedbackUIContext = useFeedbackUIContext();
    const feedbackUIProps = useMemo(() => feedbackUIContext, [feedbackUIContext]);

    // Table columns
    const columns = [
        {
            dataField: "idx",
            text: "Index",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {
                minWidth: '55px'
            }
        },
        {
            dataField: "feedback_message",
            text: "Feedback Message",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {
                minWidth: '165px'
            }
        },
        {
            dataField: "ratings",
            text: "Ratings",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {
                minWidth: '55px'
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
                openEditFeedbackDialog: feedbackUIProps.openEditFeedbackDialog,
            },
            style: {
                minWidth: "100px",
            },
        },
    ];

    const {currentState} = useSelector(
        (state) => ({currentState: state.feedback}),
        shallowEqual
    );
    const {entities, listLoading,tableData} = currentState;
    const [filterEntities, setFilterEntities] = useState(entities);
    const searchInput = useRef('');
    let currentItems = getFilteredAndPaginatedEntities(filterEntities || entities, feedbackUIProps.queryParams);
    //currentItems = [...entities]

    const filterFeedback = (e) => {
        const searchStr = e?.target?.value || searchInput.current.value;
        const keys = ['id', 'feedback_message'];
        currentItems = entityFilter(entities || filterEntities, searchStr, keys, feedbackUIProps.queryParams, setFilterEntities)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchFeedback());
    }, [feedbackUIProps.queryParams, dispatch]);

    useEffect(() => {
        filterFeedback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entities])

    return (
        <>
            {tableData ?
            <PaginationProvider
                pagination={
                    paginationFactory(getPaginationOptions(filterEntities?.length, feedbackUIProps.queryParams))
                }
            >
                {({paginationProps, paginationTableProps}) => {
                    return (
                        <Pagination
                         //   isLoading={listLoading}
                            paginationProps={paginationProps}
                        >
                            <SearchText className="col-xl-3 col-md-3 col-12 " reference={searchInput} onChangeHandler={filterFeedback}/>
                            <BlockUi tag="div" blocking={listLoading} color="#147b82">
                                <AutoServingTable
                                    columns={columns}
                                    items={currentItems}
                                    tableChangeHandler={feedbackUIProps.setQueryParams}
                                    paginationTableProps={paginationTableProps}
                                />
                            </BlockUi>
                        </Pagination>
                    );
                }}
            </PaginationProvider>
        :
                <h3 style={{paddingTop: "40px"}} className="text-center">No Data Found</h3>
            }
        </>
    );
}
