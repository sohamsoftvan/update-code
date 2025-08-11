import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import Boundingbox from "image-bounding-box-custom";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import * as moment from "moment";
import { withStyles } from "@mui/styles";
import { CardMedia } from "@mui/material";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";
import CustomFrameControls from "../../../../utils/SuperAdmin/CustomFrameControls";

const styles = theme => ({
    card: {
        maxWidth: 416, height: "100%", margin: "auto"
    }, media: {
        height: 230
    }, header: {
        paddingBottom: "0rem"
    }, learnMore: {
        position: "absolute", bottom: 0
    }, cardCol: {
        height: 220, marginTop: 25, marginBottom: 15
    }
});

class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData || [], // Ensure tableData is initialized
            showBarTable: props.showBarTable,
            dashboardGraphName: props.dashboardGraphName,
            columns: null,
            data: [],
            viewImageModal: false,
            cameraData: props.cameraData || {}, // Ensure cameraData is initialized
            currentFrameIndex: 0, // Start with the first frame
        };
    }

    componentDidMount() {
        this.initializeColumns();
        this.getColumnsAndData();
    }

    initializeColumns = () => {
        let columns = [];
        if (this.props.dashboardGraphName === "Label") {
            columns = [{dataField: "camera_name", text: "Camera"}, {
                dataField: "count",
                text: "Count"
            }, {dataField: "date", text: "Date"}, {dataField: "labels", text: "Labels"},];
        } else {
            columns = [{dataField: "event_name", text: "Event"}, {
                dataField: "event_type",
                text: "Event Type"
            }, {dataField: "event_desc", text: "Event Description"}, {
                dataField: "camera_name",
                text: "Camera Name"
            }, {dataField: "event_date", text: "Event Date"},];
        }
        this.setState({columns});
    };

    getColumnsAndData = () => {
        const {currentFrameIndex, tableData, cameraData} = this.state;

        if (!tableData.length) return;

        const frame = tableData[currentFrameIndex]; // Get the current frame
        let data = [];

        if (this.props.dashboardGraphName === "Label") {
            const camera_name = cameraData[frame?.camera_id] || "Unknown Camera";
            const count = frame?.result?.detection?.length || 0;
            const date = moment
                .utc(frame?.created_date?.$date)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a");
            const labels = Object.keys(frame?.counts || {}).toString();

            data.push({camera_name, count, date, labels});
        } else {
            const camera_name = cameraData[frame?.camera_id] || "Unknown Camera";
            const event_name = frame?.event_name || "N/A";
            const event_desc = frame?.event_desc || "N/A";
            const event_type = frame?.event_type || "N/A";
            const event_date = moment
                .utc(frame?.event_date?.$date)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a");

            data.push({event_name, event_desc, event_type, camera_name, event_date});
        }

        this.setState({data});
    };

    handleNextFrame = () => {
        this.setState((prevState) => ({
                currentFrameIndex: Math.min(prevState.currentFrameIndex + 1, prevState.tableData.length - 1),
            }), this.getColumnsAndData // Update data after changing frame
        );
    };

    handlePrevFrame = () => {
        this.setState((prevState) => ({
                currentFrameIndex: Math.max(prevState.currentFrameIndex - 1, 0),
            }), this.getColumnsAndData // Update data after changing frame
        );
    };

    handleCloseModal = () => {
        this.setState({showBarTable: false});
    };

    render() {
        const {user} = this.props;
        const {columns, data, currentFrameIndex, tableData} = this.state;
        return (

            <CommonModal
                size="lg"
                show={this.state.showBarTable}
                handleClose={this.handleCloseModal}
                arialabelledby="example-modal-sizes-title-lg"
                title={this.props.dashboardGraphName === "Label"
                    ? "My Result Details"
                    : "My Events Details"}
                closeButtonFlag={true}
                scrollable={false}
                applyButton={false}
                content={
                    <>
                        {user?.user_email == 'megawide@hiro.ai' ?
                            <Tabs
                                activeKey={this.state.activeTab}
                                onSelect={(key) => this.setState({activeTab: key})}
                                id="media-tabs"
                                className="mb-3"
                            >
                                {/* Images Tab */}
                                <Tab eventKey="images" title="Images">
                                    <>
                                        {data.length > 0 ? (
                                            <BootstrapTable
                                                bootstrap4
                                                keyField="id"
                                                data={data}
                                                columns={columns}
                                                bordered={false}
                                                wrapperClasses="table-responsive"
                                            />
                                        ) : (
                                            <p>No data available</p>
                                        )}

                                        {this.props.dashboardGraphName === "Label" ? (
                                            <TransformWrapper
                                                defaultScale={1}
                                                defaultPositionX={200}
                                                defaultPositionY={100}
                                            >
                                                {({zoomIn, zoomOut, resetTransform}) => (
                                                    <>
                                                        <div className="tools" style={{width: "100%", marginBottom: "4px"}}>

                                                            <CustomFrameControls
                                                                zoomIn={zoomIn}
                                                                zoomOut={zoomOut}
                                                                className={"d-flex align-items-center justify-content-between"}
                                                                isFrame={true}
                                                                frameData={true}
                                                                resetTransform={resetTransform}
                                                                onPrev={this.handlePrevFrame}
                                                                onNext={this.handleNextFrame}
                                                                isFirstFrame={currentFrameIndex === 0}
                                                                isLastFrame={currentFrameIndex === tableData.length - 1}
                                                            />
                                                        </div>

                                                        <div className="boundimage-full w-100" style={{margin: "0 auto"}}>
                                                            <TransformComponent>
                                                                <Boundingbox
                                                                    key={currentFrameIndex}
                                                                    className="row m-auto col-12 p-0 text-center"
                                                                    image={tableData[currentFrameIndex]?.image_url}
                                                                    boxes={tableData[currentFrameIndex]?.result?.detection.map(d => ({
                                                                        coord: [d.location[0], d.location[1], d.location[2] - d.location[0], d.location[3] - d.location[1]],
                                                                        label: user.user_email !== 'fieldai_admin@tusker.ai' && d.label
                                                                    }))}
                                                                    showLabels={false}
                                                                    options={{
                                                                        colors: {
                                                                            normal: "red",
                                                                            selected: "red",
                                                                            unselected: "red"
                                                                        },
                                                                        style: {
                                                                            maxWidth: "100%",
                                                                            maxHeight: "90vh",
                                                                            margin: "auto",
                                                                            width: 752,
                                                                            color: "red",
                                                                            height: 470
                                                                        }
                                                                    }}
                                                                />
                                                            </TransformComponent>
                                                        </div>
                                                    </>
                                                )}
                                            </TransformWrapper>
                                        ) : (
                                            <>
                                                {tableData[currentFrameIndex]?.image_list ? (
                                                    <Row>
                                                        {/* First Image */}
                                                        <Col xl={6} md={6} sm={12} lg={6}>
                                                            <TransformWrapper defaultScale={1} defaultPositionX={200}
                                                                              defaultPositionY={100}>
                                                                {({zoomIn, zoomOut, resetTransform}) => (
                                                                    <>
                                                                        <div className="tools"
                                                                             style={{width: "100%", marginBottom: "4px"}}>
                                                                            <CustomFrameControls
                                                                                zoomIn={zoomIn}
                                                                                zoomOut={zoomOut}
                                                                                resetTransform={resetTransform}
                                                                                frameData={true}
                                                                            />
                                                                        </div>
                                                                        <div className="boundimage-full w-100"
                                                                             style={{margin: "0 auto"}}>
                                                                            <TransformComponent>
                                                                                <div className="mt-5 mb-5">
                                                                                    <CardMedia style={{cursor: "pointer"}}
                                                                                               alt="Image Here 1">
                                                                                        <Boundingbox
                                                                                            className="row m-auto col-12 p-0 text-center"
                                                                                            image={
                                                                                                tableData[currentFrameIndex]?.image_list[0]?.imageUrl ||
                                                                                                tableData[currentFrameIndex]?.image_list[0]
                                                                                            }
                                                                                            options={{
                                                                                                colors: {
                                                                                                    normal: "red",
                                                                                                    selected: "red",
                                                                                                    unselected: "red"
                                                                                                },
                                                                                                style: {
                                                                                                    maxWidth: "100%",
                                                                                                    maxHeight: "100vh",
                                                                                                    margin: "auto",
                                                                                                    width: "100vw",
                                                                                                    color: "red",
                                                                                                    height: 510
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </CardMedia>
                                                                                </div>
                                                                            </TransformComponent>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </TransformWrapper>
                                                        </Col>

                                                        {/* Last Image */}
                                                        <Col xl={6} md={6} sm={12} lg={6}>
                                                            <TransformWrapper defaultScale={1} defaultPositionX={200}
                                                                              defaultPositionY={100}>
                                                                {({zoomIn, zoomOut, resetTransform}) => (
                                                                    <>
                                                                        <div className="tools"
                                                                             style={{width: "100%", marginBottom: "4px"}}>
                                                                            <CustomFrameControls
                                                                                zoomIn={zoomIn}
                                                                                zoomOut={zoomOut}
                                                                                resetTransform={resetTransform}
                                                                                frameData={true}
                                                                            />
                                                                        </div>
                                                                        <div className="boundimage-full w-100"
                                                                             style={{margin: "0 auto"}}>
                                                                            <TransformComponent>
                                                                                <div className="mt-5 mb-5">
                                                                                    <CardMedia style={{cursor: "pointer"}}
                                                                                               alt="Image Here 2">
                                                                                        <Boundingbox
                                                                                            className="row m-auto col-12 p-0 text-center"
                                                                                            image={
                                                                                                tableData[currentFrameIndex]?.image_list[
                                                                                                tableData[currentFrameIndex]?.image_list.length - 1
                                                                                                    ]?.imageUrl ||
                                                                                                tableData[currentFrameIndex]?.image_list[
                                                                                                tableData[currentFrameIndex]?.image_list.length - 1
                                                                                                    ]
                                                                                            }
                                                                                            options={{
                                                                                                colors: {
                                                                                                    normal: "red",
                                                                                                    selected: "red",
                                                                                                    unselected: "red"
                                                                                                },
                                                                                                style: {
                                                                                                    maxWidth: "100%",
                                                                                                    maxHeight: "100vh",
                                                                                                    margin: "auto",
                                                                                                    width: "100vw",
                                                                                                    color: "red",
                                                                                                    height: 510
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </CardMedia>
                                                                                </div>
                                                                            </TransformComponent>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </TransformWrapper>
                                                            Add New Location                                     </Col>
                                                    </Row>
                                                ) : null}
                                            </>
                                        )}
                                    </>
                                </Tab>

                                {/* Video Tab */}
                                <Tab eventKey="video" title="Video">
                                    {tableData[currentFrameIndex] ? (
                                        <div className="text-center">
                                            <video
                                                width="100%"
                                                height="auto"
                                                controls
                                                style={{maxHeight: "100vh", borderRadius: "0px"}}
                                            >
                                                <source src={tableData[0].video_url} type="video/mp4"/>
                                            </video>
                                        </div>
                                    ) : (
                                        <p className="text-center">No video available for this frame.</p>
                                    )}
                                </Tab>
                            </Tabs> :
                            <>
                                {data.length > 0 ? (
                                    <BootstrapTable
                                        bootstrap4
                                        keyField="id"
                                        data={data}
                                        columns={columns}
                                        bordered={false}
                                        wrapperClasses="table-responsive"
                                    />
                                ) : (
                                    <p>No data available</p>
                                )}

                                {this.props.dashboardGraphName === "Label" ? (
                                    <TransformWrapper
                                        defaultScale={1}
                                        defaultPositionX={200}
                                        defaultPositionY={100}
                                    >
                                        {({zoomIn, zoomOut, resetTransform}) => (
                                            <>
                                                <div className="tools" style={{width: "100%", marginBottom: "4px"}}>
                                                    <CustomFrameControls
                                                        zoomIn={zoomIn}
                                                        zoomOut={zoomOut}
                                                        className={"d-flex align-items-center justify-content-between"}
                                                        isFrame={true}
                                                        frameData={true}
                                                        resetTransform={resetTransform}
                                                        onPrev={this.handlePrevFrame}
                                                        onNext={this.handleNextFrame}
                                                        isFirstFrame={currentFrameIndex === 0}
                                                        isLastFrame={currentFrameIndex === tableData.length - 1}
                                                    />
                                                </div>

                                                <div className="boundimage-full w-100" style={{margin: "0 auto"}}>
                                                    <TransformComponent>
                                                        <Boundingbox
                                                            key={currentFrameIndex}
                                                            className="row m-auto col-12 p-0 text-center"
                                                            image={tableData[currentFrameIndex]?.image_url}
                                                            boxes={tableData[currentFrameIndex]?.result?.detection.map(d => ({
                                                                coord: [d.location[0], d.location[1], d.location[2] - d.location[0], d.location[3] - d.location[1]],
                                                                label: user.user_email !== 'fieldai_admin@tusker.ai' && d.label
                                                            }))}
                                                            showLabels={false}
                                                            options={{
                                                                colors: {
                                                                    normal: "red", selected: "red", unselected: "red"
                                                                },
                                                                style: {
                                                                    maxWidth: "100%",
                                                                    maxHeight: "90vh",
                                                                    margin: "auto",
                                                                    width: 752,
                                                                    color: "red",
                                                                    height: 470
                                                                }
                                                            }}
                                                        />
                                                    </TransformComponent>
                                                </div>
                                            </>
                                        )}
                                    </TransformWrapper>
                                ) : (
                                    <>
                                        {tableData[currentFrameIndex]?.image_list ? (
                                            <Row>
                                                {/* First Image */}
                                                <Col xl={6} md={6} sm={12} lg={6}>
                                                    <TransformWrapper defaultScale={1} defaultPositionX={200}
                                                                      defaultPositionY={100}>
                                                        {({zoomIn, zoomOut, resetTransform}) => (
                                                            <>
                                                                <div className="tools"
                                                                     style={{width: "100%", marginBottom: "4px"}}>
                                                                    <CustomFrameControls
                                                                        zoomIn={zoomIn}
                                                                        zoomOut={zoomOut}
                                                                        resetTransform={resetTransform}
                                                                        frameData={true}
                                                                    />
                                                                </div>
                                                                <div className="boundimage-full w-100"
                                                                     style={{margin: "0 auto"}}>
                                                                    <TransformComponent>
                                                                        <div className="mt-5 mb-5">
                                                                            <CardMedia style={{cursor: "pointer"}}
                                                                                       alt="Image Here 1">
                                                                                <Boundingbox
                                                                                    className="row m-auto col-12 p-0 text-center"
                                                                                    image={
                                                                                        tableData[currentFrameIndex]?.image_list[0]?.imageUrl ||
                                                                                        tableData[currentFrameIndex]?.image_list[0]
                                                                                    }
                                                                                    options={{
                                                                                        colors: {
                                                                                            normal: "red",
                                                                                            selected: "red",
                                                                                            unselected: "red"
                                                                                        },
                                                                                        style: {
                                                                                            maxWidth: "100%",
                                                                                            maxHeight: "100vh",
                                                                                            margin: "auto",
                                                                                            width: "100vw",
                                                                                            color: "red",
                                                                                            height: 510
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </CardMedia>
                                                                        </div>
                                                                    </TransformComponent>
                                                                </div>
                                                            </>
                                                        )}
                                                    </TransformWrapper>
                                                </Col>

                                                {/* Last Image */}
                                                <Col xl={6} md={6} sm={12} lg={6}>
                                                    <TransformWrapper defaultScale={1} defaultPositionX={200}
                                                                      defaultPositionY={100}>
                                                        {({zoomIn, zoomOut, resetTransform}) => (
                                                            <>
                                                                <div className="tools"
                                                                     style={{width: "100%", marginBottom: "4px"}}>
                                                                    <CustomFrameControls
                                                                        zoomIn={zoomIn}
                                                                        zoomOut={zoomOut}
                                                                        resetTransform={resetTransform}
                                                                        frameData={true}
                                                                    />
                                                                </div>
                                                                <div className="boundimage-full w-100"
                                                                     style={{margin: "0 auto"}}>
                                                                    <TransformComponent>
                                                                        <div className="mt-5 mb-5">
                                                                            <CardMedia style={{cursor: "pointer"}}
                                                                                       alt="Image Here 2">
                                                                                <Boundingbox
                                                                                    className="row m-auto col-12 p-0 text-center"
                                                                                    image={
                                                                                        tableData[currentFrameIndex]?.image_list[
                                                                                        tableData[currentFrameIndex]?.image_list.length - 1
                                                                                            ]?.imageUrl ||
                                                                                        tableData[currentFrameIndex]?.image_list[
                                                                                        tableData[currentFrameIndex]?.image_list.length - 1
                                                                                            ]
                                                                                    }
                                                                                    options={{
                                                                                        colors: {
                                                                                            normal: "red",
                                                                                            selected: "red",
                                                                                            unselected: "red"
                                                                                        },
                                                                                        style: {
                                                                                            maxWidth: "100%",
                                                                                            maxHeight: "100vh",
                                                                                            margin: "auto",
                                                                                            width: "100vw",
                                                                                            color: "red",
                                                                                            height: 510
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </CardMedia>
                                                                        </div>
                                                                    </TransformComponent>
                                                                </div>
                                                            </>
                                                        )}
                                                    </TransformWrapper>
                                                </Col>
                                            </Row>
                                        ) : null}
                                    </>
                                )}
                            </>}

                    </>
                }
                footerCustom={true}
                footerContent={<Row className="w-100">
                    <Col xs={6}>
                        {this.state.activeTab === "images" &&
                            tableData?.length > 0 &&
                            typeof currentFrameIndex === "number" && (
                                <span>
                Frame {currentFrameIndex + 1} of {tableData.length}
              </span>
                            )}
                    </Col>
                    <Col xs={6} className="text-right">
                        <CustomizedButtons
                            title={"Cancel"}
                            submit={this.handleCloseModal}
                            color={"secondary"}
                            className="ml-2"
                        />
                    </Col>
                </Row>}
            />
        );

    }
}

export default withStyles(styles)(DashboardTable);
