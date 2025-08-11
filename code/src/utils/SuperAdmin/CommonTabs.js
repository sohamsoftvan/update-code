import React, {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import FormTitle from "./FormTitle";

export function CommonTabs({tabConfig}) {


    const [activeKey, setActiveKey] = useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`
        };
    }

    const handleChangeCase = (event, newValue) => {
        setActiveKey(newValue);
    };

    return (
        <>
                    <Tabs
                        variant="scrollable"
                        value={activeKey}
                        onChange={handleChangeCase}
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        {tabConfig.map((tab, idx) => (
                            <Tab
                                key={tab.label}
                                sx={{fontSize: 12}}
                                iconPosition="start"
                                label={tab.label}
                                style={{minHeight: "50px"}}
                                {...a11yProps(idx)}
                            />
                        ))}
                    </Tabs>

                    {tabConfig.map((tab, idx) => (
                        <CustomTabPanel value={activeKey} index={idx} key={tab.label}>
                            {tab.content}
                        </CustomTabPanel>
                    ))}
        </>
    );
}


function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}}>
                    <FormTitle title={children}/>
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
