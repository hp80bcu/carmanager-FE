import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./MaintenanceModal.css";

interface MaintenanceRecord {
  carNum: string;
  maintanceCompany: string; // 정비업체
  maintanceDate: string; // 일시
  performanceCheckDistance: string;
  content: string; // 작업내역
}

interface MaintenanceModalProps {
  carId: BigInt;
  carNum: string;
  isOpen: boolean;
  onClose: () => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  carId,
  carNum,
  isOpen,
  onClose,
}) => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<
    MaintenanceRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  console.log("정비 이력:", maintenanceRecords);
  console.log(carId);
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);

      // API 호출로 정비 이력 가져오기
      axios
        .get(`/cars/${carId}/maintance`)
        .then((response) => {
          setMaintenanceRecords(response.data.result || []);
          console.log(response.data.result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("정비 이력 조회 실패:", error);
          setHasError(true);
          setIsLoading(false);
        });
    }
  }, [isOpen, carId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
        <h2>
          <span style={{ color: "#0095FF" }}>{carNum}</span> 정비 이력
        </h2>

        {isLoading ? (
          <p>로딩 중...</p>
        ) : hasError ? (
          <p>정비 이력을 가져오는 중 오류가 발생했습니다.</p>
        ) : maintenanceRecords.length > 0 ? (
          <>
            <table className="maintenance-table">
              <thead>
                <tr>
                  <th>일시</th>
                  <th>정비업체</th>
                  <th>출고일자</th>
                  <th>주행거리</th>
                  <th>작업내역</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td>
                      {record.maintanceDate
                        ? dayjs(record.maintanceDate).format("YY/M/D")
                        : "정보 없음"}
                    </td>
                    <td>{record.maintanceCompany || "정보 없음"}</td>
                    <td>
                      {record.maintanceDate
                        ? dayjs(record.maintanceDate).format("YY/M/D")
                        : "정보 없음"}
                    </td>
                    <td>
                      {record.performanceCheckDistance !== undefined
                        ? record.performanceCheckDistance.toLocaleString() +
                          " km"
                        : "정보 없음"}
                    </td>
                    <td>{record.content || "정보 없음"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {maintenanceRecords.length >= 1 && ( // 예시로 10개 미만이면 표시
              <div className="ellipsis">. . .</div>
            )}
          </>
        ) : (
          <p>정비 이력이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceModal;
