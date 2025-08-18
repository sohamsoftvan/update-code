/* eslint-disable */
import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import objectPath from "object-path";
import {useHtmlClassService} from "../../../_core/MetronicLayout";
import {toAbsoluteUrl} from "../../../../_helpers";
import {Col, Row} from "react-bootstrap";
import {Avatar, Box, IconButton, Menu, Typography} from "@mui/material";

export function UserProfileDropdown() {
    const {user} = useSelector(
        ({auth}) => ({
            user: auth.user,
        }),
        shallowEqual
    );
    const uiService = useHtmlClassService();
    const regexImage = /\.(gif|jpe?g|tiff?|png|webp|bmp|ico|svg)$/i
    const layoutProps = useMemo(() => {
        return {
            light:
                objectPath.get(uiService.config, "extras.user.dropdown.style") !==
                "light",
        };
    }, [uiService]);
    const userRole = user?.roles?.length && user.roles[0]?.role

    // MUI Menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {userRole !== "superadmin" && userRole !== "resultmanager" ?
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: {xs: 1, sm: 1.5, md: 2},
                    height: '100%',
                    pr: {xs: 1, sm: 1.5, md: 2},
                    minHeight: '48px'
                }}>
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'user-profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                            color: 'inherit',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {backgroundColor: 'transparent'}
                        }}
                    >

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexDirection: 'row'
                        }}>
                            <Typography variant="body2" sx={{
                                fontSize: '14px',
                                color: 'inherit'
                            }}>
                                Hi,
                            </Typography>
                            <Typography variant="body2" sx={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: 'inherit'
                            }}>
                                {user?.company?.company_name}
                            </Typography>
                            <Avatar
                                sx={{
                                    width: 35,
                                    height: 35,
                                    bgcolor: '#147b82',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {user?.company?.company_name[0]}
                            </Avatar>
                        </Box>
                    </IconButton>

                    <Menu
                        id="user-profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={(e) => {
                            // Don't close if clicking on the Sign Out link
                            if (e.target.closest('a[href="/logout"]')) {
                                return;
                            }
                            handleClose();
                        }}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                width: 400,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        keepMounted={false}
                        disablePortal={false}
                    >
                        {layoutProps.light && (
                            <>
                                <Box sx={{p: 1, height: '100px'}}>
                                    <Row>
                                        <Col xl={4} xs={12} md={12} lg={12} sm={12}>
                                            <Box>
                                                <img
                                                    style={{
                                                        width: window.location.host === "demo.urhiro.com" ? '95px' : '95px',
                                                        height: window.location.host === "demo.urhiro.com" ? '50px' : '100px'
                                                    }}
                                                    alt="Logo"
                                                    src={userRole !== "superadmin" && userRole !== "resultmanager" && (regexImage).test(user?.company?.company_description) ?
                                                        user?.company?.company_description : window.location.host === "beta.tusker.ai" ? toAbsoluteUrl("/media/logos/logo-letter-1.png") :
                                                            window.location.host === "vision.newra.ai" ? toAbsoluteUrl("/media/logos/Newra_Logo_Blue.svg") : window.location.host === "demo.urhiro.com" ? toAbsoluteUrl("/media/logos/HiRO_logo_black.png") : toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                                                />
                                            </Box>
                                        </Col>
                                        <Col xl={6} xs={12} md={12} lg={12} sm={12}
                                             className={`${window.location.host === "demo.urhiro.com" ? "mt-2 ml-2" : "user-profile-name ml-2"}`}>
                                            <Box sx={{fontWeight: 'bold'}}>
                                                {userRole !== "superadmin" && userRole !== "resultmanager" && user.company.company_name}
                                            </Box>
                                            <Box className="email-wrap">
                                                {userRole !== "superadmin" && userRole !== "resultmanager" && user.user_email}
                                            </Box>
                                        </Col>
                                    </Row>
                                </Box>
                            </>
                        )}

                        <Box sx={{px: 2, py: 1.5, textAlign: 'right'}}>
                            <Link
                                to="/logout"
                                className="btn btn-light-primary font-weight-bold"
                            >
                                Sign Out
                            </Link>
                        </Box>
                    </Menu>
                </Box>
                :
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                }}>
                    <Link
                        to="/logout"
                        className="btn btn-light-primary font-weight-bold"
                        style={{textDecoration: 'none'}}
                    >
                        Sign Out
                    </Link>
                </Box>}
        </>
    );
}
