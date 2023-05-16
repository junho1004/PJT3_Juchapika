import React from "react";
import styles from "./PayHistory.module.css";
import axios from "axios";
// import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

export default function PayHistory(data) {
  const carnum1 = data.data;
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
    console.log(carnum1);
    const carnum = {
      carNum: carnum1,
    };
    let token = sessionStorage.getItem("token");
    axios
      .post(`${baseUrl}/record/search-by-carnum`, carnum, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let datas = res.data.responseData;
        setPosts(datas);
        console.log(datas);
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
              <span style={{ fontWeight: "600", marginRight: "5%" }}>
                {index + 1}.
              </span>
              {post.date.replace("T", " ")}
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
                    <span style={{ width: "40%" }}>소유주</span>
                    <span className={styles.texts}> {name}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>전화번호</span>
                    <span className={styles.texts}> {number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>주소</span>
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
                    <span style={{ width: "40%" }}>납부유무</span>
                    <span className={styles.texts}>
                      {pay === true ? (
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
