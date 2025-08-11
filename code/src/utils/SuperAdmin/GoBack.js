import React from 'react';
import FormTitle from "./FormTitle";
import {Box, IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const GoBack = ({ onBack }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 1, cursor: 'pointer' }} onClick={onBack}>
      <IconButton  aria-label="go back">
        <ArrowBack />
      </IconButton>
        <FormTitle variant={"button"}  sx={{ textTransform: 'none' }} title={"Go back"} />
    </Box>
  );
};

export default GoBack;
