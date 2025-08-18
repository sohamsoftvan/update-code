import React from "react";
import PropTypes from "prop-types";
import { useSubheader } from "../../../../../_metronic/layout";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { Box } from "@mui/material";
import { Person } from "@mui/icons-material";
import FormTitle from "../../../../../utils/SuperAdmin/FormTitle";
import { Card, CardBody } from "../../../../../_metronic/_partials/controls";
import StorageFramePage from "./StorageFrame/StorageFramePage";

const tabs = [
  { label: "storage-frame", icon: <Person />, component: <><StorageFramePage/></> },
  { label: "ai-frame", icon: <Person />, component: <>AI Frame Content</> }
];

export default function FrameUploaderPage() {
  const subheader = useSubheader();
  subheader.setTitle("Frame Uploader");

  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const tabKeyFromURL = pathParts[pathParts.length - 1];
  const currentTab = tabs.findIndex(tab => tab.label === tabKeyFromURL) !== -1
      ? tabs.findIndex(tab => tab.label === tabKeyFromURL)
      : 0;

  const handleTabChange = (key) => {
    navigate(`/company/frame-uploader/${tabs[key].label}`);
  };

  return (
      <Card className="example example-compact">
        <CardBody>
          <Tabs
              id="frame-uploader-tabs"
              activeKey={currentTab}
              onSelect={handleTabChange}
          >
            {tabs.map((tab, index) => (
                <Tab eventKey={index} title={tab.label} key={index}>
                  <CustomTabPanel value={currentTab} index={index}>
                    {tab.component}
                  </CustomTabPanel>
                </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 2 }}>
              <FormTitle title={children} />
            </Box>
        )}
      </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
