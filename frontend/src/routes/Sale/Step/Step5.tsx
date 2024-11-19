import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { categories } from "../categories";

interface Category {
  title: string;
  options: string[];
}

interface Step5Props {
  categories: Category[];
}

interface ImageItem {
    src: string;
    alt: string;
  }

const Step4: React.FC<Step5Props> = ({ categories }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const [images, setImages] = useState<{
    내장: FileList | null;
    외장: FileList | null;
  }>({ 내장: null, 외장: null });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: '내장' | '외장') => {
    setImages((prev) => ({ ...prev, [type]: event.target.files }));
  };

  const handleImageRemove = (type: '내장' | '외장') => {
    setImages((prev) => ({ ...prev, [type]: null }));
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
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.1)", // Horizontal, Vertical, Blur, Spread, and Color
      }}
    >
      <Box sx={{ marginTop: "0.1rem" }}>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          차량 사진 업로드
        </Typography>
      </Box>
      <Box sx={{ marginTop: "0.2rem" }}>
        <p style={{ fontSize: "12px" }}>
          첨부할 사진을 올려주세요. 내장사진, 외장사진 각각 최소 2개이상 올려야
          합니다.
        </p>
      </Box>
      <Box sx={{ marginTop: "1rem", fontWeight:"bold", fontSize:"25px", alignSelf:"start", marginLeft:4 }}>
        <p>내장 사진</p>
        <Box>
        <input type="file" onChange={(e) => handleImageChange(e, '내장')} multiple />
          {images.내장 &&
            Array.from(images.내장).map((image, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(image)} alt="내장 사진" />
                <button onClick={() => handleImageRemove('내장')}>삭제</button>
              </div>
            ))}
          <button>+ 사진 추가</button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step4;
