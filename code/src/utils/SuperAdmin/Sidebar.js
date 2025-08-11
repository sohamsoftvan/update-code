import React from 'react';
import FormTitle from "./FormTitle";
import Addstep from "./Addstep";
import {Box, Divider, List, ListItem, ListItemText} from "@mui/material";

const Sidebar = ({activeStep, steps, lastSecondWord ,user}) => {
    return (<Box style={{
            border: "1px solid", borderColor: "grey", backgroundColor: "white", borderRadius: 1,

        }}>
            <List className={"py-2"} style={{width: '250px'}}>
                {Addstep(lastSecondWord ,user).map((text, index) => (<React.Fragment key={text}>
                        <ListItem className={"py-1"}
                            style={{
                                backgroundColor: 'inherit', // Use the same background color as the body
                            }}
                        >
                            <ListItemText
                                primary={<FormTitle 
                                    variant={"caption"}
                                    color={activeStep === index ? 'primary' : 'textSecondary'}
                                    sx={{ fontWeight: 'regular' }}
                                    title={`Step ${index + 1}`}
                                    className={"d-block"}
                                />}
                                secondary={<FormTitle 
                                    variant={"body2"}
                                    color={activeStep === index ? 'primary' : 'textPrimary'}
                                    sx={{ fontWeight: activeStep === index ? 'bold' : 'regular' }}
                                    title={text}
                                />}
                                secondaryTypographyProps={{component: 'div'}}
                            />
                        </ListItem>
                        {index < steps.length - 1 && <Divider />}
                    </React.Fragment>))}
            </List>
        </Box>);
};

export default Sidebar;
