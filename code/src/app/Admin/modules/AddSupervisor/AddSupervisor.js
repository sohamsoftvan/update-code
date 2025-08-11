import React, { useEffect, useMemo, useRef, useState } from "react";
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import {
    entityFilter,
    getFilteredAndPaginatedEntities,
    getPaginationOptions,
    headerSortingClasses,
    sortCaret,
    toAbsoluteUrl,
} from "../../../../_metronic/_helpers";
import { Card, CardBody, Pagination } from "../../../../_metronic/_partials/controls";
import {successToast, warningToast} from "../../../../utils/ToastMessage";
import { Col, Row } from "reactstrap";
import {CardHeader} from "@mui/material";
import AddSupervisorModal from "../Modal/addSupervisorModal";
import AssignLocationModal from "../Modal/assignLocationModal";
import {addSupervisor, assignLocationToSupervisor, getSupervisorList, updateSupervisorStatus} from "./_redux";
import SVG from "react-inlinesvg";
import { useSupervisorUIContext } from "./SupervisorUIContext";
import { AutoServingTable } from "../../../../utils/AutoServingTable";
import { SearchText } from "../../../../utils/SearchText";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../utils/SuperAdmin/CustomizedSwitch";
import TableLoader from "../../../../utils/SuperAdmin/Loader/TableLoader";
import {addNotification} from "../Notification/_redux/notification";
import {useDispatch, useSelector} from "react-redux";
import {fireAlert} from "../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../utils/SuperAdmin/enums/firAlert.enums";

