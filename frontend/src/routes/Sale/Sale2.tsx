import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Nav from "../../components/Nav";
import "../MyCarInfo/MyCarinfo.css";
import "../MyCarInfo/CarList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Sale2: React.FC = () => {
  const navigate = useNavigate();
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
  // alert이 이미 표시되었는지 여부를 추적하는 상태
  const [alertShown, setAlertShown] = useState(false);

  // 백엔드에서 차량 목록 조회
  useEffect(() => {
    if (userId) {
      fetchCarList(); // 차량 목록 조회 함수 호출
    }
  }, [userId]);

  // 화면이 렌더링된 후, userCars.length가 0일 때 alert을 띄운다
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userCars.length === 0 && !alertShown) {
        const confirmAction = window.confirm(
          "차량이 없습니다. 차량을 추가하시겠습니까?"
        );
        if (confirmAction) {
          navigate("/mycar"); // 차량 추가 페이지로 이동
        }
        setAlertShown(true); // alert을 표시한 후 상태 업데이트
      }
    }, 100); // ms 후에 로직 실행

    // Cleanup timer on component unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [userCars, alertShown, navigate]); // userCars 또는 alertShown이 변경될 때 실행

  // 차량 목록 조회 함수
  const fetchCarList = () => {
    axios
      .get(`http://localhost:8080/cars/${BigInt(userId)}`)
      .then((response) => {
        setUserCars(response.data.result || []);
        console.log("차량 정보: ", response.data.result);
      })
      .catch((error) => {
        console.error("차량 목록 조회 오류:", error);
      });
  };

  // 판매 등록 버튼
  const handleSaleClick = (carId: BigInt) => {
    console.log("판매 등록 버튼 클릭!!");
    console.log("carId: ", carId);
    navigate(`/sale/${carId}`);
  };

  return (
    <>
      <Nav />
      {userCars.length > 0 ? (
        <div>
          <h2 className="username-container">
            <span className="username-highlight">{username}</span>{" "}
            <span className="username-highlight2">님의 차량 정보</span>
          </h2>
          {userCars.map((car, index) => (
            <div
              key={index}
              className="car-info-container"
              style={{ marginBottom: "1rem" }}
            >
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
                      style={{
                        marginLeft: "1rem",
                        backgroundColor: car.isSale === 1 ? "#d9d9d9" : "", // isSale이 1이면 배경색을 회색으로 설정
                        color: car.isSale === 1 ? "red" : "",
                        cursor: car.isSale === 1 ? "not-allowed" : "pointer", // isSale이 1이면 클릭 불가
                      }}
                      onClick={(e) => {
                        if (car.isSale !== 1) {
                          handleSaleClick(car.carId);
                        } else {
                          e.preventDefault(); // 클릭 이벤트 막기
                        }
                      }}
                      disabled={car.isSale === 1} // isSale이 1이면 버튼 비활성화
                    >
                      {/* isSale이 1이면 "판매 중", 아니면 "판매 등록" */}
                      {car.isSale === 1 ? "판매 중" : "판매 등록"}{" "}
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

                  <p
                    className="info-row"
                    style={{ marginTop: "10px", marginBottom: "5px" }}
                  >
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
            <button className="add-car-button">차량 추가</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sale2;
