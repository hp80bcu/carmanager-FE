import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface Step {
  number: number;
  label: string;
  isActive: boolean;
  isPrevious: boolean;
}

const ProgressSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  // steps 배열에서 각 단계의 상태를 설정
  const steps: Step[] = [
    { number: 1, label: "옵션 선택", isActive: currentStep === 0, isPrevious: currentStep > 0 },
    { number: 2, label: "주행거리 입력", isActive: currentStep === 1, isPrevious: currentStep > 1 },
    { number: 3, label: "판매금액 입력", isActive: currentStep === 2, isPrevious: currentStep > 2 },
    { number: 4, label: "차량 설명 입력", isActive: currentStep === 3, isPrevious: currentStep > 3 },
    { number: 5, label: "차량 사진 업로드", isActive: currentStep === 4, isPrevious: currentStep > 4 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        paddingTop: "50px",
        paddingBottom: "40px",
        marginBottom: "20px",
        borderBottom: "1px solid #D9D9D9",
      }}
    >
      {steps.map((step, index) => (
        <Stack
          key={step.number}
          direction="row" // Step Circle과 화살표를 가로 정렬
          alignItems="center"
          spacing={2}
          sx={{
            marginRight: index !== steps.length - 1 ? "20px" : "0",
          }}
        >
          {/* Step Circle and Label */}
          <Stack alignItems="center" spacing={1}>
            {/* Step Circle */}
            <Box
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor:
                  step.isActive
                    ? "#FFC107" // Current step
                    : step.isPrevious
                    ? "#0AC000" // Previous step
                    : "#E0E0E0", // Other steps
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                fontSize="40px"
                fontWeight="bold"
                sx={{
                  color: step.isActive || step.isPrevious ? "#FFFFFF" : "#FFFFFF",
                }}
              >
                {step.number}
              </Typography>
            </Box>

            {/* Step Label */}
            <Typography
              variant="body1"
              fontWeight={step.isActive ? "bold" : "normal"}
              sx={{
                color: step.isActive ? "#009688" : "black", // Highlight active step label
                textAlign: "center",
              }}
            >
              {step.label}
            </Typography>
          </Stack>

          {/* Arrow Between Steps */}
          {index !== steps.length - 1 && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: "50px", // 화살표 크기
                paddingBottom: "25px",
              }}
            >
              &gt;
            </Typography>
          )}
        </Stack>
      ))}
    </Box>
  );
};

export default ProgressSteps;
