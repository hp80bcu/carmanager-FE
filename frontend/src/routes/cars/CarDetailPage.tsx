import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CarData } from "./CarData";
import { Grid, Typography } from "@mui/material";
import SearchBar from "../../components/Searchbar/Searchbar";
import SideNav from "../../components/SideNav";
import "./CarDetailPage.css";
import CarOptions from "./CarOptions";
import dayjs from "dayjs";
import MarketPriceModal from "./MarketPriceModal";

// 타입(alias) 정의
type CarDetails = {
  carId: number;
  carNum: string;
  carModel: string;
  shift: string; //변속기
  type: string; //차량 타입
  color: string;
  price: number;
  displacement: string; //배기량
  fuel: string;
  distance: string; //주행거리
  options: string;
  year: string;
  images: {
    fileId: number;
    carId: number;
    file: string;
    createAt: string | null;
  }[];
  efficeiency: string; //연비

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
  const [isMarketPriceModalOpen, setIsMarketPricModalOpen] = useState(false);
  const [selectedCarModel, setCarModel] = useState<string>("");
  // 선택된 이미지 상태 관리
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); // 선택된 이미지 인덱스 상태
  const location = useLocation(); // URL의 쿼리 파라미터를 읽기 위해 추가
  const { region, registDate, year, fuel } = location.state || {};

  console.log("location.state: ", region, registDate, year, fuel);
  // 선택된 이미지 클릭 시 해당 이미지를 상태로 설정


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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const company = params.get("company");
    const model = params.get("model");
    const detail = params.get("detail");

    const fetchData = async () => {
      try {
        // detail 값이 있는지 확인하여 URL 구성
        let url = `http://localhost:8080/sells`;

        if (company) {
          url += `?company=${company}`;
        }

        if (model) {
          url += `&model=${model}`;
        }

        if (detail) {
          url += `&detail=${detail}`;
        }

        const response = await axios.get(url);
        setCars(response.data.result);
        console.log(response.data.result);
        setTotalCars(response.data.result.length); // 결과에 따라 총 차량 수 업데이트
      } catch (error) {
        console.error("차량 데이터를 가져오는 중 오류 발생:", error);
        setCars([]);
      }
    };

    fetchData();
  }, [location.search]); // location.search가 바뀔 때마다 실행

  // 시세 확인 버튼
  const handleMarketPricClick = (carModel: string) => {
    setIsMarketPricModalOpen(true);
    setCarModel(carModel);
  };
  const handleCloseMarketPricModal = () => {
    setIsMarketPricModalOpen(false);
  };

  // 이미지 넘기기
  const handleNextImage = () => {
    if (carDetails && carDetails.images.length > 0) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === carDetails.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (carDetails && carDetails.images.length > 0) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? carDetails.images.length - 1 : prevIndex - 1
      );
    }
  };
