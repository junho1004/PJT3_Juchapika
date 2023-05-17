import React from "react";
import styles from "./FeeLetter.module.css";
import { useNavigate } from "react-router-dom";
// import car from "../../assets/car1.png";
// import carlicense from "../../assets/car1license.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Payhistory from "./PayHistory";
import { useEffect } from "react";
import axios from "axios";
// import moment from 'moment';
// import { useState, useEffect } from "react";

export default function Feeletter() {
  let navigate = useNavigate();
  const location = useLocation();
  const { data1, data2 } = location.state; ///enrollmentcar에서 받아온 carnum 임!!
  let carnum = data1;
  let id = data2;
  const [payhistory, setpayhistory] = useState(false);
  // const [detail, setdetail] = useState([]);
  const sessionStorage = window.sessionStorage;
  let [name, setName] = useState("");
  let [phoneNum, setphone] = useState("");
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  let [plate, setplate] = useState("");
  let [date, setDate] = useState("");
  let [modifiedDate, setmodifieddate] = useState("");
  let [pay, setPay] = useState(null);
  let [dlocation, setDlocation] = useState("");
  let [fine, setfine] = useState();

  useEffect(() => {
    console.log(data1);
    const id1 = {
      id: data2,
    };
    let token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:8081/api/record/search-by-id", id1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let datas = res.data.responseData;
        console.log(datas);
        setName(datas.name);
        setphone(datas.phoneNum);
        setAddress(datas.address);
        setCarImageUrl(datas.carImageUrl);
        setplate(datas.plateImageUrl);
        setDate(datas.date);
        setPay(datas.pay);
        setfine(datas.fine);
        setDlocation(datas.location);
      })
      .catch((error) => {
        console.log(error);
      });
    // callall()
  }, []);

  useEffect(() => {
    const currentDate = new Date(`${date}Z`);
    currentDate.setDate(currentDate.getDate() - 20);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const modifiedDate = `${year}/${month}/${day}`;
    setmodifieddate(modifiedDate);
  }, [date]);

  let fordate = date.replace("T", " ");
  let dates = fordate.replace(/-/g, "/");
  // let Fine = fine.toLocaleString();

  return (
    <div className={styles.background}>
      <div className={styles.nav}>
        <div>주정차위반과태료</div>
      </div>
      <div className={styles.body}>
        <div className={styles.mininav}>
          <div className={styles.content1}>
            <div className={styles.center}>
              <div style={{ fontWeight: "700", fontSize: "1.8em" }}>
                {carnum}
              </div>
              <div style={{ marginTop: "5px" }}>차량소유자: {name}</div>
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
              navigate("/enrollmentcar", {
                state: { data2: id },
              });
            }}
            // 확인하고 다시 carnum를 enrollment로 보내줘서 input 페이지가 다시 넘어가도 유지되게함
          >
            고지서 확인완료
          </div>
        </div>

        {payhistory ? (
          <div className={styles.area}>
            <Payhistory data={data1} />
          </div>
        ) : (
          <div className={styles.area}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "1.1em",
              }}
            >
              납세자 정보
            </div>
            <hr style={{ width: "100%" }}></hr>
            <div className={styles.a}>
              <div className={styles.img}>
                <img src={carImageUrl} alt="go" width="250px" height="200px" />
              </div>
              <div className={styles.b0}>
                <div className={styles.b}>
                  <div className={styles.c}>
                    <div style={{ paddingBottom: "5px" }}>납세자</div>
                    <div style={{ paddingBottom: "5px" }}>전화번호</div>
                    <div style={{ paddingBottom: "5px" }}>주소</div>
                  </div>
                  <div className={styles.c1}>
                    <div style={{ paddingBottom: "5px" }}>{name}</div>
                    <div style={{ paddingBottom: "5px" }}>
                      {phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
                    </div>
                    <div style={{ paddingBottom: "5px" }}>{address}</div>
                  </div>
                </div>
                <div className={styles.d}>
                  <div style={{ width: "65px" }}>번호판</div>
                  <div style={{ paddingLeft: "8%" }}>
                    <img src={plate} alt="go" width="250px" height="100%" />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "600", fontSize: "1.1em" }}>
              부과내역{" "}
              <span>
                {pay === true ? (
                  <span style={{ color: "blue" }}>납부완료</span>
                ) : (
                  <span style={{ color: "red" }}>미납</span>
                )}
              </span>
            </div>
            <hr style={{ width: "100%" }}></hr>
            <div className={styles.f}>
              <div className={styles.g}>
                <div className={styles.f}>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>납부기한</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>{modifiedDate}</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>과목</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>납기내금액</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>과태료</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>{fine}</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>가산금</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>0</div>
                  </div>
                  <div className={styles.g2}>
                    <div style={{ width: "100px" }}>합계금액</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>{fine}</div>
                  </div>
                </div>
                <div className={styles.f}>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>적발일시</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>{dates}</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>적발장소</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px", wordWrap: "break-all" }}>
                      {dlocation}
                    </div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>법조항</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>도로교통법 제 32-34조</div>
                  </div>
                  <div className={styles.g1}>
                    <div style={{ width: "100px" }}>고지번호</div>
                    <div className={styles.empty}></div>
                    <div style={{ width: "150px" }}>202011101633</div>
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
