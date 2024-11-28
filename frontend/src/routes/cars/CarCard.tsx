import React from "react";
import { useNavigate } from "react-router-dom";
import { CarData } from "../cars/CarData";
import "./CarCard.css";
import { Grid, Box, Typography } from "@mui/material";

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

  const handleClick = () => {
    navigate(`/cars/${carId}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <img src={profileImage} alt={model} />
      <h3>{model}</h3>
      <p>{price}만원</p>
      {/* ... 다른 정보 */}
    </div>
  );
};

export default CarCard;
