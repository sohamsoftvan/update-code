import React, {Component, Fragment} from 'react';
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";

class ViolationReportEmployee extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:props.isOpen,
            data:props.data,
            userId : props.userId,
            key : props.key1,
            camera_name : props.cn
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            show:nextProps.isOpen,
            data:nextProps.data,
            userId : nextProps.userId,
            key : nextProps.key1 - 1,
            camera_name : nextProps.cn
        })

    }

    render() {
        const {data,show,key,camera_name} =this.state;
        return (
            <Fragment>
                <CommonModal
                    size="lg"
                    show={show}
                    handleClose={this.props.onHide}
                    title="Violation"
                    content={
                        <>
                        <div className="row col-12 view-title">
                            <span className="w-100 font-weight-bold">Violation Reports</span>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Camera Name</b></span></div>
                            <div className="col col-md-9">{camera_name}</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Employee Name</b></span></div>
                            <div className="col col-md-9">{data[key]?.external_image_id}</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Violation Time</b></span></div>
                            <div className="col col-md-9">{data[key]?.violation_time}</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Violation Type</b></span></div>
                            <div className="col col-md-9">{data[key]?.violation_type}</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Face Image</b></span></div>
                            <div className="col col-md-9"><img alt="" className="w-50" src={data[key]?.face_image}/></div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-3"><span><b>Base Image</b></span></div>
                            <div className="col col-md-9"><img alt="" className="w-100" src={data[key]?.base_image}/></div>
                        </div>
                        </>
                    }
                    applyButton={false}
                />

            </Fragment>
        );
    }
}

export default ViolationReportEmployee;
