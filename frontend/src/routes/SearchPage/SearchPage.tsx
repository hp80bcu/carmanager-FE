import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 추가
import CarCard from "../cars/CarCard";
import { CarData } from "../cars/CarData";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/Searchbar/Searchbar";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

const SearchPage = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const location = useLocation(); // URL의 쿼리 파라미터를 읽기 위해 추가

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const company = params.get("company");
    const model = params.get("model");
    const detail = params.get("detail");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/sells/?company=${company}&model=${model}&detail=${detail}`
        );
        setCars(response.data.result);
        setTotalCars(response.data.result.length); // 결과에 따라 총 차량 수 업데이트
      } catch (error) {
        console.error("차량 데이터를 가져오는 중 오류 발생:", error);
        setCars([]);
      }
    };

    fetchData();
  }, [location.search]); // location.search가 바뀔 때마다 실행

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <SideNav />
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <SearchBar
          placeholder={`${totalCars.toLocaleString()} 대의 차량이 등록되어 있습니다!`}
          onSearch={() => {}}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          marginLeft: "20rem",
          marginTop: "2rem",
          background: "#f9f9f9",
        }}
      >
        {cars.length > 0 ? (
          <Grid container columnSpacing={2} rowSpacing={3}>
            {cars.map((car) => (
              <Grid
                item
                key={car.carId}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                marginLeft={1}
                marginRight={1}
              >
                <CarCard {...car} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            등록된 차량이 없습니다.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
