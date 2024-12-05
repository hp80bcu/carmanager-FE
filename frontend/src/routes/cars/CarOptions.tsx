import React from "react";
import { categories } from "./categories";

type CarOptionsProps = {
  options: string | null;
};

const CarOptions: React.FC<CarOptionsProps> = ({ options }) => {
  if (!options) return null; // options가 없는 경우 아무것도 렌더링하지 않음

  const responseOptions = options.replace('[', '') // 배열의 시작 부분을 제거
  .replace(']', '') // 배열의 끝 부분을 제거
  .split(',') // 쉼표로 분리하여 배열로 변환
  .map(option => option.trim());
  const matchedOptions: { name: string; image: string; }[] = [];
  categories.forEach((category) => {
    category.options.forEach((option) => {
      if (responseOptions.includes(option.name)) {
        matchedOptions.push(option);
      }
    });
  });

  const displayOptions = matchedOptions.slice(0, 10); // 최대 5개만 표시

  return (
    <div className="car-options-section">
      <h2>주요 옵션</h2>
      <div className="options-container">
        {displayOptions.map((option, index) => (
          <div key={index} className="option-item">
            <img
              src={option.image}
              alt={option.name}
              className="option-image"
            />
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarOptions;
