import React, { useEffect, useState } from "react";

import Nav from "../../components/Nav";
import "./UserInfoModify.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

interface UserInfo {
  userId: bigint | null;
  nickname: string;
  phoneNumber: string;
  address: string;
}

const UserInfoModify: React.FC = () => {
  // 컴포넌트 최상위에서 useParams 호출
  const { userId } = useParams<{ userId: string }>(); // URL에서 userId를 가져옵니다.

  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: null,
    nickname: "",
    phoneNumber: "",
    address: "",
  });

  // useEffect는 userId가 바뀔 때마다 실행되도록 설정합니다.
  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        try {
          // URL 파라미터로 받은 userId를 bigint로 변환해서 API 호출
          const response = await axios.get(
            `http://localhost:8080/users/${BigInt(userId)}`
          );
          setUserInfo(response.data); // 응답 받은 데이터를 상태에 저장
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo(); // userId가 있을 때만 데이터를 가져옵니다.
    }
  }, [userId]); // userId가 변경될 때마다 다시 호출됩니다.

  const handleWithdrawButtonClick = () => {
    // 여기에 회원 탈퇴 기능 구현
    console.log("회원 탈퇴 버튼 클릭됨!");
    // 예시:
    // - 회원 탈퇴 확인 다이얼로그 띄우기
    // - 백엔드 서버로 회원 탈퇴 요청 보내기 (API 호출)
    // - 사용자 세션 및 데이터 삭제
    // - 로그인 페이지로 이동
  };

  const handleCancleButtonClick = () => {
    // 여기에 취소 기능 구현
    console.log("취소 버튼 클릭됨!");
    // 예시:
    // - 백엔드 서버로 회원 탈퇴 요청 보내기 (API 호출)
    // - 사용자 세션 및 데이터 삭제
    // - 로그인 페이지로 이동
  };

  const handleChangeButtonClick = () => {
    // 여기에 저장 기능 구현
    console.log("취소 버튼 클릭됨!");
    // 예시:
    // - 백엔드 서버로 회원 탈퇴 요청 보내기 (API 호출)
    // - 사용자 세션 및 데이터 삭제
    // - 로그인 페이지로 이동
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 여기에 실제 서버에 데이터를 전송하는 로직 추가
    console.log("Submit:", userInfo);
    console.log("저장 버튼 클릭됨!");
  };
  return (
    <>
      <Nav />
      <div className="userinfomodifycontainer">
        <div className="user-info-edit">
          <h3>회원정보 수정</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="userId"
                placeholder={
                  userInfo.nickname ? String(userInfo.nickname) : "User"
                }
                value={userInfo.nickname}
                onChange={handleChange}
                style={{ width: "100px" }}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="‘-’ 생략하여 입력"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                style={{ width: "250px" }}
              />
            </div>
            <div>
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="상세 주소를 입력"
                value={userInfo.address}
                onChange={handleChange}
                style={{ width: "250px" }}
              />
            </div>
            <div className="userinfomodify-button-container">
              <button type="button" onClick={handleCancleButtonClick}>
                취소
              </button>
              <button type="submit" onClick={handleChangeButtonClick}>
                저장
              </button>
            </div>
          </form>
        </div>
        <div className="userinfomodify-button-container2">
          <button
            type="button"
            className="delete-button"
            onClick={handleWithdrawButtonClick}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfoModify;
