import React from "react";
import styles from "./MessageFine.module.css";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams  } from "react-router-dom";
import MessagePayhistory from "./MessagePayhistory";
import { useEffect} from "react";
import axios from "axios";
import hamburger from "../../../assets/hamburger.png";
// import PropTypes from 'prop-types'; 
// import { useState, useEffect } from "react";

// import { useSearchParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

export default function MessageFine() {
  const { id } = useParams();
  console.log(id)
  let [name, setName] = useState("");
  let [phoneNum, setphone] = useState("");
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  // let [plate, setplate] = useState("");
  let [date, setDate] = useState("");
  let [modifiedDate, setmodifieddate] = useState("");
  let [pay, setPay] = useState(null);
  let [location, setlocation] = useState("");
  let [carnum, setcarnum] = useState("");
  let [fine, setfine] = useState();

  // const [searchParams, setSearchParams] = useSearchParams();

  console.log(id)
      axios
      .get(`${baseUrl}/feeletter/${id}`)
      .then((res) => {
        let datas = res.data.responseData;
        console.log(datas);
        setName(datas.name);
        setphone(datas.phoneNum);
        setAddress(datas.address);
        setCarImageUrl(datas.carImageUrl);
        // setplate(datas.plateImageUrl);
        setDate(datas.date);
        setPay(datas.pay);
        setfine(datas.fine);
        setlocation(datas.location);
        setcarnum(datas.carNum)
      })
      .catch((error) => {
        console.error(error);
      })

      
  const [payhistory, setpayhistory] = useState(false);
  // const [detail, setdetail] = useState([]);
  const [modal, setmodal] = useState(false);


  const openside = () => {
    setmodal(!modal);
    // console.log(detail)
  };
  const closeModal = () => {
    setmodal(false);
  };
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
                  {carnum}
                  
                </div>
                <div style={{ marginTop: "5px" }}>차량소유자: {name}</div>
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
            <MessagePayhistory data = {carnum}/>
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
                <img src={carImageUrl} alt="go" width="100%" height="100%" />
              </div>
              <div className={styles.b0}>
                <div className={styles.c}>
                  <div style={{ paddingBottom: "5px" }}>납세자</div>
                  <div style={{ paddingBottom: "5px" }}>전화번호</div>
                  <div style={{ paddingBottom: "5px" }}>주소</div>
                </div>
                <div className={styles.c1}>
                  <div style={{ paddingBottom: "5px" }}>{name}</div>
                  <div style={{ paddingBottom: "5px" }}>{phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</div>
                  <div style={{ paddingBottom: "5px" }}>
                  {address}
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
                <span>
                {pay === true ? (
                  <span style={{ color: "blue" }}>(납부완료)</span>
                ) : (
                  <span style={{ color: "red" }}>(미납)</span>
                )}
              </span>
              </div>
              <div className={styles.f}>
                <div className={styles.g}>
                  <div className={styles.g1}>납부기한</div>
                  <div className={styles.g2}>{modifiedDate}</div>
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
                    <div className={styles.g4}>{fine}</div>
                  </div>
                  <div className={styles.g5}>
                    <div className={styles.g3}>가산금</div>
                    <div className={styles.g4}>0</div>
                  </div>
                  <div className={styles.g5}>
                    <div className={styles.g3}>합계금액</div>
                    <div className={styles.g4}>{fine}</div>
                  </div>
                </div>

                <div className={styles.g}>
                  <div className={styles.g1}>적발일시</div>
                  <div className={styles.g2}>{dates}</div>
                </div>
                <div className={styles.g}>
                  <div className={styles.g1}>적발장소</div>
                  <div className={styles.g2} style={{ width: "150px", wordWrap: "break-all" }}>{location}</div>
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
