import React from "react";
// import axios from "axios";
import { useEffect } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./EnrollmentCar.module.css";

export default function VideoStorage() {
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.background}>
      <TopNav />
      <div className={styles.body}>
        <div className={styles.starts}>
          <div style={{ fontSize: "1.5em", fontWeight: "600" }}>영상리스트</div>
          <div style={{ padding: "5% 0% 5% 0%" }}>
            <div className={styles.center}>
              <div>오늘({getDate()})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
