import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarData } from "../cars/CarData";
import "./CarCard.css";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

interface CarCardProps extends CarData {}

const CarCard: React.FC<CarCardProps> = ({
  carId,
  distance,
  fuel,
  model,
  price,
  profileImage,
  region,
  registDate,
  year,
}) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false); // 찜 상태 추가

  const handleClick = () => {
    navigate(`/cars/${carId}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite); // 찜 상태 토글
    console.log("찜!");
  };
  // 모든 필드가 로드되었는지 확인
  const isDataLoaded =
    carId !== undefined &&
    distance !== undefined &&
    fuel !== undefined &&
    model !== undefined &&
    price !== undefined &&
    profileImage !== undefined &&
    region !== undefined &&
    registDate !== undefined &&
    year !== undefined;

  return (
    <div className="car-card" onClick={isDataLoaded ? handleClick : undefined}>
      {isDataLoaded ? (
        <>
          {/* 데이터가 모두 로드되었을 때 렌더링 */}
          <img src={profileImage} alt={model} style={{height:"10rem"}}></img>
          <p className="car-card-model">{model}</p>
          <div className="car-card-left">
            <p className="car-card-content">
              {dayjs(registDate).format("YYYY년 MM월")}{" "}
              {`(${String(year).slice(-2)}년형)`}
            </p>
            <p className="car-card-content">
              {Number(distance).toLocaleString()}km | {region}
            </p>
            <p className="car-card-content">{fuel}</p>
            <p className="car-card-price">
              {Number(price).toLocaleString()}만원
            </p>
            <p className="car-card-icon" onClick={handleFavoriteClick}>
              <img
                src={
                  isFavorite
                    ? "/Image/favorite_filled.png"
                    : "/Image/favorite_empty.png"
                }
                alt="찜"
              ></img>
            </p>
          </div>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100px"
        >
          {/* 데이터 로딩 중일 때 스켈레톤 또는 로딩 메시지 표시 */}
          <CircularProgress size={24} />
        </Box>
      )}
    </div>
  );
};

export default CarCard;
