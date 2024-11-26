import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import CarAddPopup from "./CarAddPopup";
import CarAddPopup_1 from "./CarAddPopup_1";
import "./MyCarinfo.css";
import { useLocation } from "react-router-dom";

const MyCarInfo: React.FC = () => {
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  // 차량 정보 상태 관리
  const [carInfo, setCarInfo] = useState({
    carNumber: "",
    company: "",
    model: "",
    detail: "",
    image: "",
  });
  // 차량 목록 상태
  const [userCars, setUserCars] = useState<any[]>([]);
  const location = useLocation();
  const { userId } = location.state || {};

  // 백엔드에서 차량 목록을 조회
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/cars/${BigInt(userId)}`)  // 차량 목록 API 호출
        .then((response) => {
          setUserCars(response.data.cars || []); // 차량 리스트 상태 업데이트
          console.log(response.data.result.length);
          console.log(response.data.result);
        })
        .catch((error) => {
          console.error("차량 목록 조회 오류:", error);
        });
    }
  }, [userId]);

  
  // 첫 번째 팝업 열기/닫기
  const handleOpenFirstPopup = () => setIsFirstPopupOpen(true);
  const handleCloseFirstPopup = () => setIsFirstPopupOpen(false);

  // 두 번째 팝업 열기/닫기
  const handleOpenSecondPopup = (
    carNumber: string,
    company: string,
    model: string,
    detail: string,
    image: string
  ) => {
    setCarInfo({ carNumber, company, model, detail, image }); // 차량 정보 저장
    setIsSecondPopupOpen(true);
    setIsFirstPopupOpen(false); // 첫 번째 팝업 닫기
  };
  const handleCloseSecondPopup = () => setIsSecondPopupOpen(false);

  return (
    <>
      <Nav />
      <h2>내 차 관리</h2>
      <div className="my-car-container">
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          내 차 관리는 차매니저에서!
        </p>
        <p style={{ color: "#7A7A7A" }}>
          차량을 추가하시면 다양한 정보를 한 눈에 볼 수 있습니다.
        </p>
        <button className="add-car-button" onClick={handleOpenFirstPopup}>
          차량 추가
        </button>
      </div>
      {/* 첫 번째 팝업 */}
      {isFirstPopupOpen && (
        <CarAddPopup
          onClose={handleCloseFirstPopup}
          onOpenNext={handleOpenSecondPopup}
          userId={userId}
        />
      )}
      {/* 두 번째 팝업 */}
      {isSecondPopupOpen && (
        <CarAddPopup_1
          onClose={handleCloseSecondPopup}
          onReopenFirstPopup={handleOpenFirstPopup}
          carNumber={carInfo.carNumber}
          company={carInfo.company} // 차량 정보 전달
          model={carInfo.model}
          detail={carInfo.detail}
          image={carInfo.image}
          userId={userId}
        />
      )}
    </>
  );
};

export default MyCarInfo;
