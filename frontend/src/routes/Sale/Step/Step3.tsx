import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

interface Category {
  title: string;
  options: string[];
}

interface Step4Props {
  categories: Category[];
}

const Step3: React.FC<Step4Props> = ({ categories }) => {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");

  // Handler to update state when input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "30rem",
        marginRight: "25rem",
        marginLeft: "25rem",
        paddingLeft: 4,
        borderRadius: "16px",
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.1)", // Horizontal, Vertical, Blur, Spread, and Color
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          차량 설명 입력
        </Typography>
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
          차량에 대한 설명을 입력해주세요.
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          marginRight: "2rem",
          boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          rows={14}
          fullWidth
          multiline
          value={inputValue} 
          onChange={handleChange}
          placeholder="차량 설명을 입력하세요."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0px"
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Step3;