// 이미지 클릭 시 해당 이미지를 선택하는 함수
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
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
            marginLeft: "18rem",
            marginTop: "2rem",
            // background: "#f9f9f9",
          }}
        >
          <div className="car-detail-container">
            <div className="car-detail-first-container">
              <div className="car-detail-first-image-container">
                <div className="car-image-section">
                  {/* 이미지 로딩 상태 */}
                  {loading || !carDetails?.images ? (
                    <div className="loading-placeholder">이미지 로딩 중...</div>
                  ) : (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="image-nav-btn"
                      >
                        &lt;
                      </button>
                      <div className="image-container">
                        <img
                          src={carDetails.images[selectedImageIndex]?.file}
                          alt={`${selectedImageIndex + 1}`}
                          className="car-image"
                        />
                      </div>
                      <button
                        onClick={handleNextImage}
                        className="image-nav-btn"
                      >
                        &gt;
                      </button>
                    </>
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
                                onClick={() => handleImageClick(index)}
                              />
                            ) : (
                              <div className="no-image">
                                <div className="no-image-text">X</div>
                              </div> // 비어있는 칸에 회색 배경 적용
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="car-detail-first-content">
                <h1>
                  {loading || !carDetails?.carNum
                    ? "차 번호 로딩 중..."
                    : `(${carDetails.carNum}) ${carDetails.carModel}`}
                </h1>
                <div className="car-detail-first-content-basic-info1">
                  <p>
                    {loading || !registDate
                      ? "로딩 중..."
                      : dayjs(registDate).format("YYYY년 MM월")}
                    {""}
                  </p>
                  <p>
                    {loading || !year
                      ? "로딩 중..."
                      : `(${String(year).slice(-2)}년형)`}
                    {" | "}
                  </p>
                  <p style={{ paddingTop: "1.5px" }}>
                    {loading || !fuel ? "로딩 중..." : fuel}
                    {" | "}
                  </p>
                  <p>{loading || !region ? "로딩 중..." : region}</p>
                </div>
                <div className="row-hipen-style"></div>
                <div className="car-detail-first-content-basic-info2">
                  <p>판매가격</p>
                  <h2>
                    {loading || !carDetails?.price
                      ? "가격 로딩 중..."
                      : Number(carDetails.price).toLocaleString()}
                    만원
                  </h2>
                  <button
                    onClick={() =>
                      handleMarketPricClick(carDetails?.carModel ?? "")
                    }
                  >
                    시세확인
                  </button>
                </div>
                <div className="car-detail-first-content-basic-info3">
                  <div className="car-detail-first-content-basic-info3-column">
                    <img src="../Image/basic-info.png"></img>
                    <p>기본정보</p>
                  </div>
                  <div className="car-detail-first-content-basic-info3-column">
                    <img
                      src={
                        Number(carDetails?.distance) < 50000
                          ? "../Image/distance-veryshort.png"
                          : Number(carDetails?.distance) < 100000
                          ? "../Image/distance-short.png"
                          : Number(carDetails?.distance) < 150000
                          ? "../Image/distance-long.png"
                          : "../Image/distance-verylong.png"
                      }
                      alt="주행거리 상태"
                    ></img>
                    <p>주행거리</p>
                  </div>
                  <div className="car-detail-first-content-basic-info3-column">
                    <img src="../Image/chat.png"></img>
                    <p>1:1채팅</p>
                  </div>
                </div>
                <div className="car-detail-first-content-basic-info4">
                  <h3>판매자 정보</h3>
                  <div className="car-detail-first-content-basic-info4-row">
                    <p
                      style={{
                        margin: "15px 0 0 0",
                        // paddingRight:"20px",
                        fontWeight: "unset",
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      {loading || !carDetails?.name
                        ? "이름 로딩 중..."
                        : carDetails.name}
                    </p>
                    <div className="car-detail-first-content-basic-info4-column">
                      <div
                        className="car-detail-first-content-basic-info4-row"
                        style={{ gap: "20px" }}
                      >
                        <img src="../Image/phone.png"></img>
                        <p>
                          {loading || !carDetails?.phoneNumber
                            ? "전화번호 로딩 중..."
                            : carDetails.phoneNumber}
                        </p>
                      </div>
                      <div
                        className="car-detail-first-content-basic-info4-row"
                        style={{ gap: "20px" }}
                      >
                        <img src="../Image/email.png"></img>
                        <p>
                          {loading || !carDetails?.email
                            ? "이메일 로딩 중..."
                            : carDetails.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row-hipen-style"></div>

            <div className="car-basic-info">
              <h2>차량 기본정보</h2>
              <div className="car-basic-info-row">
                <div
                  className="car-basic-info-coulmn"
                  style={{ color: "#C0C0C0" }}
                >
                  <p>차량번호</p>
                  <p>주행거리</p>
                  <p>변속기</p>
                  <p>차종</p>
                  <p>색상</p>
                </div>

                <div
                  className="car-basic-info-coulmn"
                  style={{ marginRight: "10px" }}
                >
                  <p>
                    {loading || !carDetails?.carNum
                      ? "로딩 중..."
                      : carDetails.carNum}
                  </p>
                  <p>
                    {loading || !carDetails?.distance
                      ? "로딩 중..."
                      : Number(carDetails.distance).toLocaleString()}
                    km
                  </p>
                  <p>
                    {loading || !carDetails?.shift
                      ? "로딩 중..."
                      : carDetails.shift}
                  </p>
                  <p>
                    {loading || !carDetails?.type
                      ? "로딩 중..."
                      : carDetails.type}
                  </p>
                  <p>
                    {loading || !carDetails?.color
                      ? "로딩 중..."
                      : carDetails.color}
                  </p>
                </div>

                <div
                  className="car-basic-info-coulmn"
                  style={{ color: "#C0C0C0" }}
                >
                  <p>연식</p>
                  <p>연료</p>
                  <p>연비</p>
                  <p>배기량</p>
                  <p style={{ height: "21.5px" }}></p>
                </div>

                <div className="car-basic-info-coulmn">
                  <p>
                    {loading || !registDate
                      ? "로딩 중..."
                      : dayjs(registDate).format("YYYY년 MM월")}
                    {""}
                    <span>
                      {loading || !year
                        ? "로딩 중..."
                        : `(${String(year).slice(-2)}년형)`}
                    </span>
                  </p>
                  <p>
                    {loading || !carDetails?.fuel
                      ? "로딩 중..."
                      : carDetails.fuel}
                  </p>
                  <p>
                    {loading || !carDetails?.efficeiency
                      ? "로딩 중..."
                      : carDetails.efficeiency}
                    km/L
                  </p>
                  <p>
                    {loading || !carDetails?.displacement
                      ? "로딩 중..."
                      : Number(carDetails.displacement).toLocaleString()}
                    cc
                  </p>
                  <p style={{ height: "21.5px" }}></p>
                </div>
              </div>
            </div>

            <div className="row-hipen-style"></div>

            <div className="car-options-section">
              {loading ? (
                <p>로딩 중...</p>
              ) : carDetails ? (
                <>
                  <CarOptions options={carDetails.options} />
                </>
              ) : (
                <p>데이터를 불러오지 못했습니다.</p>
              )}
            </div>

            <div className="row-hipen-style"></div>

            <div className="car-description-section">
              <h2>차량 설명</h2>
              <p>
                {loading || !carDetails?.carDescription
                  ? "설명 로딩 중..."
                  : carDetails.carDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 정비 이력 Modal */}
      {selectedCarModel && (
        <MarketPriceModal
          carModel={selectedCarModel}
          isOpen={isMarketPriceModalOpen}
          onClose={handleCloseMarketPricModal}
        />
      )}
    </>
  );
};

export default CarDetailPage;
