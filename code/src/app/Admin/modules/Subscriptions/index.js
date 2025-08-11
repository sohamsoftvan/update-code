import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { Button, Typography, Box, Alert, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ADMIN_URL } from "../../../../enums/constant";

const SubscriptionsIndex = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNavigateToDeployedJobs = () => {
    navigate(`${ADMIN_URL}/subscriptions/deployedJobsPage`);
  };

  const handleNavigateToDeploymentJobs = () => {
    navigate(`${ADMIN_URL}/subscriptions/deploymentJobsPage`);
  };

  const handleNavigateToRTSPJobs = () => {
    navigate(`${ADMIN_URL}/subscriptions/rtspJobsPage`);
  };

  const handleNavigateToDeployedRTSPJobs = () => {
    navigate(`${ADMIN_URL}/subscriptions/deployedRTSPJobsPage`);
  };

  return (
    <div className="subscriptions-index-page">
      <Card>
        <CardHeader>
          <CardTitle>
            <Typography variant="h5" component="h2">
              Subscription Management
            </Typography>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap={2}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Overview" />
              <Tab label="Deployed Jobs" />
              <Tab label="Deployment Jobs" />
              <Tab label="RTSP Jobs" />
              <Tab label="Deployed RTSP Jobs" />
            </Tabs>

            <Box mt={2}>
              {activeTab === 0 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" color="primary">
                    Subscription Overview
                  </Typography>
                  <Typography variant="body2">
                    Manage your AI model subscriptions and deployments
                  </Typography>
                  
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNavigateToDeployedJobs}
                    >
                      Deployed Jobs
                    </Button>
                    
                    <Button
                      variant="outlined"
                      onClick={handleNavigateToDeploymentJobs}
                    >
                      Deployment Jobs
                    </Button>
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" color="primary">
                    Deployed Jobs
                  </Typography>
                  <Typography variant="body2">
                    View and manage your currently deployed AI model jobs
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToDeployedJobs}
                  >
                    View Deployed Jobs
                  </Button>
                </Box>
              )}

              {activeTab === 2 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" color="primary">
                    Deployment Jobs
                  </Typography>
                  <Typography variant="body2">
                    Manage the deployment process for your AI models
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToDeploymentJobs}
                  >
                    View Deployment Jobs
                  </Button>
                </Box>
              )}

              {activeTab === 3 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" color="primary">
                    RTSP Jobs
                  </Typography>
                  <Typography variant="body2">
                    Manage Real-Time Streaming Protocol jobs for video processing
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToRTSPJobs}
                  >
                    View RTSP Jobs
                  </Button>
                </Box>
              )}

              {activeTab === 4 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" color="primary">
                    Deployed RTSP Jobs
                  </Typography>
                  <Typography variant="body2">
                    View and manage your currently deployed RTSP jobs
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToDeployedRTSPJobs}
                  >
                    View Deployed RTSP Jobs
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
};

export default SubscriptionsIndex;
