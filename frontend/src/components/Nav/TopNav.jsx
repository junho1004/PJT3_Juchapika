import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import logo from "../../assets/logo.png";
import magnifier from "../../assets/magnifier.png";
import { useEffect } from "react";
import axios from "axios";
// import { cardetails } from "../../components/cardetails";

// eslint-disable-next-line react/prop-types
export default function TopNav() {
  const navigate = useNavigate();
  const [InputText, setInputText] = useState("");
  const [bin, setbin] = useState("");
  const [modal, Setmodal] = useState(false);
  const [searchCar, setSearchcar] = useState([]);
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  let [carNum, setCarNum] = useState("");
  // let [color, setColor] = useState("");
  let [date, setDate] = useState("");
  // let [fine, setFine] = useState("");
  let [dlocation, setDlocation] = useState("");
  // let [model, setModel] = useState("");
  let [name, setName] = useState("");
  let [pay, setPay] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  let [plateImageUrl, setPlateImageUrl] = useState("");

  useEffect(() => {
  }, [bin,searchCar]);
  ///이거 블로그에 올릴것 이기능에 title 데이터를 넣어서 set에 넣음

  const closeModal = () => {
    Setmodal(false);
  };
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setbin(InputText);
    axios
      .post("http://localhost:8081/api/record/search-by-carnum", bin)
      .then((res) => {
        console.log(res.data.responseData);
        setSearchcar(res.data.responseData);
        if (bin === searchCar[0]["carNum"]) {
          Setmodal(true);
          setInputText("");
          setbin("");
          setCarNum(searchCar[0]["carNum"])
          setAddress(searchCar[0]["address"]);
          setCarImageUrl(searchCar[0]["carImageUrl"]);
          setDate(searchCar[0]["date"]);
          // setFine(info["fine"])
          setDlocation(searchCar[0]["location"]);
          // setModel(info["model"])
          setName(searchCar[0]["name"]);
          setPay(searchCar[0]["pay"]);
          setPhoneNum(searchCar[0]["phoneNum"]);
          setPlateImageUrl(searchCar[0]["plateImageUrl"]);
          return;
        }else if (bin !== searchCar[0]["carNum"])  {
          alert("등록된 차량이 없습니다");
          // setSearchcar("");
          setInputText("");
          setbin("");
          return;
        } })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div>
      <nav className={styles.body}>
        <div className={styles.contentbox}>
          <div className={styles.block1}>
            <div
              className={styles.blockimg}
              onClick={() => {
                navigate("/main");
              }}
            >
              <img src={logo} alt="logo" className={styles.img} />
            </div>
            <div
              className={styles.block}
              onClick={() => {
                navigate("/enrollmentcar");
              }}
            >
              차량등록
            </div>
            <div
              className={styles.block}
              onClick={() => {
                navigate("/live");
              }}
            >
              실시간화면
            </div>
            <div
              className={styles.block}
              onClick={() => {
                navigate("/videostorage");
              }}
            >
              영상저장소
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.blocklogout}>
              <input
                type="text"
                value={InputText}
                onChange={onChange}
                className={styles.searchbox}
                placeholder="  차량 조회"
              />
              <div onClick={handleSubmit} className={styles.icon}>
                {" "}
                <img src={magnifier} alt="mag" style={{ width: "20px" }}></img>
              </div>
            </div>
          </form>
        </div>
      </nav>
      {modal && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div onClick={closeModal} className={styles.x}>
              <div>x</div>
            </div>
            <div>
              <div className={styles.modaltext}>
                <div style={{ fontSize: "1.5em", fontWeight: "800" }}>
                  {carNum}
                </div>
              </div>
              <div className={styles.modaltext}>
                <div style={{ fontSize: "0.7em", marginBottom: "10px" }}>
                  {date} {dlocation}
                </div>
              </div>
              <hr></hr>
              <div className={styles.modaltext1}>
                {/* <div
                      className={styles.detailcon}
                    > */}
                <img
                  src={carImageUrl}
                  alt="go"
                  className={styles.carimage}
                  style={{ width: "150px", marginRight: "20px" }}
                />

                {/* </div> */}
                <div className={styles.contenttext}>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>소유주</span>
                    <span className={styles.texts}> {name}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>전화번호</span>
                    <span className={styles.texts}> {phoneNum}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>주소</span>
                    <span className={styles.texts}> {address}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>번호판</span>
                    <span className={styles.texts}>
                      {" "}
                      <img
                        src={plateImageUrl}
                        alt="go"
                        style={{ width: "100px" }}
                      />
                    </span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>납부유무</span>
                    <span className={styles.texts}>
                      {pay === "납부완료" ? (
                        <span style={{ color: "blue" }}>납부완료</span>
                      ) : (
                        <span style={{ color: "red" }}>미납</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.else}>
              <div style={{ fontWeight: "800", marginBottom: "2%" }}>
                그 외 단속이력
              </div>
              <div className={styles.else1}>
                <div style={{ marginRight: "5px" }}>{date}</div>
                <div style={{ marginRight: "25px" }}>{dlocation}</div>
                <div>
                  {" "}
                  {pay === "납부완료" ? (
                    <span style={{ color: "blue" }}>납부완료</span>
                  ) : (
                    <span style={{ color: "red" }}>미납</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
