import * as React from "react";
import FormTitle from "./FormTitle";
import {Box, Drawer, ListItem, ListItemText} from "@mui/material";
import {HelpOutline} from "@mui/icons-material";

export default function CustomDrawer({info}) {
    const [state, setState] = React.useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = anchor => (
            <Box
                style={{width: anchor === "top" || anchor === "bottom" ? "auto" : "100%"}}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <ListItem
                    style={{
                        backgroundColor: "inherit", // Use the same background color as the body
                        py: 1
                    }}
                >
                    <ListItemText
                        secondary={
                        <FormTitle title={info?.display_name}   variant="h5"  sx={{
                            fontWeight: "regular"
                        }}/>
                        }
                        secondaryTypographyProps={{component: "div"}}
                    />
                </ListItem>
                <ListItem
                    style={{
                        backgroundColor: "inherit", // Use the same background color as the body
                        py: 1
                    }}
                >
                    <ListItemText
                        secondary={
                            <FormTitle
                                variant="h6"
                                sx={{
                                    color: "primary",
                                    fontWeight: "regular"
                                }}
                                title={info?.description}
                            />
                        }
                        secondaryTypographyProps={{component: "div"}}
                    />
                </ListItem>
            </Box>
    );

    return (
        <>
            {["right"].map(anchor => (
                <React.Fragment key={anchor}>
                    <div className="d-flex justify-content-center align-items-center ml-2 cursor-pointer"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <HelpOutline/>
                    </div>
                    <Drawer

                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        PaperProps={{
                            style: { width: "25%" },
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    );
}
