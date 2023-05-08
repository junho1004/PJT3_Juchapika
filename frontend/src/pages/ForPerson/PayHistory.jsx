import React from "react";
import styles from "./PayHistory.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

export default function PayHistory() {
    const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <div className={styles.nav}>
        <div>납부이력</div>
      </div>
      <div className={styles.body}>
        <div className={styles.mininav}>
            <div className={styles.content1}>
                <div className={styles.center}>

          <div style={{fontWeight:"700",fontSize:"1.8em"}}>231 가 2475</div>
          <div>차량소유자: 정우영</div>
                </div>
          <hr style={{marginTop:"30px",width:"100%"}}></hr>
            </div>
          <div 
           onClick={() => {
            navigate("/feeletter");
          }}
          className={styles.content}>
            주정차위반과태료
            </div>
            <div className={styles.content}
            style={{fontWeight:"800"}}
            onClick={() => {
                navigate("/payhistory");
              }
              }>
            납부이력
            </div>
        </div>
        <div className={styles.area} >
            <div>여기는 리스트로 할것임</div>
        </div>
      </div>
    </div>
  );
}
