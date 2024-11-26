import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import { categories } from "../categories";

interface Category {
  title: string;
  options: string[];
}

interface Step5Props {
  categories: Category[];
}

interface Image {
  src: string;
  id: number;
}

const Step4: React.FC<Step5Props> = ({ categories }) => {
  const [images, setImages] = useState<{
    내장: Image[];
    외장: Image[];
  }>({ 내장: [], 외장: [] });

  const onDrop = (acceptedFiles: File[], type: "내장" | "외장") => {
    setImages((prevImages) => ({
      ...prevImages,
      [type]: [
        ...prevImages[type],
        ...acceptedFiles.map((file, index) => ({
          src: URL.createObjectURL(file),
          id: Date.now() + index,
        })),
      ],
    }));
  };

  const handleRemoveImage = (id: number, type: "내장" | "외장") => {
    setImages((prevImages) => ({
      ...prevImages,
      [type]: prevImages[type].filter((image) => image.id !== id),
    }));
  };

  // Create separate drop zones for "내장" and "외장"
  const { getRootProps: getInnerRootProps, getInputProps: getInnerInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, "내장"),
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    });

  const { getRootProps: getOuterRootProps, getInputProps: getOuterInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, "외장"),
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    });

  const renderImageBoxes = (type: "내장" | "외장") => (
    <Grid container spacing={4}>
      {images[type].map((image) => (
        <Grid item xs={4} key={image.id}>
          <Box
            sx={{
              width: "10rem",
              height: "10rem",
              // paddingTop: "100%", // Aspect ratio 1:1
              position: "relative",
              background: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              overflow: "hidden",
              border: 1,
              borderColor: "grey.500",
              marginRight: "15rem",
            }}
          >
            <Button
              onClick={() => handleRemoveImage(image.id, type)}
              sx={{
                position: "absolute",
                right: "0px",
                background: "transparent",
                color: "red",
                fontSize: "12px",
                zIndex: 10,
                padding: "1px 1px", // 내부 여백 최소화
                minWidth: "20px", // 버튼 최소 너비
                "&:hover": {
                  background: "darkgrey", // 호버 시 색상 변경
                },
              }}
            >
              X
            </Button>
          </Box>
        </Grid>
      ))}
      <Grid item xs={4}>
      <div
          {...(type === "내장"
            ? getInnerRootProps()
            : getOuterRootProps())}
        >
          <input
            {...(type === "내장"
              ? getInnerInputProps()
              : getOuterInputProps())}
          />
          <Box
            sx={{
              width: "10rem",
              height: "10rem",
              // paddingTop: "100%", // Aspect ratio 1:1
              backgroundColor: "#e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              border: 1,
              borderColor: "grey.500",
              cursor: "pointer",
              fontSize: "24px",
              color: "#888",
            }}
          >
            +
          </Box>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // height: "30rem",
        marginRight: "23rem",
        marginLeft: "23rem",
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
      <Box
        sx={{
          marginTop: "1rem",
          fontWeight: "bold",
          fontSize: "25px",
          alignSelf: "start",
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <Box sx={{ width: "100%", mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            내장 사진
          </Typography>
          {renderImageBoxes("내장")}
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            외장 사진
          </Typography>
          {renderImageBoxes("외장")}
        </Box>
      </Box>
    </Box>
  );
};

export default Step4;
