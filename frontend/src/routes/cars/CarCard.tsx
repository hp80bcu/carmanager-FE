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
    // <Grid
    //   container
    //   direction="row"
    //   spacing={2}
    //   item
    //   xs={12}
    //   sm={6}
    //   md={4}
    //   lg={3}
    //   onClick={handleClick}
    //   style={{ cursor: "pointer" }}
    // >
    //   <Box
    //     className="car-card"
    //     sx={{
    //       border: "1px solid #ddd",
    //       borderRadius: "8px",
    //       overflow: "hidden",
    //       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    //       transition: "transform 0.2s ease",
    //       "&:hover": {
    //         transform: "scale(1.03)",
    //         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    //       },
    //     }}
    //   >
    //     <img
    //       src={profileImage}
    //       alt={model}
    //       style={{ width: "100%", height: "150px", objectFit: "cover" }}
    //     />
    //     <Box sx={{ padding: "1rem" }}>
    //       <Typography variant="h6" fontWeight="bold">
    //         {model}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         {year}년식 · {fuel} · {distance}km · {region}
    //       </Typography>
    //       <Typography variant="body1" fontWeight="bold" mt={1}>
    //         {price}만원
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Grid>
    <div className="car-card" onClick={handleClick}>
      <img src={profileImage} alt={model} />
      <h3>{model}</h3>
      <p>{price}만원</p>
      {/* ... 다른 정보 */}
    </div>
  );
};

export default CarCard;
