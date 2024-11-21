import React, { useEffect, useState } from "react";

import Nav from "../../components/Nav";
import "./UserInfoModify.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserInfo {
  userId: bigint | null;
  username: string;
  phoneNumber: string;
  address: string;
}

const UserInfoModify: React.FC = () => {
  const navigate = useNavigate();
  // 컴포넌트 최상위에서 useParams 호출
  const { userId } = useParams<{ userId: string }>(); // URL에서 userId를 가져옵니다.

  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: null,
    username: "",
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
          setUserInfo(response.data.result); // 응답 받은 데이터를 상태에 저장
          console.log(response.data.result.username);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo(); // userId가 있을 때만 데이터를 가져옵니다.
    }
  }, [userId]); // userId가 변경될 때마다 다시 호출됩니다.

  // 회원 탈퇴 기능
  const handleWithdrawButtonClick = async () => {
    try {
      if (userId) {
        await axios.delete(`http://localhost:8080/users/${BigInt(userId)}`);
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/"); // root 화면으로 이동
      } else {
        alert("사용자 ID가 없습니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  // 취소 버튼 클릭 시 홈 화면으로 이동
  const handleCancleButtonClick = () => {
    navigate("/");
  };

  // 사용자 정보 변경 후 서버에 저장
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoading) {
      console.warn("이미 처리 중입니다.");
      return; // 로딩 중이면 중복 실행 방지
    }

    if (!userInfo.username || !userInfo.phoneNumber || !userInfo.address) {
      alert("입력된 닉네임, 전화번호, 주소가 없습니다.");
      return;
    }

    setIsLoading(true); // 로딩 시작
    try {
      console.log(userInfo)
      const response = await axios.put(
        `http://localhost:8080/users/${userInfo.userId}`,
        userInfo
      );
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
      alert("회원 정보 수정에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <Nav />
      <div className="userinfomodifycontainer">
        <div className="user-info-edit">
          <h3>회원정보 수정</h3>
          <form>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="userId"
                placeholder={
                  userInfo.username ? String(userInfo.username) : "닉네임"
                }
                value={userInfo.username}
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
              <button type="submit" onClick={handleSubmit}>
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
