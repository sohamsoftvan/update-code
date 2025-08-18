import React, { useEffect, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Card, CardBody } from "../../../../_metronic/_partials/controls";
import DeploymentJobs from "./components/DeploymentJobs";
import DeploymentRTSPJobs from "./components/DeploymentRTSPJobs";
import { useLocation, useNavigate } from "react-router-dom";

export default function DeploymentDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = useMemo(() => {
    if (location.pathname.includes("/deploymentDetails/deploymentRTSPJobsPage")) {
      return "deploymentRTSPJobs";
    }
    return "deploymentJobs";
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/deploymentDetails") {
      navigate("/deploymentDetails/deploymentJobsPage", { replace: true });
    }
  }, [location.pathname, navigate]);

  const setKey = (key) => {
    navigate(`/deploymentDetails/${key}Page`);
  };

  const handleTabChange = (key) => {
    setKey(key);
  };

  return (
    <Card className="example example-compact">
      <CardBody>
        <Tabs
          id="deployment-details-tabs"
          activeKey={activeKey}
          onSelect={handleTabChange}
          style={{ fontSize: "1.275rem", fontWeight: "500" }}
        >
          <Tab eventKey="deploymentJobs" title="Deployment Jobs">
            <DeploymentJobs setKey={setKey} />
          </Tab>
          <Tab eventKey="deploymentRTSPJobs" title="Deployment RTSP Jobs">
            <DeploymentRTSPJobs setKey={setKey} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
