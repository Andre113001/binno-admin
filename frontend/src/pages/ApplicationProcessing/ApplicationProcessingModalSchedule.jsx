import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Button from "../../components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1318px",
    height: '650px',
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    borderRadius: 5,
    padding: "94px 150px 77px 149px",
    overflowY: 'auto'
};

function ApplicationProcessingModalSchedule(props) {
    const { open, handleClose, content, additions } = props;

    return (
        <div>
            <Modal
                className="relative"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="absolute left-5 right-50 top-5 cursor-pointer">
                    <ArrowBackIcon
                        onClick={handleClose}
                        // className="absolute left-5 right-50 top-5 cursor-pointer"
                    />
                    Back
                    </div>
                    {props.children}
                </Box>
            </Modal>
        </div>
    );
}

export default ApplicationProcessingModalSchedule;
