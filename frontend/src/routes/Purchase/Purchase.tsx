import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CarCard from "../cars/CarCard";
import { CarData } from "../cars/CarData";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/Searchbar/Searchbar";
import { Grid, Typography } from "@mui/material";

const Purchase = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const location = useLocation(); // URL의 쿼리 파라미터를 읽기 위해 추가
  const [sortOption, setSortOption] = useState<string>(""); // 정렬 기준
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 오름차순/내림차순 상태

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

  // 차량 정렬 함수
  const sortCars = (cars: CarData[], option: string, order: "asc" | "desc") => {
    switch (option) {
      case "price":
        return [...cars].sort(
          (a, b) =>
            (parseFloat(a.price) - parseFloat(b.price)) *
            (order === "asc" ? 1 : -1)
        ); // 가격
      case "year":
        return [...cars].sort(
          (a, b) =>
            (parseInt(a.year) - parseInt(b.year)) * (order === "asc" ? 1 : -1)
        ); // 연식
      case "distance":
        return [...cars].sort(
          (a, b) =>
            (parseInt(a.distance) - parseInt(b.distance)) *
            (order === "asc" ? 1 : -1)
        ); // 주행거리
      case "registDate":
        return [...cars].sort(
          (a, b) =>
            (new Date(a.registDate).getTime() -
              new Date(b.registDate).getTime()) *
            (order === "asc" ? 1 : -1)
        ); // 최신 등록일
      default:
        return cars;
    }
  };

  // 정렬 기준과 방향을 토글하는 함수
  const handleSortChange = (option: string) => {
    if (sortOption === option) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // 이미 선택한 항목을 클릭하면 오름차순/내림차순 토글
    } else {
      setSortOption(option);
      setSortOrder("asc"); // 새로운 항목을 선택하면 기본적으로 오름차순으로 설정
    }
  };

  // 정렬된 차량 리스트
  const sortedCars = sortCars(cars, sortOption, sortOrder);

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
          marginLeft: "20rem",
          marginTop: "2rem",
          // background: "#f9f9f9",
        }}
      >
        {/* 정렬 기준 텍스트 클릭 */}
        <div className="saletitle-container">
          <h1>매물</h1>
          <div className="sort-container">
            <Typography
              variant="body1"
              component="span"
              onClick={() => handleSortChange("registDate")}
            >
              최신 등록일{" "}
              {sortOption === "registDate"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              onClick={() => handleSortChange("price")}
            >
              가격{" "}
              {sortOption === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              onClick={() => handleSortChange("distance")}
            >
              주행거리{" "}
              {sortOption === "distance"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              onClick={() => handleSortChange("year")}
            >
              연식{" "}
              {sortOption === "year" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </Typography>
          </div>
        </div>

        <div className="row-hipen-style"></div>

        {sortedCars && sortedCars.length > 0 ? (
          <Grid container columnSpacing={2} rowSpacing={3}>
            {sortedCars.map((car) => (
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
          <Typography variant="body1" align="left">
            등록된 차량이 없습니다.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Purchase;
