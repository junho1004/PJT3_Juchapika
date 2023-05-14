import React from "react";
import styles from "./MessageFine.module.css";
// import { useNavigate } from "react-router-dom";
import car from "../../../assets/car1.png";
import { useState } from "react";
// import { useLocation } from "react-router-dom";
import MessagePayhistory from "./MessagePayhistory";
import { useEffect } from "react";
import axios from "axios";
import hamburger from "../../../assets/hamburger.png";
// import { useState, useEffect } from "react";

export default function MessageFine() {
  const [payhistory, setpayhistory] = useState(false);
  const [detail, setdetail] = useState([]);
  const [modal, setmodal] = useState(false);

  useEffect(() => {
    const carNum1 = {
      carNum: "331우7799",
    };
    axios
      .post("http://localhost:8081/api/record/search-by-carnum", carNum1)
      .then((res) => {
        console.log(res.data.responseData);
        setdetail(res.data.responseData);
        // return
      })
      .catch((error) => {
        console.log(error);
      });
    // callall()
  }, [detail]);

  const openside = () => {
    setmodal(!modal);
  };
  const closeModal = () => {
    setmodal(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.nav}>
        <div style={{ width: "90%", position: "absolute", zIndex:"5" }}>
          <img src={hamburger} alt="error" width="12%" onClick={openside} />
        </div>
        {(!payhistory && (
          <div
            style={{ width: "80%", position: "relative", textAlign: "center" }}
          >
            
            주정차위반과태료
          </div>
        )) || (
          <div
            style={{ width: "80%", position: "relative", textAlign: "center" }}
          >
            
            납부내역
          </div>
        )}
      </div>

      {modal && (
        <div className={styles.container}>
          <div className={styles.mininav}>
            <div className={styles.content}>
              <div>
                <div style={{ fontWeight: "700", fontSize: "1.8em" }}>
                  차넘버
                </div>
                <div style={{ marginTop: "5px" }}>차량소유자: 정주영</div>
              </div>
              <hr style={{ marginTop: "10%", width: "100%" }}></hr>
            </div>
            <div
              onClick={() => {
                setpayhistory(false);
                closeModal();
              }}
              className={`${styles.content1} ${!payhistory && styles.bold}`}
            >
              주정차위반과태료
            </div>
            <div
              className={`${styles.content1} ${payhistory && styles.bold}`}
              onClick={() => {
                setpayhistory(true);
                closeModal();
              }}
            >
              납부이력
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
      <div className={styles.body}>
        {payhistory ? (
          <div className={styles.area}>
            <MessagePayhistory />
          </div>
        ) : (
          <div className={styles.area}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "1.3em",
                paddingBottom: "5%",
              }}
            >
              납세자 정보
            </div>
            <div className={styles.a}>
              <div className={styles.img}>
                <img src={car} alt="go" width="100%" height="100%" />
              </div>
              <div className={styles.b0}>
                <div className={styles.c}>
                  <div style={{ paddingBottom: "5px" }}>납세자</div>
                  <div style={{ paddingBottom: "5px" }}>전화번호</div>
                  <div style={{ paddingBottom: "5px" }}>주소</div>
                </div>
                <div className={styles.c1}>
                  <div style={{ paddingBottom: "5px" }}>정우영</div>
                  <div style={{ paddingBottom: "5px" }}>010-1234-5678</div>
                  <div style={{ paddingBottom: "5px" }}>
                    함경북도 함흥시 냉면로 665-1
                  </div>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "10%", paddingBottom: "2%" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "1.3em",
                  paddingBottom: "5%",
                }}
              >
                부과내역
              </div>
              <div className={styles.f}>
                <div className={styles.g}>
                  <div className={styles.g1}>납부기한</div>
                  <div className={styles.g2}>2023/08/05</div>
                </div>
                <div className={styles.money}>
                  <div className={styles.g51}>
                    <div className={styles.g3} style={{ fontWeight: "600" }}>
                      과목
                    </div>
                    <div className={styles.g4} style={{ fontWeight: "600" }}>
                      납기내금액
                    </div>
                  </div>
                  <hr style={{ width: "90%" }}></hr>

                  <div className={styles.g5}>
                    <div className={styles.g3}>과태료</div>
                    <div className={styles.g4}>40,000</div>
                  </div>
                  <div className={styles.g5}>
                    <div className={styles.g3}>가산금</div>
                    <div className={styles.g4}>0</div>
                  </div>
                  <div className={styles.g5}>
                    <div className={styles.g3}>합계금액</div>
                    <div className={styles.g4}>40,000</div>
                  </div>
                </div>

                <div className={styles.g}>
                  <div className={styles.g1}>적발일시</div>
                  <div className={styles.g2}>2023/05/04</div>
                </div>
                <div className={styles.g}>
                  <div className={styles.g1}>적발장소</div>
                  <div className={styles.g2}>주소적어야함</div>
                </div>

                <div className={styles.g}>
                  <div className={styles.g1}>법조항</div>
                  <div className={styles.g2}>도로교통법 제 32-34조</div>
                </div>
                <div className={styles.g}>
                  <div className={styles.g1}>고지번호</div>
                  <div className={styles.g2}>202011101633</div>
                </div>
              </div>

              <div className={styles.h}>
                <div
                  style={{
                    width: "80%",
                    fontWeight: "600",
                    marginBottom: "2%",
                  }}
                >
                  가상계좌번호(납기내)
                </div>
                <div style={{ textAlign: "right", letterSpacing: "1px" }}>
                  농협) 352-4985-9845
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
