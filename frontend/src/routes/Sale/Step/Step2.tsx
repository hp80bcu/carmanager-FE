import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { categories } from "../categories";

interface Category {
  title: string;
  options: string[];
}

interface Step2Props {
  categories: Category[];
}

const Step2: React.FC<Step2Props> = ({ categories }) => {
  const [distance, setDistance] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력하도록 제한
    if (/^\d+$/.test(event.target.value)) {
      setDistance(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "18rem",
        marginRight: "25rem",
        marginLeft: "25rem",
        padding: 2,
        borderRadius: "16px",
        // border: "1px solid #D9D9D9",
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.1)", // Horizontal, Vertical, Blur, Spread, and Color
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          주행거리 입력
        </Typography>
      </Box>
      <Box sx={{ marginTop: "4rem" }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={distance}
          onChange={handleChange}
          sx={{
            width: "30rem",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                Km
              </Box>
            ),
          }}
        />
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "12px" }}>
          현재 차량의 주행 거리를 입력해 주세요.
        </p>
      </Box>
    </Box>
  );
};

export default Step2;
