import React, { useState } from "react";
import { Button, TextField, Modal, Box, InputAdornment } from "@mui/material";
import axios from "axios";

interface CarAddPopupProps {
  onClose: () => void;
  onOpenNext: (
    carNumber: string,
    company: string,
    model: string,
    detail: string,
    img: string,
    userId: bigint
  ) => void;
  userId: bigint;
}

const CarAddPopup: React.FC<CarAddPopupProps> = ({
  onClose,
  onOpenNext,
  userId,
}) => {
  const [carNumber, setCarNumber] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setError(null); // 초기화
      setSearchResult(null); // 초기화

      if (!carNumber.trim()) {
        alert("먼저 차량 번호를 검색해주세요.");
        setError("차량 번호를 입력해주세요.");
        return;
      }

      const requestBody = { carNumber }; // JSON 데이터로 변환

      const response = await axios.post(
        `http://localhost:8080/cars/get-my-car`, // POST 요청
        requestBody, // Request body로 전달
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식
          },
        }
      );
      const data = response.data.result;
      console.log(response);
      if (response.data) {
        setSearchResult(`차량 정보: ${data}`);
        handleSubmit(
          carNumber,
          userId,
          data.company,
          data.model,
          data.detail,
          data.image
        );
      } else {
        setSearchResult(null);
        setError("검색 결과가 없습니다.");
        alert("검색 결과가 없습니다.");
      }
    } catch (err) {
      console.error("검색 실패:", err);
      setError("검색 중 오류가 발생했습니다.");
      alert("검색 결과가 없습니다.");
    }
  };

  const handleSubmit = (
    carNumber: string,
    userId: bigint,
    company: string,
    model: string,
    detail: string,
    image: string
  ) => {
    console.log(carNumber, userId, company, model, detail);
    if (!carNumber || !userId || !company || !model || !detail || !image) {
      alert("검색 결과가 없습니다.");
      onOpenNext(carNumber, company, model, detail, image, userId);
    } else {
      onOpenNext(carNumber, company, model, detail, image, userId); // 부모 컴포넌트로 검색 결과 전달
      console.log("searchResult: ", searchResult);
    }
    console.log("차 번호:", carNumber);
    console.log("회사:", company);
    console.log("모델 :", model);
    console.log("상세:", detail);
    console.log("이미지:", image);
    console.log("UserId:", userId);
    // console.log("검색 결과:", searchResult);
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
          <h2
            id="car-modal-title"
            style={{ marginRight: "1.2rem", marginTop: "3rem" }}
          >
            차량번호 입력
          </h2>
          <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
            등록할 차량 번호를 입력해주세요.
          </p>
          <TextField
            autoFocus
            margin="dense"
            id="carNumber"
            type="text"
            value={carNumber}
            onChange={handleInputChange}
            placeholder="123가4567"
            className="custom-textfield"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      backgroundColor: "#009688",
                      borderRadius: "0 4px 4px 0",
                      padding: "13px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src="/Image/search.png" height="30" alt="검색"></img>
                  </Box>
                </InputAdornment>
              ),
              style: {
                paddingRight: 0,
              },
            }}
          />
          <Box
            sx={{
              width: "78%",
              height: "1px",
              backgroundColor: "#D9D9D9",
              marginTop: "3.5rem",
            }}
          />
          <p
            style={{
              fontSize: "13px",
              textAlign: "center",
              margin: "2rem 4px 10px 4px",

              fontWeight: "bolder",
            }}
          >
            월말에 차량 등록 시 차량번호 확인 서비스 이용에 제한이 있을 수
            있습니다.
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
              onClick={onClose}
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
              취소
            </Button>
            <Button
              onClick={handleSearch}
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
              추가
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CarAddPopup;
