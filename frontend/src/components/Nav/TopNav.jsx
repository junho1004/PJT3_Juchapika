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

  const [modal, Setmodal] = useState(false);

  const [searchCar, setSearchcar] = useState([]);
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  const [carNum, setCarNum] = useState("");
  // let [color, setColor] = useState("");
  let [date, setDate] = useState("");
  // let [fine, setFine] = useState("");
  let [dlocation, setDlocation] = useState("");
  // let [model, setModel] = useState("");
  let [name, setName] = useState("");
  let [pay, setPay] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  let [plateImageUrl, setPlateImageUrl] = useState("");

  useEffect(() => {}, [searchCar]);

  const closeModal = () => {
    Setmodal(false);
  };
  const onChange = (e) => {
    setInputText(e.target.value);
    const carNum = {
      carNum: e.target.value,
    };
    axios
      .post("http://52.79.199.205:8081/api/record/search-by-carnum", carNum)
      .then((res) => {
        console.log(res.data.responseData);
        setSearchcar(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handelSubmit 차량 검색
    // 무조건 0 번째

    // 근데, const anotherSubmit
    // 누른 배열의 index를 보내

    if (InputText !== "") {
      let foundCar = false;
      for (let i = 0; i < searchCar.length; i++) {
          if (i === 0) {
            // 메인 컴포넌트에 뿌릴거
          } else {
            // 그 외 단속이력
          }

          Setmodal(true);
          setCarNum(searchCar[i]["carNum"]);
          setAddress(searchCar[i]["address"]);
          setCarImageUrl(searchCar[i]["carImageUrl"]);
          setDate(searchCar[i]["date"]);
          // setFine(info["fine"])
          setDlocation(searchCar[i]["location"]);
          // setModel(info["model"])
          setName(searchCar[i]["name"]);
          setPay(searchCar[i]["pay"]);
          setPhoneNum(searchCar[i]["phoneNum"]);
          setPlateImageUrl(searchCar[i]["plateImageUrl"]);
          setInputText("");
          // setbin("");
          foundCar = true;
      }
      if (!foundCar) {
        alert("등록된 차량이 없습니다");
        setInputText("");
        return;
      }
    }
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
                navigate("/livepage");
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
                // onKeyDown={onCheckEnter}
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
