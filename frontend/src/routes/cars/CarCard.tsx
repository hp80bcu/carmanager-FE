import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CarData } from '../cars/CarData';

interface CarCardProps extends CarData {
  // 추가적인 props를 정의할 수 있습니다.
}

const CarCard: React.FC<CarCardProps> = ({ id, name, imageUrl, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars/${id}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{price}만원</p>
      {/* ... 다른 정보 */}
    </div>
  );
};

export default CarCard;