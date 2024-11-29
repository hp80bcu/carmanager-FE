import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideNav.css"; // CSS 파일
import "./Custom-Link.css";
import axios from "axios";

const SideNav: React.FC = () => {
  const [userId, setUserId] = useState<bigint | null>(null);
  
  const navigate = useNavigate();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = getCookie("Authorization");
      console.log("액세스 토큰: " + accessToken);

      if (accessToken) {
        try {
          const response = await axios.get("/users/userinfo", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserId(response.data.userId);

          console.log("SideNav Fetched User ID : ", response.data.userId); // User ID 확인용 로그
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  //판매화면 이동시 userId 존재 유무
  const handleSaleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // 페이지 이동 방지
    if (userId) {
      navigate(`/sale`, { state: { userId: userId || null } });
    } else {
      // userId가 존재하지 않는 경우
      alert('로그인 후 이용해주세요.');
    }
  };

  return (
    <nav className="side-navigation">
      <ul>
        <div className="">
          <Link to={"/"}>
            <img src="/Image/logo.png" height="80" alt="로고"></img>
          </Link>
        </div>
      </ul>

      <ul>
        <div className="items">
          <Link to={"/searchpage"} className="custom-link">
            검색
          </Link>
        </div>
      </ul>

      <ul>
        <div className="items">
          <Link to={"/purchase"} className="custom-link">
            구매
          </Link>
        </div>
      </ul>

      <ul>
        <div className="items">
          <Link to={"/sale"} className="custom-link" onClick={handleSaleClick}>
            판매
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default SideNav;
