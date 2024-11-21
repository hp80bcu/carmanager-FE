import React, { useState } from "react";
import {
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  styled,
} from "@mui/material";
import Select from "@mui/material/Select";
import Nav from "../../components/Nav";
import { carData } from "./carData"; // carData import
import "./Home.css";

export default function Home() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [detailModel, setDetailModel] = useState("");

  const handleSearch = async () => {
    const url = new URL("http://localhost:8080/sells/");
    url.searchParams.append("company", manufacturer);
    url.searchParams.append("model", model);
    url.searchParams.append("detail", detailModel);

    console.log("전송할 URL:", url.toString());

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("서버 요청에 실패했습니다.");
      }

      const data = await response.json();
      console.log("응답 데이터:", data);
    } catch (error) {
      console.error("요청 중 에러 발생:", error);
    }
  };

  const Container = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0px",
    marginTop: "50px",
    marginBottom: "20px",
    marginLeft: "50px",
    marginRight: "50px",
  });

  return (
    <>
      <Nav />
      <div className="homecontainer">
        <div className="ad">
          <text>A.D</text>
        </div>
      </div>
      <div className="homecontainer">
        <div className="modelsearch">
          <text>모델 검색</text>
          <div className="modelsearchAreaLine">
            <Container
              style={{
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "3rem",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="manufacturers">제조사</InputLabel>
                <Select
                  labelId="manufacturers"
                  id="manufacturers"
                  label="제조사"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value as string)}
                >
                  {Object.keys(carData).map((manufacturer) => (
                    <MenuItem key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="models">모델명</InputLabel>
                <Select
                  labelId="models"
                  id="models"
                  value={model}
                  label="모델명"
                  onChange={(e) => setModel(e.target.value as string)}
                  disabled={!manufacturer}
                >
                  {manufacturer &&
                    Object.keys(carData[manufacturer]).map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="detailModels">세부모델</InputLabel>
                <Select
                  labelId="detailModels"
                  id="detailModels"
                  value={detailModel}
                  label="세부모델"
                  onChange={(e) => setDetailModel(e.target.value as string)}
                  disabled={!model}
                >
                  {manufacturer &&
                    model &&
                    carData[manufacturer][model].map((detailModel) => (
                      <MenuItem key={detailModel} value={detailModel}>
                        {detailModel}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Container>
            <button
              type="button"
              className="home-button-container"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
          <div className="container">
            <div className="notice">
              <text>공지 사항</text>
              <div className="noticeAreaLine"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
