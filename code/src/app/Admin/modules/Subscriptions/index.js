import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Card, CardBody } from "../../../../_metronic/_partials/controls";
import { useNavigate } from "react-router-dom";
import { useSubheader } from "../../../../_metronic/layout";
import DeployedJobs from "./components/DeployedJobs";
import DeploymentJobs from "./components/DeploymentJobs";
import { ADMIN_URL } from "../../../../enums/constant";

export function RequestedResults() {
  const [key, setKey] = React.useState("deployedJobs");
  const navigate = useNavigate();
  const subheader = useSubheader();
  subheader.setTitle("Subscription Details");

  useEffect(() => {
    setKey("deployedJobs");
    //  eslint-disable-next-line
  }, []);

  const setValue = (value) => {
    setKey(value);
    if (value === "deploymentJobs") {
      navigate("/admin/subscriptions/deploymentJobsPage");
    } else {
      navigate("/admin/subscriptions/deployedJobsPage");
    }
  };

  return (
      <Card className="example example-compact fixed-height-card">
        {/*<CardHeader title={"Deployment Details"}/>*/}
        <CardBody className={"custom-card-body"}>
          <Tabs
              id="controlled-tab-example"
              activeKey={key}
              defaultActiveKey="deployedJobs"
              onSelect={(e) => {
                setValue(e);
              }}
              style={{ fontSize: "1.275rem", fontWeight: "500" }}
          >
            <Tab eventKey="deployedJobs" title="Subscribed">
              <DeployedJobs setKey={setKey} />
            </Tab>
            <Tab eventKey="deploymentJobs" title="Requested">
              <DeploymentJobs setKey={setKey} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
  );
}
