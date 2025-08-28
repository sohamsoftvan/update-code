import React, { useEffect } from "react";
import {Col, Form, Row} from "react-bootstrap";
import { FormControl ,InputLabel ,NativeSelect,Button ,TextField} from "@mui/material";
import { BootstrapInput } from "../../../../../../utils/BootstrapInput";
import { getAllDeploymentType } from "../../_redux/DeployNowTab/DeployNowApi";
import { warningToast } from "../../../../../../utils/ToastMessage";
import SweetAlert from "react-bootstrap-sweetalert";
import BlockUi from "react-block-ui";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

const classes = {
  dropdown: {
    width: "100%",
    marginBottom: "2rem"
  },
  dropdownHeader: {
    fontSize: 20
  },
  container: {
    display: "inline-flex",
    flexWrap: "wrap",
    width: "50%"
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 200
  }
};

export function DeployNowTab({
  modelId,
                               showSub,
  setSub,
  job,
  showCamera,
  setCamera,
  setDeployedJob
}) {
  let [hasCamera, setHasCamera] = React.useState(true);

  const [state, setState] = React.useState({
    deploymentType: "Select Deployment Type",
    imageSize: 640,
    confThresh: 0.5,
    iouThresh: 0.3,
    activeCT: "24x7",
    start_time: "07:30",
    end_time: "07:30"
  });
  const [alertData, setAlertData] = React.useState({
    loading: false,
    title: "",
    success: false,
    show: false,
    confirmText: "Okay",
    showConfirm: true,
    cancelText: "Cancel",
    showCancel: true,
    info: false
  });
  const [loaderState, setLoaderState] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoaderState(true);
        const { data, isSuccess } = await getAllDeploymentType();
        if (isSuccess) {
          setLoaderState(false);
          //setDeploymentTypeOptions(data);
          setState({
            ...state,
            deploymentType: data[1].id + "-" + data[1].deployment_type_name
          });
        } else {
          setLoaderState(false);
          warningToast("Error getting deployment types");
        }
      } catch (error) {
        setLoaderState(false);
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    const value = e.target.value;
    setHasCamera(!value.toLowerCase().includes("without"));
    setState({ ...state, [e.target.name]: value });
  };

  const startDeployment = async () => {
    setAlertData({
      loading: true,
      title: "Deploying Model",
      success: true,
      show: true
    });
    try {
      // eslint-disable-next-line
      let res;
      let jobData = {
        ...state,
        deploymentType: state.deploymentType.split("-")[0],
        modelId
      };
      if (hasCamera) {
        if (jobData.activeCT === "24x7") {
          jobData = {
            deploymentType: jobData.deploymentType,
            imageSize: jobData.imageSize,
            confThresh: jobData.confThresh,
            iouThresh: jobData.iouThresh,
            activeCT: jobData.activeCT,
            modelId: jobData.modelId,
            start_time: null,
            end_time: null
          };
        }
      } else {
      }

      setAlertData({
        loading: false,
        title: "Model Deployed Successfully",
        success: true,
        show: false
      });
      setDeployedJob(jobData);
      if (hasCamera) {
        setCamera(true);
        setSub(false);
      }
    } catch (e) {
      setAlertData({
        loading: false,
        title: "Something went wrong",
        success: false,
        show: true
      });
    }
  };

  const showAlert = () => {
    setAlertData({
      title: "Are you sure ?",
      show: true,
      success: false,
      confirmText: "Yes",
      loading: false,
      cancelText: "Cancel",
      showCancel: true,
      danger: false,
      info: true
    });
  };

  return (
    <>
      <Row>
        <Col className="offset-2 offset-lg-3 offset-md-3  col-8 col-md-6  col-lg-6">
          <CommonModal
              size="lg"
              show={showSub}
              handleClose={() => setSub(false)}
              arialabelledby="example-modal-sizes-title-lg"
              title={"Select Time"}
              closeButtonFlag={true}
              applyButton={false}
              content={
                <>
                <BlockUi tag="div" blocking={loaderState} color="#147b82">
                  <Form>
                    <Row>
                      <Col xl={6} xs={12} md={12} lg={12} sm={12}>
                        <FormControl className="w-100">
                          <InputLabel
                              htmlFor="age-customized-native-simple"
                              className={classes.dropdownHeader}
                          >
                            Surveillance Time
                          </InputLabel>
                          <NativeSelect
                              className="pt-2"
                              value={state.activeCT}
                              name="activeCT"
                              onChange={handleChange}
                              input={<BootstrapInput name="activeCT" />}
                          >
                            <option value={"24x7"}>24 x 7</option>
                            <option value={"custom"}>Custom</option>
                          </NativeSelect>
                        </FormControl>
                      </Col>
                      <Col
                          xl={5}
                          xs={12}
                          md={12}
                          lg={12}
                          sm={12}
                          className="mt-8"
                      >
                        {state.activeCT !== "24x7" && (
                            <>
                              <form className={classes.container} noValidate>
                                <TextField
                                    id="time"
                                    label="Start Time"
                                    type="time"
                                    name={"start_time"}
                                    defaultValue="07:30"
                                    className={classes.textField}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    inputProps={{
                                      step: 300 // 5 min
                                    }}
                                />
                              </form>

                              <form className={classes.container} noValidate>
                                <TextField
                                    id="time"
                                    label="End Time"
                                    type="time"
                                    name={"end_time"}
                                    defaultValue="07:30"
                                    className={classes.textField}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    inputProps={{
                                      step: 300 // 5 min
                                    }}
                                />
                              </form>
                            </>
                        )}
                      </Col>
                      <Col
                          xl={1}
                          xs={12}
                          md={12}
                          lg={12}
                          sm={12}
                          className="mt-14"
                      >
                        {state.activeCT !== "24x7" && (
                            <>
                          <span>
                            <b>IST</b>
                          </span>
                            </>
                        )}
                      </Col>
                    </Row>
                    <Row className="mt-5 ml-1">
                      <Button
                          variant="contained"
                          color="primary"
                          className="btn btn-primary "
                          onClick={showAlert}
                      >
                        {hasCamera && "Next"}
                      </Button>
                    </Row>
                  </Form>
                </BlockUi>

                </>
              }

          />
        </Col>
      </Row>
      <SweetAlert
        info={alertData.loading || alertData.info}
        danger={alertData.danger} //|| (!alertData.success && !alertData.loading)
        success={alertData.success && !alertData.loading}
        showConfirm={!alertData.loading}
        showCancel={alertData.showCancel}
        cancelBtnText={alertData.cancelText}
        closeOnClickOutside={!alertData.loading}
        confirmBtnText={alertData.confirmText}
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="light"
        cancelBtnStyle={{ color: "black" }}
        title={alertData.title}
        show={alertData.show}
        focusCancelBtn
        onConfirm={() => {
          if (alertData.title.startsWith("Are you sure ?")) {
            setAlertData({
              ...alertData,
              loading: true,
              danger: false,
              title: "Deploying model",
              success: false,
              info: true
            });
            startDeployment();
          } else {
            setAlertData({ ...alertData, show: false });
          }
        }}
        onCancel={() => {
          setAlertData({ ...alertData, show: false });
        }}
        dependencies={[alertData.loading]}
      >
        {alertData.loading ? (
          <div className="overlay-layer bg-transparent">
            <div className="spinner-border text-info text-center" />
          </div>
        ) : (
          <></>
        )}
      </SweetAlert>
    </>
  );
}
