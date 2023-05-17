import React from "react";
import styles from "./MessagePayhistory.module.css";
import axios from "axios";
// import axios from "axios";
import { useState, useEffect } from "react";

export default function MessagePayhistory(data) {
  const carnum1 = data.data;
  console.log(carnum1)
  const [posts, setPosts] = useState([]);
  const [modal, Setmodal] = useState(false);
  let [location, setlocation] = useState("");
  const [num, setCarNum] = useState("");
  let [carImageUrl1, setCarImageUrl] = useState("");
  let [pay, setpay] = useState();
  let [plate, setplate] = useState("");
  let [name, setname] = useState("");
  let [address, setaddress] = useState("");
  let [number, setnumber] = useState("");


  useEffect(() => {
    const carnum2 = {
      carNum: carnum1,
    };
    
    axios
      .post("http://localhost:8081/api/feeletter/carnum", carnum2,{})
      .then((res) => {
        let datas = res.data.responseData;
        setPosts(datas);
        console.log(datas);
        console.log("ddddddd");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openModal = (i) => {
    Setmodal(true);
    setCarNum(i.carNum);
    setlocation(i.location);
    setCarImageUrl(i.carImageUrl);
    setpay(i.pay);
    setplate(i.plateImageUrl);
    setname(i.name);
    setaddress(i.address);
    setnumber(i.phoneNum);
  };
  const closeModal = () => {
    Setmodal(false);
  };

  return (
    
        <div className={styles.area}>
                <div className={styles.list}>
                  {posts.map((post, index) => (
                    <div
                    onClick={() => openModal(post)}
                    className={styles.videos}
                    key={index}
                    >
                      <div className={styles.video1}>
                        <div style={{width:"20%"}}>{index + 1}.</div>
                        <div className={styles.video}>{post.location}</div>
                      </div>
                      <hr></hr>
                    </div>
                  ))}
                </div>
          {modal && (
          <div className={styles.container}>
            <div className={styles.modal}>
              <div onClick={closeModal} className={styles.x}>
                <div>x</div>
              </div>
              <div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "1.5em", fontWeight: "800" }}>
                  {num}
                  </div>
                </div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "0.7em", marginBottom: "10px" }}>
                  {location}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                <img
                  src={carImageUrl1}
                  alt="go"
                  className={styles.carimage}
                  style={{ width: "50%" }}
                />
                  <div className={styles.contenttext}>
                    
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>소유주</span>
                      <span className={styles.texts}>{name}</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>전화번호</span>
                      <span className={styles.texts}>{number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>주소</span>
                      <span className={styles.texts}>{address}</span>
                    </div>
                    <div className={styles.name}>
                    <span style={{ width: "40%" }}>번호판</span>
                    <span className={styles.texts}>
                      {" "}
                      <img src={plate} alt="go" style={{ width: "100px" }} />
                    </span>
                  </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>납부유무</span>
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
            </div>
            <div className={styles.back} onClick={closeModal}></div>
          </div>
        )}
        </div>
  );
}