export default function AddSupervisor() {
    const supervisorUIContext = useSupervisorUIContext();
    const supervisorUIProps = useMemo(() => supervisorUIContext, [supervisorUIContext]);

    const [modalOpen, setModalOpen] = useState(false);
    const [assignLocationModal, setAssignLocationModal] = useState(false);
    const [data, setData] = useState([]);
    const [blocking, setBlocking] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState("");
    const [specificUserId, setSpecificUserId] = useState("");
    const [selectedUserLocation, setSelectedUserLocation] = useState("");
    const [assignLoading, setAssignLoading]  = useState(false);

    const searchInput = useRef("");
    const [filterEntities, setFilterEntities] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const columns =[
        {
            dataField: "id",
            text: "INDEX",
            sort: true,
            sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "locations",
            text: "Locations",
            sort: true,
            sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "assignlocation",
            text: "Actions",
            style: { minWidth: "150px" },
            formatter: (cellContent, row) => (
                <>
                    <div
                        className="btn btn-icon mr-4 btn-light btn-hover-primary btn-hover-light-inverse btn-sm mx-3"
                        onClick={() => handleAssignLocation(cellContent, row)}
                    >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG title="Assign locations" src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")} />
                    </span>
                    </div>
                    <CustomizedSwitch
                        checked={cellContent[0].user_status}
                        onChange={() => handleUserStatusWithAlert(cellContent, row)}
                        color={"primary"}
                        className={"cursor-pointer"}
                    />
                </>
            ),
        }
    ]
    // Fetch supervisors
    const fetchSupervisors = () => {
        setBlocking(true);
        getSupervisorList()
            .then((response) => {
                if (response?.isSuccess) {
                    const responseData = response.data;
                    const formattedData = responseData.map((obj, index) => {
                        const locationNames = obj.locations?.map(loc => loc.location_name) || [];
                        const locationValues = obj.locations?.map(loc => ({
                            label: loc.location_name,
                            value: loc.id,
                        })) || [];

                        return {
                            id: index + 1,
                            email: obj.user_email,
                            locations: locationNames.join(", "),
                            assignlocation: [{
                                user_status: obj.user_status,
                                location: locationValues,
                                id: obj.id,
                            }]
                        };
                    });

                    setData(formattedData);
                    setFilterEntities(formattedData);
                }
                setBlocking(false);
            })
            .catch((error) => {
                setBlocking(false);
                warningToast(error?.detail || "Something went wrong!");
            });
    };

    // Triggers for re-fetch
    useEffect(() => {
        fetchSupervisors();
        //eslint-disable-next-line
    }, []);

    const handleAssignLocation = (cellContent, row) => {
        setSelectedUserId(row);
        setSpecificUserId(cellContent[0].id);
        setSelectedUserLocation(cellContent[0].location);
        setAssignLocationModal(true);
    };

    const handleUserStatusWithAlert = (cellContent,row) => {
        fireAlert(
            cellContent[0], // row or any object (not required by the callback here)
            FireAlertMessage?.statusChanges,
            () => {
                const updateStatus = {
                    user_status: !cellContent[0].user_status,
                    user_id: cellContent[0].id,
                };

                updateSupervisorStatus(updateStatus)
                    .then((response) => {
                        if (response?.isSuccess) {
                            fetchSupervisors();
                        }
                    })
                    .catch((error) => {
                        warningToast(error?.detail);
                    });
            }
        );
    };


    const filterSupervisor = (e) => {
        const searchStr = e?.target?.value || searchInput.current.value;
        const keys = ["email"];
        entityFilter(data, searchStr, keys, supervisorUIProps.queryParams, setFilterEntities);
    };

    useEffect(() => {
        filterSupervisor();
        //eslint-disable-next-line
    }, [data]);

    const currentItems = getFilteredAndPaginatedEntities(
        filterEntities,
        supervisorUIProps.queryParams
    );
    const toggleLocationModal = () => {
        setAssignLocationModal(false)
    }

    const handleAssignLocationData = (params, specific_user_id,selectedLocation) => {
        setAssignLoading(true)
        assignLocationToSupervisor(params, specific_user_id)
            .then(response => {
                if (response?.isSuccess) {
                    toggleLocationModal()
                    setAssignLoading(false)
                    fetchSupervisors();
                    const addedLocationLabels = selectedLocation.map((loc) => loc.label).join(" ");
                    dispatch(
                        addNotification({
                            notification_message: `Assign Location Added: ${addedLocationLabels}`,
                            user_id: user.id,
                            type_of_notification: "string",
                            status: true,
                            is_unread: true,
                        })
                    );
                    successToast("Assign Location Added Successful");
                }
            })
            .catch(error => {
                if (error.detail) {
                    setAssignLoading(false)
                    setAssignLocationModal(false)
                    console.error("error.detail",error.detail)
                }
            });
    }
    const toggleSupervisorModal = () => {
        setModalOpen(false);
    }
    const handleAddSupervisor = (param) => {
        addSupervisor(param)
            .then(response => {
                if (response?.isSuccess) {
                    toggleSupervisorModal();
                    fetchSupervisors();
                    const notificationData = {
                        notification_message: `Supervisor Added : ${param?.user_email}`,
                        user_id: user.id,
                        type_of_notification: "string",
                        status: true,
                        is_unread: true,
                    };

                    addNotification(notificationData)
                        .then(notificationRes => {
                            if (notificationRes?.isSuccess) {
                                successToast("Supervisor Added Successfully");
                            }
                        })
                        .catch(error => {
                            console.log("Notification Error:", error?.detail);
                        });
                }
            })
            .catch(error => {
                setModalOpen(false);
                console.log(error?.detail || "Something went wrong");
            });

    }
    return (
            <Card className="example example-compact fixed-height-card">
                <CardBody className="custom-card-body">
                    <Row className="align-items-center">
                        <Col xs={12} md={6}>
                            <CardHeader title="Supervisor Details" className="p-2" />
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex justify-content-md-end flex-wrap gap-2 mt-2 mt-md-0">
                                <div className="mr-3">
                                    <SearchText reference={searchInput} onChangeHandler={filterSupervisor} />
                                </div>
                                <CustomizedButtons
                                    className="btn btn-primary"
                                    title="Add Supervisor"
                                    submit={() => setModalOpen(true)}
                                    color="primary"
                                />
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <div className={"table-wrapper-common"}>
                        {blocking ? (
                            <div className="table-loader-wrapper">
                                <TableLoader rows={currentItems?.length} columns={columns.length} />
                            </div>
                        ) : (
                            <>
                                <PaginationProvider pagination={paginationFactory(getPaginationOptions(filterEntities.length, supervisorUIProps.queryParams))}>
                                    {({ paginationProps, paginationTableProps }) => (
                                        <>
                                            <AutoServingTable
                                                columns={columns}
                                                items={currentItems}
                                                tableChangeHandler={supervisorUIProps.setQueryParams}
                                                paginationTableProps={paginationTableProps}
                                                className={currentItems.length > 0 ? "table-wrapper-common" : "table-wrapper-common-no-data"}
                                                noDataIndication={() => (
                                                    <div className="table-noDataIndication">No Data Found</div>
                                                )}
                                            />
                                            {currentItems.length > 0 && (
                                                <Pagination paginationProps={paginationProps} />)}
                                        </>
                                    )}
                                </PaginationProvider>

                            </>
                        )}
                    </div>

                    {assignLocationModal && (
                        <AssignLocationModal
                            specific_user_id={specificUserId}
                            assignLoading={assignLoading}
                            selectedUserLocation={selectedUserLocation}
                            selectedUser={selectedUserId}
                            toggleLocationModal={toggleLocationModal}
                            modalOpen={assignLocationModal}
                            handleAssignLocation={handleAssignLocationData}
                        />
                    )}
                    {modalOpen && (
                        <AddSupervisorModal
                            modalOpen={modalOpen}
                            toggleSupervisorModal={toggleSupervisorModal}
                            handleAssSupervisor={handleAddSupervisor}
                        />
                    )}
                </CardBody>
            </Card>
    );
}
