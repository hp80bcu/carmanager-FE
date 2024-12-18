import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, MenuItem, styled } from "@mui/material";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom"; // 추가
import Nav from "../../components/Nav";
import { carData } from "./carData"; // carData import
import "./Home.css";

export default function Home() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [detailModel, setDetailModel] = useState("");
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const navigate = useNavigate(); // 네비게이트 함수 추가

  const handleSearch = () => {
    const url = new URLSearchParams();

    url.append("company", manufacturer);

    if (model) {
      url.append("model", model);
    }
    if (detailModel) {
      url.append("detail", detailModel);
    }

    console.log("전송할 URL:", `/searchpage?${url.toString()}`);

    // 검색 결과 페이지로 이동
    navigate(`/searchpage?${url.toString()}`);
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

  // 광고 이미지 배열
  const ads = [
    {
      href: "https://www.hyundai.com/kr/ko/e/vehicles/sonata-the-edge/intro",
      src: "/Image/ad.jpg",
    },
    {
      href: "https://www.kia.com/kr?utm_source=google_SA&utm_medium=AD202412&utm_campaign=KiaSales2024_brand&utm_content=keyword_pc&utm_term=%EA%B8%B0%EC%95%84%EC%9E%90%EB%8F%99%EC%B0%A8&gad_source=1",
      src: "/Image/ad2.jpeg",
    },
    {
      href: "https://www.tesla.com/ko_kr",
      src: "/Image/ad3.jpeg",
    },
  ];

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // 순환
    }, 1800); // 초마다 슬라이드

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [ads.length]);

  return (
    <>
      <Nav />
      <div className="homecontainer">
        <div className="ad">
          <a
            href={ads[currentAdIndex].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="ad"
              src={ads[currentAdIndex].src}
              alt={`Ad ${currentAdIndex + 1}`}
            />
          </a>
          <div>
            <div className="ad-slider-dots">
              {ads.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentAdIndex ? "active" : ""}`}
                  onClick={() => setCurrentAdIndex(index)}
                ></span>
              ))}
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}
