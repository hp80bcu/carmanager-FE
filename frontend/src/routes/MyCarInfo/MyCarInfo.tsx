import React, { useState } from "react";

import Nav from "../../components/Nav";
import CarAddPopup from "./CarAddPopup";
import CarAddPopup_1 from "./CarAddPopup_1";
import CarAddPopup_2 from "./CarAddPopup_2";
import "./MyCarinfo.css";

const MyCarInfo: React.FC = () => {
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);

  const handleOpenFirstPopup = () => setIsFirstPopupOpen(true);
  const handleCloseFirstPopup = () => setIsFirstPopupOpen(false);

  const handleOpenSecondPopup = () => {
    setIsSecondPopupOpen(true);
    setIsFirstPopupOpen(false); // 첫 번째 팝업 닫기
  };
  const handleCloseSecondPopup = () => setIsSecondPopupOpen(false);

  const handleOpenThirdPopup = () => {
    setIsThirdPopupOpen(true);
    setIsSecondPopupOpen(false); // 두 번째 팝업 닫기
  };
  const handleCloseThirdPopup = () => setIsThirdPopupOpen(false);

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
      {isFirstPopupOpen && (
        <CarAddPopup
          onClose={handleCloseFirstPopup}
          onOpenNext={handleOpenSecondPopup}
        />
      )}

      {isSecondPopupOpen && (
        <CarAddPopup_1
          onClose={handleCloseSecondPopup}
          onReopenFirstPopup={handleOpenFirstPopup}
          onOpenThirdPopup={handleOpenThirdPopup}
        />
      )}

      {isThirdPopupOpen && (
        <CarAddPopup_2
          onClose={handleCloseThirdPopup}
          onReopenFirstPopup={handleOpenFirstPopup}
        />
      )}
    </>
  );
};

export default MyCarInfo;
