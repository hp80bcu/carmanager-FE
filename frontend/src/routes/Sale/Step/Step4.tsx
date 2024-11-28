import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";

interface Category {
  title: string;
  options: string[];
}

interface Step5Props {
  categories: Category[];
  selectedOptions: string[];
  price: string;
  description: string;
  setPictures: (pictures: File[]) => void;
}

interface Image {
  src: string;
  id: number;
}

const Step4: React.FC<Step5Props> = ({ categories, selectedOptions, price, description, setPictures }) => {
  const [images, setImages] = useState<{
    내장: Image[];
    외장: Image[];
  }>({ 내장: [], 외장: [] });

  const [pictures, updatePictures] = useState<File[]>([]);

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

    updatePictures((prevPictures) => {
      const updatedPictures = [...prevPictures, ...acceptedFiles];
      setPictures(updatedPictures); // Update parent state
      return updatedPictures;
    });
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
              position: "relative",
              background: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              overflow: "hidden",
              border: 1,
              borderColor: "grey.500",
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
              }}
            >
              X
            </Button>
          </Box>
        </Grid>
      ))}
      <Grid item xs={4}>
        <div
          {...(type === "내장" ? getInnerRootProps() : getOuterRootProps())}
        >
          <input
            {...(type === "내장" ? getInnerInputProps() : getOuterInputProps())}
          />
          <Box
            sx={{
              width: "10rem",
              height: "10rem",
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

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // 1. `sellAddRequestDto`의 나머지 데이터를 JSON 문자열로 변환하여 `FormData`에 추가
    const requestData = {
      carId: 2, // 예시 carId (실제 값으로 변경 필요)
      carNumber: "236나3604", // 예시 carNumber (실제 값으로 변경 필요)
      price: price,
      description: description,
      options: selectedOptions, // 배열 형태로 전송
    };
  
    formData.append("sellAddRequestDto", JSON.stringify(requestData));
  
    // 2. `pictures` 배열을 `FormData`에 추가
    pictures.forEach((picture) => formData.append("pictures", picture));
  
    // `formData` 로그 확인
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  
    try {
      const response = await axios.post("http://localhost:8080/sells", formData, {
        headers: {
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
        차량 사진 업로드
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
        첨부할 사진을 올려주세요. 내장사진, 외장사진 각각 최소 2개 이상 올려야 합니다.
      </Typography>
      <Box sx={{ width: "100%", mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>내장 사진</Typography>
        {renderImageBoxes("내장")}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>외장 사진</Typography>
        {renderImageBoxes("외장")}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: "2rem" }}
      >
        차량 등록
      </Button>
    </Box>
  );
};

export default Step4;
