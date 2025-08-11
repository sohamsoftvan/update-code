import React, {Component} from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row } from 'react-bootstrap';
import { Card } from "reactstrap";
import Boundingbox from "image-bounding-box-custom";
import moment from "moment";
import {Chip ,CardMedia ,CardContent} from "@mui/material";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartType: props?.chartTypes?.histogramChartType || 'stacked_column', // Default chart type is column
            selectedDate: null, // Track the selected date for drilldown
            showModal: false, // Track the modal visibility,
            isDayChart: false, // Track the modal visibility,
            options: {
                chart: {
                    type: props?.chartTypes?.histogramChartType || 'column', // Set the chart type based on the selected option
                    events: {
                        drilldown: this.addDrilldownSeries.bind(this),
                    },
                },
                title: {
                    text: ``,
                },
                xAxis: {
                    type: "category",
                    labels: {
                        formatter: function () {
                            return (
                                '<span style="text-decoration: none; color: #333333; cursor: pointer; font-size: 1em; font-family: Helvetica, Arial, sans-serif; font-weight: normal;">' +
                                this.value +
                                "</span>"
                            );
                        },
                    },
                    dateTimeLabelFormats: {
                        day: "%e/%b" // Format: day/month abbreviation (e.g., 5/Apr)
                    }
                },
                credits: {
                    enabled: false,
                },
                plotOptions: {
                    // series: {
                    //     borderWidth: 0,
                    //     dataLabels: {enabled: true}
                    // }
                    column: {
                        stacking: "normal", // Enable stacking for default chart
                        dataLabels: {
                            enabled: true,
                        },
                    },
                },
                series: this.props.seriesData,

                drilldown: {
                    // series: this.props.drilldownData,
                    activeAxisLabelStyle: {
                        textDecoration: "none"
                    }
                }
            },
            key: Date.now() // Unique key to force re-render
        };
        this.handleChangeChartType = this.handleChangeChartType.bind(this);
        this.handleChangeChartData = this.handleChangeChartData.bind(this);
    }


    addDrilldownSeries(e) {
        const { chartObj } = this.state;
            this.props.onDrilldown(e).then((value) => {
                if (chartObj) {
                    chartObj.showLoading();
                    if (value && value.length > 0) {
                        value.forEach((data) => {
                            chartObj.addSeriesAsDrilldown(e.point, data);
                        });
                        chartObj.redraw();
                    }
                    chartObj.hideLoading();
                }
            });
    }



    handleChangeChartData(event) {
        this.setState({
            processData: event.target.value
        });
    }

    handleChangeChartType(event) {
        let {value} = event.target;
        let plotOptions = {};
        if (value === "stacked_column") {
            value = "column";
            plotOptions = {
                column: {
                    stacking: "normal",
                    dataLabels: {
                        enabled: true
                    }
                }
            };
        } else {
            plotOptions = {
                column: {
                    stacking: "",
                    dataLabels: {
                        enabled: true
                    }
                }
            };
        }

        this.setState({
            chartType: event.target.value,
            key: Date.now() // Update the key to force re-render
        }, () => {
            this.setState({
                options: {
                    ...this.state.options,
                    chart: {
                        type: value,
                        events: {
                            drilldown: this.addDrilldownSeries.bind(this)
                        }
                    },
                    plotOptions,
                    series: this.props.seriesData
                }
            });
        });
    }

    componentDidUpdate(prevProps) {
        // Check if seriesData has changed
        if (prevProps.seriesData !== this.props.seriesData) {
            // Update the options.series with the new seriesData
            this.setState(prevState => ({
                options: {
                    ...prevState.options,
                    series: this.props.seriesData
                }
            }));
        }
        if (prevProps.showModal !== this.props.showModal) {
            this.setState(prevState => ({
                showModal: this.props.showModal
            }));
        }
    }

    chartCallback = e => {
        this.setState({
            chartObj: e
        });
    };


    render() {
        return (
            <>

                <div id={'chart-historgram'} className="card">
                    <div className="card-header d-flex justify-content-between">
                        <div className={"chart-title"}>
                            {this.props.title}
                        </div>
                        <div className="chart-controls d-flex align-items-center">
                            <div>
                                <select
                                    value={this.state.chartType}
                                    onChange={this.handleChangeChartType}
                                    disabled={this?.props?.seriesData?.length === 0}
                                >
                                    <option value="column">Column Chart</option>
                                    <option value="stacked_column">Stacked Chart</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        {this.props.histogramChartLoading ? (
                            <div className="d-flex justify-content-center align-items-center mt-5 h3"
                                 style={{minHeight: '386px'}}>
                                Loading....
                            </div>
                        ) : this.props.seriesData.length > 0 ? (
                            <HighchartsReact
                                key={this.state.key}
                                highcharts={Highcharts}
                                options={this.state.options}
                                callback={this.chartCallback}
                            />
                        ) : (
                            <h3>
                                <div className={"d-flex justify-content-center align-items-center mt-5 h3"}
                                     style={{minHeight: '386px'}}>
                                    <span>No data found</span>
                                </div>
                            </h3>
                        )}


                    </div>
                </div>

                <CommonModal
                    size="lg"
                    show={this.props.showModal}
                    handleClose={this.props.handleCloseModal}
                    arialabelledby="example-modal-sizes-title-lg"
                    style={{ maxHeight: "-webkit-fill-available" }}
                    dialogClassName={'result-modal'}
                    title={"My Result Details"}
                    animation={true}
                    backdrop={'static'}
                    scrollable={false}
                    closeButtonFlag={true}
                    applyButton={false}
                    content={
                        <>
                            <Row className="justify-content-center">
                                {this.props.modalData.map(item => {
                                    const matchedCamera = this.props.cameraList.find(camera => camera.id === Number(item.camera_id));

                                    return (
                                        <Card
                                            style={{
                                                height: "100%", margin: "25px", maxWidth: "416px"
                                            }}
                                        >
                                            <CardMedia
                                                style={{
                                                    height: "351px"
                                                }}
                                                title={"Vioaltion"}
                                                alt={"Image Here"}
                                            >
                                                <Boundingbox
                                                    className="row m-auto col-12 p-0 text-center"
                                                    image={item?.image_url}
                                                    boxes={item?.result?.detection.map((item) => ({
                                                        coord: [
                                                            item.location[0], // x1
                                                            item.location[1], // y1
                                                            item.location[2] - item.location[0], // width
                                                            item.location[3] - item.location[1]  // height
                                                        ],
                                                        // label: item.label
                                                    })) || []}
                                                    options={{
                                                        colors: {
                                                            normal: "red", selected: "red", unselected: "red"
                                                        }, style: {
                                                            maxWidth: "100%",
                                                            maxHeight: "100vh",
                                                            margin: "auto",
                                                            width: 520,
                                                            color: "red",
                                                            height: 354
                                                        }
                                                    }}
                                                />
                                            </CardMedia>
                                            <CardContent style={{minHeight: "100px"}}>
                                                <div
                                                    className={"d-flex mt-1 mb-1 justify-content-between align-content-start"}
                                                >

                                                    <div className={""}>
                                                        <b>
                                                            {moment
                                                                .utc(item?.created_date?.$date)
                                                                .local()
                                                                .format("MMMM DD YYYY, h:mm:ss a")}
                                                        </b>
                                                    </div>
                                                </div>
                                                <div>
                                                    <b>Camera Name: </b>
                                                    {matchedCamera && <span>{matchedCamera.camera_name}</span>}
                                                </div>
                                                <div
                                                    className={"d-flex mt-1 mb-1 justify-content-between align-content-start"}
                                                >
                              <span>
                              </span>
                                                </div>
                                                <div className={"mt-1 mb-1"}>
                                                    {Object.entries(item?.counts || {}).map(([label, count]) => (
                                                        <Chip
                                                            key={label}
                                                            label={`${label}: ${count}`} // Display label and count
                                                            style={{
                                                                borderRadius: "6px",
                                                                background: "#147b82",
                                                                color: "#fff",
                                                                fontWeight: "400",
                                                                fontSize: "16px",
                                                                // margin: "5px" // Add some spacing between chips
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )

                                })}
                            </Row>
                        </>
                    }
                />
            </>
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;
