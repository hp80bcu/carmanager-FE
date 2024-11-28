import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Nav from "../../components/Nav";
import CarAddPopup from "./CarAddPopup";
import CarAddPopup_1 from "./CarAddPopup_1";
import "./MyCarinfo.css";
import "./CarList.css";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
  const { userId, username } = location.state || {};

  // 백엔드에서 차량 목록 조회
  useEffect(() => {
    if (userId) {
      fetchCarList(); // 차량 목록 조회 함수 호출
    }
  }, [userId]);

  // 차량 목록 조회 함수
  const fetchCarList = () => {
    axios
      .get(`http://localhost:8080/cars/${BigInt(userId)}`)
      .then((response) => {
        setUserCars(response.data.result || []);
      })
      .catch((error) => {
        console.error("차량 목록 조회 오류:", error);
      });
  };

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
    setCarInfo({ carNumber, company, model, detail, image });
    setIsSecondPopupOpen(true);
    setIsFirstPopupOpen(false);
  };

  const handleCloseSecondPopup = () => {
    setIsSecondPopupOpen(false);
    fetchCarList(); // 두 번째 팝업 닫을 때 차량 목록 갱신
  };

  return (
    <>
      <Nav />
      {userCars.length > 0 ? (
        <div>
          <div className="button-container">
            <button className="add-car-button2" onClick={handleOpenFirstPopup}>
              차량 추가
            </button>
          </div>
          <h2 className="username-container">
            <span className="username-highlight">{username}</span>{" "}
            <span className="username-highlight2">님의 차량 정보</span>
          </h2>
          {userCars.map((car, index) => (
            <div key={index} className="car-info-container">
              <div className="car-info-rowcontainer">
                <div className="car-info-left">
                  <p style={{ fontSize: "18px" }}>{car.company}</p>
                  <p style={{ fontWeight: "bold", fontSize: "30px" }}>
                    {car.model}
                  </p>
                  <p style={{ fontSize: "23px", color: "#7A7A7A" }}>
                    {car.modelDetail}
                  </p>
                  <p>
                    <span className="orange-bold-style">
                      {car.date.split("-")[0]}
                    </span>
                    {"년형"} | {"주행거리"}
                    <span className="orange-bold-style">
                      {Number(car.distance).toLocaleString()}km
                    </span>{" "}
                    | <span className="orange-bold-style">{car.color}</span>
                  </p>
                  <div style={{ marginTop: "40px" }}>
                    <button
                      className="add-car-button2"
                      onClick={() => console.log("정비 이력 버튼 클릭!!")}
                    >
                      정비 이력
                    </button>
                  </div>
                </div>
                <div className="car-info-center">
                  <p className="info-row">
                    <span>최초등록일</span>{" "}
                    <span className="orange-bold-style">
                      {dayjs(car.firstRegisterDate).format("YYYY년 MM월 DD일")}
                    </span>
                  </p>

                  <div className="row-hipen-style"></div>

                  <p className="info-row">
                    <span>배기량</span>{" "}
                    <span className="orange-bold-style">
                      {Number(car.displacement).toLocaleString()} cc
                    </span>
                  </p>

                  <div className="row-hipen-style"></div>

                  <p className="info-row">
                    <span>연료</span>{" "}
                    <span className="orange-bold-style">{car.fuel}</span>
                  </p>

                  <div className="row-hipen-style"></div>

                  <p className="info-row" style={{ marginTop: "10px", marginBottom: "5px" }}>
                    <span>변속기</span>{" "}
                    <span className="orange-bold-style">{car.shift}</span>
                  </p>
                </div>
                <div className="car-info-right">
                  <img src={car.image} alt="Car" />
                </div>
                <div>
                  <button
                    className="car-info-trashbutton"
                    onClick={() => console.log("삭제 버튼 클릭!!")}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
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
        </div>
      )}

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
          {...carInfo}
          userId={userId}
        />
      )}
    </>
  );
};

export default MyCarInfo;
