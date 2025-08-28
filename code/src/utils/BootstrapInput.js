import React from "react";
import { InputBase } from "@mui/material";

export const BootstrapInput = React.forwardRef(function BootstrapInput(props, ref) {
  return (
    <InputBase
      ref={ref}
      {...props}
      sx={(theme) => ({
        marginTop: 0,
        "& label + &": {
          marginTop: 24,
        },
        "& .MuiInputBase-input": {
          borderRadius: 2,
          position: "relative",
          backgroundColor: theme?.palette?.background?.paper || "#fff",
          border: "1px solid #ced4da",
          fontSize: 16,
          padding: "10px 26px 10px 12px",
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
          },
        },
      })}
    />
  );
});
