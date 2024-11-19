import Nav from "../../components/Nav";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Grid,
  FormControlLabel,
} from "@mui/material";
import ProgressSteps from "../../components/ProgressSteps";
import { categories } from "./categories";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import Step4 from "./Step/Step4";
import Step5 from "./Step/Step5";

const Sale: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 화면 상태

  // 각 화면의 내용을 다르게
  const stepsContent = [
    // 첫 번째 화면
    <Step1 categories={categories} />,
    // 두 번째 화면
    <Step2 categories={categories} />,
    // 세 번째 화면
    <Step3 categories={categories} />,
    // 네 번째 화면
    <Step4 categories={categories} />,
    // 다섯 번째 화면
    <Step5 categories={categories} />,
  ];

  // "다음" 버튼 클릭 시 화면을 변경하는 함수
  const handleNextStep = () => {
    //첫 번째 화면일 때 기능
    if (currentStep == 0) {
      console.log("첫 번째 화면 다음 버튼");
    }
    //두 번째 화면일 때 기능
    else if (currentStep == 1) {
      console.log("두 번째 화면 다음 버튼");
      // 입력된 주행거리 값을 이용한 처리 (예: 다음 화면으로 이동, 데이터 전송 등)
      console.log("입력된 주행거리:");
    }
    //세 번째 화면일 때 기능
    else if (currentStep == 2) {
      console.log("세 번째 화면 다음 버튼");
    }
    //네 번째 화면일 때 기능
    else if (currentStep == 3) {
      console.log("네 번째 화면 다음 버튼");
    }
    //다섯 번째 화면일 때 기능
    else if (currentStep == 4) {
      console.log("다섯 번째 화면 다음 버튼");
    }
    setCurrentStep((prevStep) =>
      Math.min(prevStep + 1, stepsContent.length - 1)
    );
  };

  // "이전" 버튼 클릭 시 화면을 변경하는 함수
  const handlePreStep = () => {
    setCurrentStep(
      (prevStep) => Math.max(prevStep - 1, 0) // currentStep이 0보다 작지 않도록 설정
    );
  };

  return (
    <>
      <Nav />
      <ProgressSteps currentStep={currentStep} /> {/* currentStep을 전달 */}
      {stepsContent[currentStep]} {/* 현재 단계의 화면 렌더링 */}
      <Box
        sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
      >
        {currentStep > 0 && ( // currentStep이 0일 때는 이전 버튼을 숨김
          <Button
            variant="contained"
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
            onClick={handlePreStep} // 버튼 클릭 시 화면 변경
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
          onClick={handleNextStep} // 버튼 클릭 시 화면 변경
        >
          {currentStep === 4 ? "완료" : "다음"}
        </Button>
      </Box>
    </>
  );
};

export default Sale;
