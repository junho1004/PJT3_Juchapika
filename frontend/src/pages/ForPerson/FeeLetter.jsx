import React from "react";
import styles from "./FeeLetter.module.css";
import { useNavigate } from "react-router-dom";
import car from "../../assets/car1.png";
import carlicense from "../../assets/car1license.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Payhistory from "./PayHistory";
import { useEffect} from "react";
import axios from "axios";
// import { useState, useEffect } from "react";

export default function Feeletter() {
  let navigate = useNavigate();
  const location = useLocation();
  const { data1, data2 } = location.state; ///enrollmentcar에서 받아온 carnum 임!!
  let carnum = data1
  let id = data2
  const [payhistory, setpayhistory] = useState(false);
  const [detail, setdetail] = useState([]);
  const sessionStorage = window.sessionStorage;
  // let [name, setName] = useState(null);

  useEffect(() => {
////////////////여기 recordid로 찾아야함 carnum으로 찾으면 기록이 너무 많음
    const carNum1 = {
      carNum: "331우7799",
    };
    let token = sessionStorage.getItem("token")
    axios
      .post("http://localhost:8081/api/record/search-by-carnum", carNum1,
      {
        headers: {
          Authorization: `Bearer ${token}`,
  },
      })
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
  
  // const navigate = useNavigate();
  

  return (
    <div className={styles.background}>
      <div className={styles.nav}>
        <div>주정차위반과태료</div>
      </div>
      <div className={styles.body}>
        <div className={styles.mininav}>
          <div className={styles.content1}>
            <div className={styles.center}>
              <div style={{ fontWeight: "700", fontSize: "1.8em" }}>{id}{carnum}</div>
              <div style={{ marginTop: "5px" }}>차량소유자: 정주영</div>
            </div>
            <hr style={{ marginTop: "30px", width: "100%" }}></hr>
          </div>
          <div
            onClick={() => {
              setpayhistory(false);
            }}
            className={styles.content}
          >
            주정차위반과태료
          </div>
          <div
            className={styles.content}
            onClick={() => {
              setpayhistory(true);
            }}
          >
            납부이력
          </div>
          <div
            className={styles.btn1}
            onClick={() => {
              navigate("/enrollmentcar", { state: { data1: carnum , data2: id } });
            }}
            // 확인하고 다시 carnum를 enrollment로 보내줘서 input 페이지가 다시 넘어가도 유지되게함
          >
            고지서 확인완료
          </div>
        </div>

        {payhistory ? (
          <div className={styles.area}>
            <Payhistory />
          </div>
        ) : (
          <div className={styles.area}>
            <div style={{ fontWeight: "600", fontSize: "1.1em" }}>
              납세자 정보
            </div>
            <div className={styles.a}>
              <div className={styles.img}>
                <img src={car} alt="go" width="250px" height="200px" />
              </div>
              <div className={styles.b0}>
                <div className={styles.b}>
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
                <div className={styles.d}>
                  <div>번호판</div>
                  <div style={{ paddingLeft: "90px" }}>
                    <img
                      src={carlicense}
                      alt="go"
                      width="150px"
                      height="50px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "600", fontSize: "1.1em" }}>부과내역</div>
            <div className={styles.f}>
              <div className={styles.g}>
                <div className={styles.f}>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>납부기한</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>2023/08/05</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>과목</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>납기내금액</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>과태료</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>40,000</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>가산금</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>0</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>합계금액</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>40,000</div>
                  </div>
                </div>
                <div className={styles.f}>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>적발일시</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>2023/05/04</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>적발장소</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>주소적어야함</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>법조항</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>도로교통법 제 32-34조</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>고지번호</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "100px" }}>202011101633</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.h}>
              <div className={styles.h1}>
                <div>가상계좌번호(납기내)</div>
                <div className={styles.empty}></div>
                <div>농협) 352-4985-9845</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
