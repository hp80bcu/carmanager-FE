import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarketPriceModal.css";

type MarketPrice = {
  avgPrice: number;
  highPrice: number;
  lowPrice: number;
};

type MarketPriceModalProps = {
  isOpen: boolean;
  carModel: string;
  onClose: () => void;
};

const MarketPriceModal: React.FC<MarketPriceModalProps> = ({
  isOpen,
  carModel,
  onClose,
}) => {
  const [marketPrice, setMarketPrice] = useState<MarketPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMarketPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/sells/comparison-price/${carModel}`
      );
      setMarketPrice(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching market price:", error);
    } finally {
      setLoading(false);
    }
  };

  // 모달이 열릴 때 자동으로 데이터 요청
  useEffect(() => {
    if (isOpen) {
      fetchMarketPrice();
    }
  }, [isOpen]);

  // 모달 닫기 및 초기화
  const handleClose = () => {
    setMarketPrice(null);
    onClose();
  };

  // 조건부 렌더링에서 null 반환
  if (!isOpen) {
    return null; // isOpen이 false일 때 null 반환
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>시세 확인</h2>
          <button className="close-button" onClick={handleClose}>
            닫기
          </button>
        </div>

        <div className="market-price-item">
          <div className="price-label">
            <span className="high-price">최고가</span>
            <img src="../Image/higharrow.png"></img>
          </div>
          <span className="high-price">{Number(marketPrice?.highPrice).toLocaleString()} 만원</span>
        </div>

        <div className="market-price-item">
          <div className="price-label">
            <span className="avg-price">평균가</span>
            <img src="../Image/avgarrow.png" style={{width:"25px", marginLeft:"5px"}}></img>
          </div>
          <span className="avg-price">{Number(marketPrice?.avgPrice).toLocaleString()} 만원</span>
        </div>

        <div className="market-price-item">
          <div className="price-label">
            <span className="low-price">최저가</span>
            <img src="../Image/lowarrow.png"></img>
          </div>
          <span className="low-price">{Number(marketPrice?.lowPrice).toLocaleString()} 만원</span>
        </div>
      </div>
    </div>
  );
};

export default MarketPriceModal;
