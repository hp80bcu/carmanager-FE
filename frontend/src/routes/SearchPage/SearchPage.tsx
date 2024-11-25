import React, { useEffect, useState } from "react";
import CarCard from "../cars/CarCard";
import { CarData } from "../cars/CarData";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/Searchbar/Searchbar";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

const SearchPage = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCars, setTotalCars] = useState<number>(0);

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(`/api/cars?search=${searchTerm}`);
      setCars(response.data.cars || []);
      setTotalCars(response.data.totalCars); // 서버에서 총 차량 갯수를 받아서 설정
    } catch (error) {
      console.error("차량 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sells/");
        const carsData = response.data.result;
        setCars(carsData);
        console.log("Cars fetched:", carsData);
        console.log("setCars 데이터 저장: ", carsData);
        setTotalCars(response.data.result[0].howManyCar || 0); // 서버에서 총 차량 갯수를 받아서 설정
      } catch (error) {
        console.error("Error fetching car data:", error);
        setCars([]);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <>
      <SideNav />
      <SearchBar
        placeholder={`${totalCars.toLocaleString()} 대의 차량이 등록되어 있습니다!`}
        onSearch={handleSearch}
      />
      <div
        style={{
          position: "fixed", // 고정 위치
          top: "10rem", // 화면 위쪽에서 10rem 떨어진 위치
          left: "28rem", // 화면 왼쪽에서 5rem 떨어진 위치
          width: "45rem", // 너비를 지정
          // height: "calc(100% - 12rem)", // 고정된 높이 (화면에서 일정 부분 차지)
          overflowY: "auto", // 스크롤 가능
          background: "#f9f9f9", // 배경색
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 그림자 효과
          borderRadius: "8px", // 모서리 둥글게
        }}
      >
        {cars && cars.length > 0 ? (
          <Grid
            container
            spacing={30} // Adjust spacing between items
            // justifyContent="center"
          >
            {cars.map((car) => (
              <Grid item key={car.carId} xs={12} sm={6} md={4} lg={3}>
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
    </>
  );
};

export default SearchPage;
