import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CarData } from "./CarData";
import { Grid, Typography } from "@mui/material";
import SearchBar from "../../components/Searchbar/Searchbar";
import SideNav from "../../components/SideNav";
import "./CarDetailPage.css";

// 타입(alias) 정의
type CarDetails = {
  carId: number;
  carNum: string;
  carModel: string;
  shift: string;
  type: string;
  color: string;
  price: number;
  displacement: string;
  fuel: string;
  distance: string;
  options: string[];
  year: string;
  images: {
    fileId: number;
    carId: number;
    file: string;
    createAt: string | null;
  }[];
  efficeiency: string;

  name: string;
  phoneNumber: string;
  email: string;

  carDescription: string;
};

const CarDetailPage: React.FC = () => {
  const { carId } = useParams();
  const [car, setCar] = useState<CarData | null>(null);
  const [cars, setCars] = useState<CarData[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 전체 로딩 상태 추가

  // 선택된 이미지 상태 관리
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const location = useLocation(); // URL의 쿼리 파라미터를 읽기 위해 추가


  // 선택된 이미지 클릭 시 해당 이미지를 상태로 설정
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const company = params.get("company");
  //   const model = params.get("model");
  //   const detail = params.get("detail");

  //   const fetchData = async () => {
  //     try {
  //       // detail 값이 있는지 확인하여 URL 구성
  //       let url = `http://localhost:8080/sells`;

  //       if (company) {
  //         url += `?company=${company}`;
  //       }

  //       if (model) {
  //         url += `&model=${model}`;
  //       }

  //       if (detail) {
  //         url += `&detail=${detail}`;
  //       }

  //       const response = await axios.get(url);
  //       setCars(response.data.result);
  //       setTotalCars(response.data.result.length); // 결과에 따라 총 차량 수 업데이트
  //     } catch (error) {
  //       console.error("차량 데이터를 가져오는 중 오류 발생:", error);
  //       setCars([]);
  //     }
  //   };

  //   fetchData();
  // }, [location.search]); // location.search가 바뀔 때마다 실행

  // useEffect(() => {
  //   const fetchCar = async () => {
  //     try {
  //       const response = await axios.get(`/api/cars/${carId}`);
  //       setCar(response.data);
  //     } catch (error) {
  //       console.error("차량 상세 정보를 가져오는 중 오류 발생:", error);
  //     }
  //   };
  //   fetchCar();
  // }, [carId]);

  // 차량 상세 정보 가져오기
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/sells/${carId}`
        );
        setCarDetails(response.data.result);
        console.log("fetched car details: ", response.data);
        console.log(
          "fetched response.data.result car details: ",
          response.data.result
        );
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false); // 로딩 상태 완료
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 고정된 SideNav */}
      <SideNav />
      {/* 고정된 SearchBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <SearchBar
          placeholder={`${totalCars.toLocaleString()} 대의 차량이 등록되어 있습니다!`}
          onSearch={function (searchTerm: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      {/* 스크롤 가능 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          marginLeft: "10rem",
          marginTop: "2rem",
          // background: "#f9f9f9",
        }}
      >
        <div className="car-detail-container">
          <div className="car-image-section">
            {/* 이미지 로딩 상태 */}
            {loading || !carDetails?.images ? (
              <div className="loading-placeholder">이미지 로딩 중...</div>
            ) : (
              <img
                src={selectedImage || carDetails.images[0]?.file}
                alt={`${carDetails.carModel}`}
                className="car-image"
              />
            )}
          </div>

          <div className="car-grid-section">
            {loading || !carDetails?.images ? (
              <div className="loading-placeholder">이미지 로딩 중...</div>
            ) : (
              <div className="image-grid">
                {/* 이미지를 그리드로 렌더링하고 부족한 부분은 no-image로 채우기 */}
                {[...Array(16)].map((_, index) => {
                  const image = carDetails.images[index];
                  return (
                    <div className="grid-item" key={index}>
                      {image ? (
                        <img
                          src={image.file}
                          alt={`Car image ${index + 1}`}
                          className="grid-image"
                          // 이미지 클릭 시 선택한 이미지로 변경
                          onClick={() => handleImageClick(image.file)}
                        />
                      ) : (
                        <div className="no-image"></div> // 비어있는 칸에 회색 배경 적용
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="car-info-section">
            <h1>
              {loading || !carDetails?.carNum
                ? "번호판 로딩 중..."
                : `(${carDetails.carNum}) ${carDetails.carModel}`}
            </h1>

            <h2>
              {loading || !carDetails?.price
                ? "가격 로딩 중..."
                : `${carDetails.price}만원`}
            </h2>

            <div className="car-basic-info">
              <p>
                연식:{" "}
                {loading || !carDetails?.year ? "로딩 중..." : carDetails.year}
              </p>
              <p>
                연료:{" "}
                {loading || !carDetails?.fuel ? "로딩 중..." : carDetails.fuel}
              </p>
              <p>
                주행거리:{" "}
                {loading || !carDetails?.distance
                  ? "로딩 중..."
                  : carDetails.distance}
              </p>
              <p>
                변속기:{" "}
                {loading || !carDetails?.shift
                  ? "로딩 중..."
                  : carDetails.shift}
              </p>
              <p>
                배기량:{" "}
                {loading || !carDetails?.efficeiency
                  ? "로딩 중..."
                  : `${carDetails.efficeiency}cc`}
              </p>
              <p>
                색상:{" "}
                {loading || !carDetails?.color
                  ? "로딩 중..."
                  : carDetails.color}
              </p>
            </div>

            <div className="seller-info">
              <h3>판매자 정보</h3>
              <p>
                이름:{" "}
                {loading || !carDetails?.name ? "로딩 중..." : carDetails.name}
              </p>
              <p>
                연락처:{" "}
                {loading || !carDetails?.phoneNumber
                  ? "로딩 중..."
                  : carDetails.phoneNumber}
              </p>
              <p>
                이메일:{" "}
                {loading || !carDetails?.email
                  ? "로딩 중..."
                  : carDetails.email}
              </p>
            </div>
          </div>

          <div className="car-options-section">
            <h3>주요 옵션</h3>
            <div className="options-list">
              {loading || !carDetails || !Array.isArray(carDetails.options) ? (
                <div className="loading-placeholder">옵션 로딩 중...</div>
              ) : (
                carDetails.options.map((option, index) => (
                  <div key={index} className="option-item">
                    {option}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="car-description-section">
            <h3>차량 설명</h3>
            <p>
              {loading || !carDetails?.carDescription
                ? "설명 로딩 중..."
                : carDetails.carDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
