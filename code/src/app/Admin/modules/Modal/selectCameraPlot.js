import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";
import RegionPlot1 from "./regionPlot1";
import { loadImageFromRtspURL } from "./_redux";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import CommonReactstrapModal from "../../../../utils/SuperAdmin/CommonReactstrapModal";
// eslint-disable-next-line

export default class SelectCameraPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      options: [],
      selectedModal: "",
      imagePath: "",
      cameraParam: ""
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let totalCamera = nextProps.totalCameras;
    let options = [];
    for (let y = 0; y < totalCamera?.length; y++) {
      let data = totalCamera[y];

      options.push({
        value: data.id + "-" + data.rtsp_url + "-" + data.roi_type, // here it will be image url
        label: data.camera_name
      });
    }
    this.setState({
      selectedModal: "",
      options: options,
      modalOpen: nextProps.openModal
    });
  }

  handleModalChange = selectedModal => {
    this.setState({
      selectedModal,
      showRoITab: false
    });
    setTimeout(() => {
      let selectedOption = selectedModal.value.split("-");
      let param = {
        id: selectedOption[0],
        camera_name: selectedModal.label,
        rtsp_url: selectedOption[1]
      };
      let allData = {
        id: selectedOption[0],
        camera_name: selectedModal.label,
        rtsp_url: selectedOption[1],
        roi_type: selectedOption[2]
      };

      this.setState({
        cameraParam: allData
        // showRoITab: true
      });
      loadImageFromRtspURL(param)
        .then(response => {
          this.setState({
            imagePath: response.data.file,
            showRoITab: true
          });
        })
        .catch(error => {
          if (error.detail) {
           console.log("error.detail",error.detail)
          }
        });
    }, 500);
  };

  render() {
    return (
      <Fragment>
        <CommonReactstrapModal
            size="lg"
            show={this.state.modalOpen}
            handleClose={() => this.props.setOpenROIModal(false)}
            arialabelledby="example-modal-sizes-title-lg"
            title={"Image plot"}
            closeButtonFlag={true}
            applyButton={false}
            backdrop={"static"}
            content={
              <>
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl={12}>
                        <div className="overlay overlay-block cursor-default p-0">
                          <ReactSelectDropDownCommon
                              placeholder="Select Camera"
                              value={this.state.selectedModal}
                              onChange={this.handleModalChange}
                              options={this.state.options}
                              isSearchable={true}
                              className="align-left"
                          />
                          <hr />
                          {this.state.selectedModal && this.state.showRoITab && (
                              <>
                                <RegionPlot1
                                    setOpenROIModal={this.props.setOpenROIModal}
                                    cameraParam={this.state.cameraParam}
                                    imagePath={this.state.imagePath}
                                />
                              </>
                          )}
                          {this.state.selectedModal && !this.state.showRoITab && (
                              <>
                                <div className="overlay-layer bg-transparent mt-3">
                                  <div className="spinner spinner-lg spinner-success" />
                                </div>
                                <div className="w-100 text-center">
                                  <b
                                      className="d-block"
                                      style={{ paddingTop: "30px", marginLeft: "10px" }}
                                  >
                                    Loading image from rtsp stream
                                  </b>
                                </div>
                              </>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

              </>
            }
        />
      </Fragment>
    );
  }
}
