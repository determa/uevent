import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Modal from "./Modal";

const SettingButton = ({ component, data }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {showModal && (
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    Component={component}
                    data={data}
                />
            )}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 1, borderRadius: 3 }}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            color="#000000cc"
                            // size="xl"
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "40px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem
                        onClick={() => {
                            setShowModal(true);
                            handleCloseUserMenu();
                        }}
                    >
                        Редактировать
                    </MenuItem>
                    {/* <MenuItem>Удалить</MenuItem> */}
                </Menu>
            </Box>
        </>
    );
};

export default SettingButton;
