import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./VideoStorage.module.css";
import { cardetails } from "../../components/cardetails";

export default function VideoStorage() {
  const [posts, setPosts] = useState([]);
  const [modal1, Setmodal1] = useState(false);
  const [modal, Setmodal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [searchCar, setSearchcar] = useState("");
  let [car, SetCar] = useState("");
  let [caught, Setcaught] = useState("");
  let [date, Setdate] = useState("");
  let [pic, Setpic] = useState(null);
  let [phonenumber, Setphonenumber] = useState("");
  let [address, Setaddress] = useState("");
  let [carnumber, Setcarnumber] = useState(null);
  let [fee, Setfee] = useState("");
  let [name, Setname] = useState("");

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    let sch = 0;
    console.log(searchCar);
    // console.log(searchCar.type);
    cardetails.forEach((el) => {
      let car1 = el.car;
      let caught = el.caught;
      let date = el.date;
      let pic = el.pic;
      let phonenumber = el.phonenumber;
      let address = el.address;
      let carnumber = el.carnumber;
      let fee = el.fee;
      let name = el.name;
      // console.log(cardetails);
      sch++;
      if (searchCar !== "") {
        if (searchCar === car1) {
          Setmodal(true);
          SetCar(car1);
          Setcaught(caught);
          Setdate(date);
          Setpic(pic);
          Setphonenumber(phonenumber);
          Setaddress(address);
          Setcarnumber(carnumber);
          Setfee(fee);
          Setname(name);
          setSearchcar("");
          return;
        } else if (sch === cardetails.length) {
          alert("등록된 차량이 없습니다");
          setSearchcar("");
          return;
        }
      }
    });
  }, [searchCar]);
  ///이거 블로그에 올릴것 이기능에 title 데이터를 넣어서 set에 넣음
  const openModal = (title) => {
    Setmodal1(true);
    setSelectedTitle(title);
  };
  const closeModal = () => {
    Setmodal1(false);
    Setmodal(false);
  };

  return (
    <div className={styles.background}>
      <TopNav Searchcar1={setSearchcar}  />
      <div className={styles.body}>
        <div className={styles.starts}>
          <div style={{ fontSize: "1.5em", fontWeight: "600" }}>영상리스트</div>
          <div style={{ padding: "5% 0% 5% 0%" }}>
            <div className={styles.center}>
              <div>오늘({getDate()})</div>
            </div>
            <div className={styles.list}>
              {posts.map((post) => (
                <div
                  onClick={() => openModal(post.title)}
                  className={styles.videos}
                  key={post.id}
                >
                  <div className={styles.video1}>
                    {post.id}
                    <div className={styles.video}>{post.title}</div>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal1 && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div onClick={closeModal} className={styles.x}>
              <div>x</div>
            </div>
            <div className={styles.modalin}>
              <div className={styles.centre}>{selectedTitle}</div>
              <div className={styles.centre} style={{ padding: "5%" }}>
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  width="500"
                  height="300"
                  controls
                />
              </div>
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
      {modal && (
          <div className={styles.container}>
            <div className={styles.modal}>
              <div onClick={closeModal} className={styles.x}>
                <div>x</div>
              </div>
              <div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "1.5em", fontWeight: "800" }}>
                    {car}
                  </div>
                </div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "0.7em", marginBottom: "10px" }}>
                    {date} {caught}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                  {/* <div
                      className={styles.detailcon}
                    > */}
                  <img
                    src={pic}
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
                      <span className={styles.texts}> {phonenumber}</span>
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
                          src={carnumber}
                          alt="go"
                          style={{ width: "100px" }}
                        />
                      </span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>납부유무</span>
                      <span className={styles.texts}>
                        {fee === "납부완료" ? (
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
                  <div style={{ marginRight: "25px" }}>{caught}</div>
                  <div>
                    {" "}
                    {fee === "납부완료" ? (
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
