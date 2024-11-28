import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import Nav from "../../components/Nav";
import axios from "axios";

interface CarAddPopup_1Props {
  onClose: () => void;
  onReopenFirstPopup: () => void;
  userId: bigint;
  carNumber: string;
  company: string;
  model: string;
  detail: string;
  image: string;
}

const CarAddPopup_1: React.FC<CarAddPopup_1Props> = ({
  onClose,
  onReopenFirstPopup,
  userId,
  carNumber,
  company,
  model,
  detail,
  image,
}) => {
  const handleNoClick = () => {
    onReopenFirstPopup();
    onClose();
  };

  const handleSubmit = async () => {
    console.log("UserId:", userId);
    console.log("차 번호:", carNumber);
    console.log("회사:", company);
    console.log("모델 :", model);
    console.log("상세:", detail);
    console.log("이미지:", image);
    // 백엔드로 데이터를 전송
    try {
      const requestData = {
        userId,
        carNumber,
        company,
        model,
        detail,
        image,
      };

      const response = await axios.post(
        "http://localhost:8080/cars/add-car",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert("차량이 성공적으로 추가되었습니다!");
        onClose(); // 팝업 닫기
      } else {
        alert("차량 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("차량 추가 오류:", error);

      // AxiosError 처리
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버 응답 오류 (status, statusText)
          console.error(
            "응답 오류:",
            error.response.status,
            error.response.statusText
          );
          alert(
            `서버 오류: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          // 서버로 요청이 갔지만 응답이 없을 때
          console.error("요청 오류:", error.request);
          alert("서버 응답이 없습니다. 네트워크 오류를 확인해주세요.");
        } else {
          // 다른 오류
          console.error("오류 발생:", error.message);
          alert(`오류: ${error.message}`);
        }
      } else {
        // Axios가 아닌 다른 오류 처리
        alert("차량 추가 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="car-modal-title"
        aria-describedby="car-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            height: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="차량이미지"
            style={{ paddingTop: "2rem", width: "10rem", height: "9rem" }}
          ></img>
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ margin: "0", fontSize: "15px" }}>{company}</p>
            <p style={{ margin: "0", fontWeight: "bold", fontSize: "25px" }}>
              {model}
            </p>
            <p style={{ margin: "0", fontSize: "15px", color: "grey" }}>
              {detail}
            </p>
          </Box>

          {/* 회색 줄 */}
          <Box
            sx={{
              width: "78%",
              height: "1px",
              backgroundColor: "#D9D9D9",
              marginTop: "2rem",
            }}
          />
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              margin: "2rem 4px 10px 4px",
              fontWeight: "bolder",
            }}
          >
            추가하려는 차량이 맞으신가요?
          </p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              onClick={handleNoClick}
              sx={{
                height: "50px",
                fontSize: "1rem",
                flex: 1,
                backgroundColor: "#00BFA5",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "#009688",
                },
              }}
            >
              아니요(모델 변경)
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                height: "50px",
                fontSize: "1rem",
                flex: 1,
                backgroundColor: "#00BFA5",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "#009688",
                },
              }}
            >
              네(계속 진행)
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CarAddPopup_1;
