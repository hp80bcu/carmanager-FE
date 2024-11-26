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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 고정된 SideNav */}
      <SideNav />
      {/* 고정된 SearchBar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <SearchBar
          placeholder={`${totalCars.toLocaleString()} 대의 차량이 등록되어 있습니다!`}
          onSearch={handleSearch}
        />
      </div>
      {/* 스크롤 가능 영역 */}
      <div
        style={{
          flex: 1, // 남은 공간을 차지하여 스크롤 가능
          overflowY: "auto", // 세로 스크롤 활성화
          // position: "fixed",
          // width: "100%",
          padding: "1rem",
          marginLeft:"20rem",
          marginTop:"2rem",
          background: "#f9f9f9",
        }}
      >
        {cars && cars.length > 0 ? (
          <Grid
            container
            columnSpacing={2} // 좌우 간격
            rowSpacing={3} // 상하 간격
          >
            {cars.map((car) => (
              <Grid
                item
                key={car.carId}
                xs={12} // 모바일에서 한 줄에 하나씩
                sm={6} // 태블릿에서 한 줄에 두 개
                md={4} // 데스크톱에서 한 줄에 세 개
                lg={3} // 더 큰 화면에서 한 줄에 네 개
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
