import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CarData } from '../cars/CarData';


const CarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState<CarData | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('차량 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchCar();
  }, [carId]);

  return (
    <div>
      {car ? (
        <>
          <h2>{car.name}</h2>
          {/* ... 다른 상세 정보 */}
        </>
      ) : (
        <p>차량 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default CarDetail;