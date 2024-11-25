import React, { useEffect, useState } from "react";
import CarCard from '../cars/CarCard';
import { CarData } from '../cars/CarData';
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/Searchbar/Searchbar";
import axios from 'axios';


const SearchPage = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCars, setTotalCars] = useState<number>(0);

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(`/api/cars?search=${searchTerm}`);
      setCars(response.data.cars);
      setTotalCars(response.data.totalCars); // 서버에서 총 차량 갯수를 받아서 설정
    } catch (error) {
      console.error('차량 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sells/");
        // setCars(response.data.cars);
        console.log(response.data.result);
        setTotalCars(response.data.result[0].howManyCar); // 서버에서 총 차량 갯수를 받아서 설정
      } catch (error) {
        console.error("Error fetching car data:", error);
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
      <div>
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;