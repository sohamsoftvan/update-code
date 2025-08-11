import * as React from "react";
import PropTypes from "prop-types";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FormTitle from "../FormTitle";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    useTheme
} from "@mui/material";
import TableDropDownMenu from "./TableDropDownMenu";
import CustomizedSwitch from "../CustomizedSwitch";
import moment from "moment";
import {StatusFormatter} from "../StatusFormatter";
import {Tooltip} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomizedButtons from "../CustomizedButtons";


function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight/>
                ) : (
                    <KeyboardArrowLeft/>
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft/>
                ) : (
                    <KeyboardArrowRight/>
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired
};

export default function CommonTable({
                                        tableHead,
                                        handleChangeRowsPerPage,
                                        handleChangePage,
                                        pageNo,
                                        pageSize,
                                        filterEntities,
                                        status,
                                        editName,
                                        editFlag,
                                        editModalDataTable,
                                        organizationsValue,
                                        deleteFlag,
                                        deleteName,
                                        onChangeSwitch,
                                        deleteModalDataTable,
                                        totalRecords,
                                        backendPagination,
                                        infoModalDataTable,
                                        infoName,
                                        infoFlag,
                                        cameraFlag,
                                        cameraModalDataTable,
                                        cameraName,
                                        loading,
                                        handleDeployment,
                                        configuredModalDataTable,
                                        uploadName,
                                        uploadModal,
                                        uploadFrame,
                                    }) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");

    const handleRequestSort = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
        // Optionally, trigger data sorting or API call here
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const createSortHandler = property => event => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    function stableSort(array, comparator) {
        if (!array || !Array.isArray(array)) {
            // Handle the case where the input array is undefined or not an array
            return [];
        }

        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    const visibleRows = React.useMemo(() => {
        function getComparator(order, orderBy) {
            return order === "desc"
                ? (a, b) => descendingComparator(a, b, orderBy)
                : (a, b) => -descendingComparator(a, b, orderBy);
        }

        return stableSort(filterEntities, getComparator(order, orderBy)).slice(
            pageNo * pageSize,
            pageNo * pageSize + pageSize
        );
    }, [filterEntities, order, orderBy, pageNo, pageSize]);


    return (
        <>
            {filterEntities && filterEntities?.length > 0 && (
                <>
                    <div style={{
                        height: "calc(100vh - 335px)",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <TableContainer style={{flex: 1, overflow: "auto"}}>
                            <Table stickyHeader aria-label="custom pagination table">
                                <TableHead className={"table-header"}>
                                    <TableRow>
                                        <TableCell align={"center"}>Index</TableCell>
                                        {tableHead &&
                                            tableHead.map(headCell => (
                                                <TableCell
                                                    key={headCell.id}
                                                    align="center"
                                                    padding="normal"
                                                    sortDirection={orderBy === headCell.id ? order : false}
                                                >
                                                    {headCell.id === "location_name" ? (
                                                        <>
                                                            <TableSortLabel
                                                                active={orderBy === headCell.id}
                                                                direction={orderBy === headCell.id ? order : "asc"}
                                                                onClick={createSortHandler(headCell.id)}
                                                            >
                                                                {headCell.label}
                                                            </TableSortLabel>
                                                        </>
                                                    ) : (
                                                        headCell.label
                                                    )}
                                                </TableCell>
                                            ))}
                                        {status && (
                                            <TableCell>Status</TableCell>
                                        )}
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(pageSize > 0 && backendPagination ? filterEntities : visibleRows).map((row, index) => (
                                        <TableRow key={row.id || index}>
                                            <TableCell align="center">
                                                {pageNo * pageSize + (index + 1)}
                                            </TableCell>
                                            {tableHead &&
                                                tableHead.map(column => {
                                                    const value = row[column.id];
                                                    const cellKey = `${row.id}-${column.id}`;
                                                    return (
                                                        <>
                                                            {column.id === "location_name" ? (
                                                                <>
                                                                    <TableCell

                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {value || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "camera_labels" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.labels.map(data => data).join(", ") || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "company_name" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.user_details?.company?.company_name || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "role" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.user_details?.roles[0]?.role || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "deployment_status" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        <CustomizedButtons
                                                                            title={loading ? "Loading..." : row?.deployment_status ? "Request" : "Response"}
                                                                            color="primary"
                                                                            disabled={loading}
                                                                            submit={handleDeployment}
                                                                        />

                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "camera_detail" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.camera_detail?.camera_name || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "model_details" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.deployment_job_rtsp_details?.model_details?.model_name || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "model_details_deployment" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.model_details?.model_name || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "location_details" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {row?.location_details?.location_name || "-"}
                                                                    </TableCell>
                                                                </>
                                                            ) : column.id === "model_status" ? (
                                                                <>
                                                                    <TableCell
                                                                        key={cellKey}
                                                                        align={"center"}
                                                                    >
                                                                        {StatusFormatter(row)}
                                                                    </TableCell>
                                                                </>
                                                            ) : column?.id === "is_active" ||
                                                            column?.id === "rtsp_status" ? (
                                                                <>
                                                                    <>
                                                                        <TableCell
                                                                            key={cellKey}
                                                                            align={"center"}
                                                                        >
                                                                            {(row?.is_active || row?.rtsp_status) ? <>
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: "#196e00d1",
                                                                            color: "white",
                                                                            padding: "5px 12px",
                                                                            borderRadius: "12px",
                                                                        }}
                                                                    >
                                                                      Active
                                                                    </span></> : <>
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: "#b9323fe6",
                                                                            color: "white",
                                                                            padding: "5px 12px",
                                                                            borderRadius: "12px",
                                                                        }}
                                                                    >
                                                                      Inactive
                                                                    </span></>}
                                                                        </TableCell>
                                                                    </>
                                                                </>
                                                            ) : column.id === "ai_model_details" ? (
                                                                <>
                                                                    <>
                                                                        <TableCell
                                                                            key={cellKey}
                                                                            align={"center"}
                                                                        >
                                                                            {row?.ai_model_details?.model_details?.model_name || "-"}
                                                                        </TableCell>
                                                                    </>
                                                                </>
                                                            ) : column.id === "locations" ? (
                                                                <>
                                                                    <>
                                                                        <TableCell
                                                                            key={cellKey}
                                                                            align={"center"}
                                                                        >
                                                                            {row?.locations && row.locations.length > 0
                                                                                ? row.locations.map(loc => loc.location_name).join(", ")
                                                                                : "-"}
                                                                        </TableCell>
                                                                    </>
                                                                </>
                                                            ) : column.id === "created_date" ? (
                                                                <>
                                                                    <>
                                                                        <TableCell
                                                                            key={cellKey}
                                                                            align={"center"}
                                                                        >
                                                                            {moment
                                                                                .utc(row?.created_date)
                                                                                .local()
                                                                                .format("DD MMMM YYYY, HH:mm:ss")}
                                                                        </TableCell>
                                                                    </>
                                                                </>
                                                            ) : column.id === "updated_date" ? (
                                                                <>
                                                                    <>
                                                                        <TableCell
                                                                            key={cellKey}
                                                                            align={"center"}
                                                                        >
                                                                            {moment
                                                                                .utc(row?.updated_date)
                                                                                .local()
                                                                                .format("DD MMMM YYYY, HH:mm:ss")}
                                                                        </TableCell>
                                                                    </>
                                                                </>
                                                            ) : column.id === "configured" ? (
                                                                <TableCell
                                                                    key={cellKey}
                                                                    align={"center"}
                                                                >

                                                                    <Tooltip title={
                                                                        <div>{"company User Configuration"}</div>}
                                                                             placement={"top"}>
                                                                        <SettingsIcon
                                                                            className={
                                                                                row?.users?.some(user => user?.role === "admin")
                                                                                    ? "cursor-pointer"
                                                                                    : "cursor-not-allowed"
                                                                            }
                                                                            onClick={() => {
                                                                                row?.users?.some(user => user?.role === "admin") &&
                                                                                configuredModalDataTable(row)
                                                                            }}
                                                                            style={{fontSize: "20px"}}
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            ) : (
                                                                <TableCell
                                                                    key={cellKey}
                                                                    align={"center"}
                                                                >
                                                                    {value || "-"}
                                                                </TableCell>
                                                            )}
                                                        </>
                                                    );
                                                })}

                                            {status && (
                                                <TableCell>
                                                    <CustomizedSwitch
                                                        checked={row.status}
                                                        onChange={() => onChangeSwitch(row)}
                                                        color={"primary"}
                                                        className={"cursor-pointer"}
                                                    />
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <TableDropDownMenu
                                                    editFlag={editFlag}
                                                    editName={editName}
                                                    editModalDataTable={() => editModalDataTable(row, organizationsValue?.id)}
                                                    deleteFlag={deleteFlag}
                                                    deleteName={deleteName}
                                                    deleteModalDataTable={() => deleteModalDataTable(row)}
                                                    infoFlag={infoFlag}
                                                    infoModalDataTable={() => infoModalDataTable(row)}
                                                    infoName={infoName}
                                                    cameraName={cameraName}
                                                    cameraFlag={cameraFlag}
                                                    cameraModalDataTable={() => cameraModalDataTable(row)}
                                                    uploadModal={() => uploadModal(row)}
                                                    uploadFrame={uploadFrame}
                                                    uploadName={uploadName}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={totalRecords}
                            rowsPerPage={pageSize}
                            page={pageNo}
                            className={"tusk_table_pagination_override"}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            onChangePage={handleChangePage}/>
                    </div>
                </>

            )}


            {(!filterEntities || filterEntities.length === 0) && (
                <>
                    <div style={{height: "calc(100vh - 335px)"}}>
                        <TableContainer
                            className={"d-flex justify-content-around"}
                        >
                            <FormTitle variant={"h6"} title={"No Data Found"}/>
                        </TableContainer>
                    </div>
                </>
            )}

        </>
    );
}
