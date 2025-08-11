import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CustomizedButtonGroup from "../../../utils/SuperAdmin/CustomizedButtonGroup";

class TopspinPersonDashboard extends Component {
    constructor(props) {
        super(props);

        // Initialize with empty data
        this.state = {
            chartType: "column", // Default chart type
            chartData: {
                categories: [],
                series: [],
            },
            options: this.getChartOptions({ categories: [], series: [] }, "column"),
        };
    }

    // Process the chart data
    processChartData = (data) => {
        const categories = data.map((item) => item._id);
        const series = [
            {
                name: "In Count",
                data: data.map((item) => item.in_count),
                color: "#147b82",  // Apply color to series
            },
        ];
        return { categories, series };
    };

    // Generate chart options
    getChartOptions = (data, chartType) => {
        return {
            chart: {
                type: chartType,
            },
            title: {
                text: "",
            },
            xAxis: {
                categories: data.categories || [],
                title: {
                    text: "",
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Count",
                },
            },
            series: data.series || [],
            credits: {
                enabled: false,
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                [chartType]: {
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
        };
    };

    // Handle chart type change
    handleChartTypeChange = (type) => {
        this.setState({
            chartType: type,
            options: this.getChartOptions(this.state.chartData, type),
        });
    };

    // Handle updates to props
    componentDidUpdate(prevProps) {
        if (this.props.topspinHighchartData !== prevProps.topspinHighchartData) {
            const chartData = this.processChartData(this.props.topspinHighchartData);
            this.setState({
                chartData,
                options: this.getChartOptions(chartData, this.state.chartType),
            });
        }

        if (this.chartComponent) {
            this.chartComponent.chart.reflow();
        }
    }

    render() {
        const chartStyle = {
            height: "400px",
            width: "100%",
        };

        return (
            <>
                <div id={'chart-historgram'} className="card card-fixed-height">
                    <div className="card-header d-flex justify-content-between">
                        <div className={"chart-title"}>
                            {'Person Analysis'}
                        </div>
                        {this.props.showGraph !== false && (
                            <CustomizedButtonGroup
                                options={['column', 'bar', 'line']}
                                selected={this.state.chartType}
                                onChange={this.handleChartTypeChange}
                            />
                        )}
                    </div>
                    <div className="card-body">
                        {this.props.showGraph && (
                            <div style={chartStyle}>
                                <HighchartsReact
                                    ref={(chart) => {
                                        this.chartComponent = chart;
                                    }}
                                    highcharts={Highcharts}
                                    options={this.state.options}
                                />
                            </div>
                        )}
                        {this.props.showGraph === false && (
                            <div className={'h-100 d-flex align-items-center justify-content-center'} style={{textAlign: "center"}}>
                                <h3 className={"mt-5"}>{this.props.graphMessage}</h3>
                            </div>
                        )}

                    </div>
                </div>

            </>
        );
    }
}

export default TopspinPersonDashboard;

