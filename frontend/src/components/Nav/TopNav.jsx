import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import logo from "../../assets/logo.png";
import magnifier from "../../assets/magnifier.png";
import { useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function TopNav( ) {
  const navigate = useNavigate();
  const [InputText, setInputText] = useState("");
  const [modal, Setmodal] = useState(false);
  let [nowindex, setnowindex] = useState(0);
  const [searchCar, setSearchcar] = useState([]);
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  const [carNum2, setCarNum] = useState("");
  let [date, setDate] = useState("");
  let [dlocation, setDlocation] = useState("");
  let [name, setName] = useState("");
  let [pay, setPay] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  const [restNumList, setRestNumList] = useState([]);

  useEffect(() => {
    again();
  }, [nowindex]);

  useEffect(() => {
    // if (byclick !== []) {
    //   Byclick();
    // }
  }, []);

  const closeModal = () => {
    Setmodal(false);
    setRestNumList([]);
  };
  const onChange = (e) => {
    setInputText(e.target.value);

    const carNum1 = {
      carNum: e.target.value,
    };
    axios
      .post("http://localhost:8081/api/record/search-by-carnum", carNum1)
      .then((res) => {
        console.log(res.data.responseData);
        setSearchcar(res.data.responseData);
        console.log("이게뭔지모르아너어럼이");

        // return
      })
      .catch((error) => {
        // setSearchcar("");
        // alert("등록된 차량이 없습니다");
        console.log(error);
        // return;
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    let arr = new Array(searchCar.length).fill().map((_, i) => i);

    let restNum = arr.filter((item) => {
      return item != nowindex;
    });
    // print(restNum)  // [1, 2]
    setRestNumList(restNum);

    if (InputText !== "") {
      let foundCar = false;
      if (InputText === searchCar[nowindex].carNum) {
        let info = searchCar[nowindex];

        Setmodal(true);
        setCarNum(info.carNum);
        setAddress(info.address);
        setCarImageUrl(info.carImageUrl);
        setDate(info.date);

        // setFine(info["fine"])
        setDlocation(info.location);
        // setModel(info["model"])
        setName(info.name);
        setPay(info.pay);
        setPhoneNum(info.phoneNum);
        // setPlateImageUrl(info.plateImageUrl);
        setInputText("");
        foundCar = true;
        return;
      }
      if (!foundCar) {
        alert("등록된 차량이 없습니다");
        setInputText("");
        return;
      }
    }
  };

  const updateNow = (i) => {
    setnowindex(i);
    again();
  };

  const again = () => {
    if (searchCar.length > 0) {
      let arr = new Array(searchCar.length).fill().map((_, i) => i);

      let restNum = arr.filter((item) => {
        return item != nowindex;
      });
      // print(restNum)  // [1, 2]
      setRestNumList(restNum);

      // let foundCar = false;

      {
        let info = searchCar[nowindex];

        Setmodal(true);
        setCarNum(info.carNum);
        setAddress(info.address);
        setCarImageUrl(info.carImageUrl);
        setDate(info.date);
        // setFine(info["fine"])
        setDlocation(info.location);
        // setModel(info["model"])
        setName(info.name);
        setPay(info.pay);
        setPhoneNum(info.phoneNum);
        // setPlateImageUrl(info.plateImageUrl);
        setInputText("");
        return;
        // foundCar = true;
      }
    }
  };

  let fordate = date.replace("T", " ");

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
                <div style={{ fontSize: "1.7em", fontWeight: "800" }}>
                  {carNum2}
                </div>
              </div>
              <div className={styles.modaltext}>
                <div style={{ fontSize: "0.9em", marginBottom: "5px" }}>
                  : {fordate} {dlocation}
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
                  style={{
                    width: "180px",
                    height: "120px",
                    marginRight: "20px",
                  }}
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
                    <div style={{ width: "40%" }}>소유주 주소</div>
                    <span className={styles.texts}> {address}</span>
                  </div>
                  {/* <div className={styles.name}>
                    <span style={{ width: "40%" }}>번호판</span>
                    <span className={styles.texts}>
                      {" "}
                      <img
                        src={plateImageUrl}
                        alt="go"
                        style={{ width: "100px" }}
                      />
                    </span>
                  </div> */}
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
              <div style={{ fontWeight: "800", marginBottom: "1%" }}>
                그 외{" "}
                <span style={{ color: "red" }}> {restNumList.length}개 </span>{" "}
                단속이력{" "}
                <span style={{ fontSize: "0.5em" }}>
                  ( 클릭시 상세정보를 볼 수 있습니다 )
                </span>
              </div>
              <div className={styles.else2}>
                {restNumList.length === 0 ? (
                  <div>그 외 단속기록이 없습니다</div>
                ) : (
                  restNumList.map((item) => {
                    return (
                      <div key={item} onClick={() => updateNow(item)}>
                        <div className={styles.else1}>
                          <div style={{ marginRight: "5px" }}>
                            <span style={{ marginRight: "10px" }}>-</span>{" "}
                            {searchCar[item]["location"]}
                          </div>
                          <div style={{ marginRight: "25px" }}>
                            {searchCar[item]["date"].replace("T", " ")}
                          </div>
                          <div>
                            {" "}
                            {searchCar[item]["pay"] === "납부완료" ? (
                              <span style={{ color: "blue" }}>납부완료</span>
                            ) : (
                              <span style={{ color: "red" }}>미납</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
