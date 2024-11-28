import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

interface Category {
  title: string;
  options: string[];
}

interface Step2Props {
  selectedOptions: string[]; // 추가된 props
  price: number;
  updatePrice: (newPrice: number) => void; // 추가된 props
}

const Step2: React.FC<Step2Props> = ({ selectedOptions, price, updatePrice }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(event.target.value)) {
      updatePrice(Number(event.target.value)); // 부모 상태 업데이트
    }
  };
  // console.log(selectedOptions);
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
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          판매 금액 입력
        </Typography>
      </Box>
      <Box sx={{ marginTop: "4rem" }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={price.toString()}
          onChange={handleChange}
          sx={{
            width: "30rem",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  width: "5rem",
                  m: 1,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "30px",
                }}
              >
                만원
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
