import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Nav from "../../components/Nav";
import ProgressSteps from "../../components/ProgressSteps";
import { categories } from "./categories";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import Step4 from "./Step/Step4";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Sale: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Step1의 옵션 선택
  const [price, setPrice] = useState<string>(""); // Step2의 판매 금액
  const [description, setDescription] = useState<string>(""); // Step3의 차량 설명
  const [pictures, setPictures] = useState<File[]>([]); // Step4의 차량 이미지

  const { carId } = useParams();
  console.log("Received carId: ", carId);

  const navigate = useNavigate();
  
  const updateSelectedOptions = (options: string[]) => {
    setSelectedOptions(options);
  };

  const updatePrice = (newPrice: string) => {
    setPrice(newPrice);
  };

  const updateDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const stepsContent = [
    <Step1
      categories={categories}
      updateSelectedOptions={updateSelectedOptions}
    />,
    <Step2
      selectedOptions={selectedOptions}
      price={price}
      updatePrice={updatePrice}
    />,
    <Step3
      selectedOptions={selectedOptions}
      price={price}
      description={description}
      updateDescription={updateDescription}
      categories={[]}
    />,
    <Step4
      selectedOptions={selectedOptions}
      price={price}
      description={description}
      categories={[]}
      setPictures={setPictures} // setPictures 함수 전달
    />,
  ];

  const handleNextStep = () => {
    //첫 번째 화면일 때 기능
    if (currentStep == 0) {
      console.log("Step 1: Selected Options:", selectedOptions);
    }
    //두 번째 화면일 때 기능
    else if (currentStep == 1) {
      console.log("Step 2: Price:", price);
      if (!price) {
        alert("판매 금액을 입력해주세요.");
        return;
      }
    }
    //세 번째 화면일 때 기능
    else if (currentStep == 2) {
      console.log("Step 3: 차량설명:", description);
      if (!description.trim()) {
        alert("차량 설명을 입력해주세요.");
        return;
      }
    }
    //네 번째 화면일 때 기능
    else if (currentStep == 3) {
      console.log("Step 4: Pictures:", pictures);
      if (pictures.length < 4) {
        alert("사진을 최소 4장 이상 올려주세요.");
        return;
      }
      handleSubmit(); // 데이터 제출
    }
    setCurrentStep((prevStep) =>
      Math.min(prevStep + 1, stepsContent.length - 1)
    );
  };

  const handlePreStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    
    // 1. `sellAddRequestDto`의 나머지 데이터를 JSON 문자열로 변환하여 `FormData`에 추가
    const requestData = {
      carId: carId, // 예시 carId (실제 값으로 변경 필요)
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
      const response = await axios.post(
        "http://localhost:8080/sells",
        formData,
        {
          headers: {},
        }
      );
      alert("판매 등록에 성공 하였습니다!");
      navigate("/");
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("판매 등록에 실패 하였습니다!");
    }
    
  };
  
  return (
    <>
      <Nav />
      <ProgressSteps currentStep={currentStep} />
      {stepsContent[currentStep]}
      <Box
        sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
      >
        {currentStep > 0 && (
          <Button
            variant="contained"
            onClick={handlePreStep}
            sx={{
              backgroundColor: "#07C8A3",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "30px",
              padding: "10px 40px",
              "&:hover": {
                backgroundColor: "#00796B",
                color: "black",
              },
            }}
          >
            이전
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#07C8A3",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "10px 40px",
            "&:hover": {
              backgroundColor: "#00796B",
              color: "black",
            },
          }}
          onClick={handleNextStep}
        >
          {currentStep === 3 ? "완료" : "다음"}
        </Button>
      </Box>
    </>
  );
};

export default Sale;
