import React, { useEffect, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Card, CardBody } from "../../../../_metronic/_partials/controls";
import DeployedJobs from "./components/DeployedJobs";
import DeployedRTSPJobs from "./components/DeployedRTSPJobs";
import { useLocation, useNavigate } from "react-router-dom";

export default function DeployedDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = useMemo(() => {
    if (location.pathname.includes("/deployedDetails/deployedRTSPJobsPage")) {
      return "deployedRTSPJobs";
    }
    return "deployedJobs";
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/deployedDetails") {
      navigate("/deployedDetails/deployedJobsPage", { replace: true });
    }
  }, [location.pathname, navigate]);

  const setKey = (key) => {
    navigate(`/deployedDetails/${key}Page`);
  };

  const handleTabChange = (key) => {
    setKey(key);
  };

  return (
    <Card className="example example-compact">
      <CardBody>
        <Tabs
          id="deployed-details-tabs"
          activeKey={activeKey}
          onSelect={handleTabChange}
          style={{ fontSize: "1.275rem", fontWeight: "500" }}
        >
          <Tab eventKey="deployedJobs" title="Deployed Jobs">
            <DeployedJobs setKey={setKey} />
          </Tab>
          <Tab eventKey="deployedRTSPJobs" title="Deployed RTSP Jobs">
            <DeployedRTSPJobs setKey={setKey} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
