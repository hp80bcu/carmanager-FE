import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Nav from "../../components/Nav";
import ProgressSteps from "../../components/ProgressSteps";
import { categories } from "./categories";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import Step4 from "./Step/Step4";

const Sale: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [price, setPrice] = useState<string>(""); // Step2의 판매 금액
  const [description, setDescription] = useState<string>(""); // Step3의 차량 설명
  const [pictures, setPictures] = useState<File[]>([]);

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
    <Step1 categories={categories} updateSelectedOptions={updateSelectedOptions} />,
    <Step2 selectedOptions={selectedOptions} price={price} updatePrice={updatePrice} />,
    <Step3 selectedOptions={selectedOptions} price={price} description={description} updateDescription={updateDescription} categories={[]} />,
    <Step4 
      selectedOptions={selectedOptions} 
      price={price} 
      description={description} 
      categories={[]} 
      setPictures={setPictures}  // setPictures 함수 전달
    />,
  ];

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, stepsContent.length - 1));
  };

  const handlePreStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <>
      <Nav />
      <ProgressSteps currentStep={currentStep} />
      {stepsContent[currentStep]}
      <Box sx={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
        {currentStep > 0 && (
          <Button
            variant="contained"
            onClick={handlePreStep}
            sx={{ marginRight: "30px" }}
          >
            이전
          </Button>
        )}
        <Button variant="contained" onClick={handleNextStep}>
          {currentStep === 3 ? "완료" : "다음"}
        </Button>
      </Box>
    </>
  );
};

export default Sale;
