import React, { useState } from "react";

import Nav from "../../components/Nav";
import CarAddPopup from "./CarAddPopup";
import CarAddPopup_1 from "./CarAddPopup_1";
import CarAddPopup_2 from "./CarAddPopup_2";
import "./MyCarinfo.css";
import { useLocation } from "react-router-dom";

const MyCarInfo: React.FC = () => {
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  // const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);
  
  
  // console.log("userId 가져오기: ", userId);

  // 차량 정보 상태 관리
  const [carInfo, setCarInfo] = useState({
    company: "",
    model: "",
    detail: "",
    image: "",
  });

  // 첫 번째 팝업 열기/닫기
  const handleOpenFirstPopup = () => setIsFirstPopupOpen(true);
  const handleCloseFirstPopup = () => setIsFirstPopupOpen(false);

  // 두 번째 팝업 열기/닫기
  const handleOpenSecondPopup = (
    company: string,
    model: string,
    detail: string,
    image: string
  ) => {
    setCarInfo({ company, model, detail, image }); // 차량 정보 저장
    setIsSecondPopupOpen(true);
    setIsFirstPopupOpen(false); // 첫 번째 팝업 닫기
  };
  const handleCloseSecondPopup = () => setIsSecondPopupOpen(false);

  // 세 번째 팝업 열기/닫기
  // const handleOpenThirdPopup = () => {
  //   setIsThirdPopupOpen(true);
  //   setIsSecondPopupOpen(false); // 두 번째 팝업 닫기
  // };
  // const handleCloseThirdPopup = () => setIsThirdPopupOpen(false);

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
        />
      )}
      {/* 두 번째 팝업 */}
      {isSecondPopupOpen && (
        <CarAddPopup_1
        onClose={handleCloseSecondPopup}
        onReopenFirstPopup={handleOpenFirstPopup}
        // onOpenThirdPopup={handleOpenThirdPopup}
        company={carInfo.company} // 차량 정보 전달
        model={carInfo.model}
        detail={carInfo.detail}
        image={carInfo.image}
      />
      )}
      {/* 세 번째 팝업 */}
      {/* {isThirdPopupOpen && (
        <CarAddPopup_2
          onClose={handleCloseThirdPopup}
          onReopenFirstPopup={handleOpenFirstPopup}
        />
      )} */}
    </>
  );
};

export default MyCarInfo;
