import React, { useEffect, useState } from "react";
import TopNav from "../components/Nav/TopNav";
import styles from "./Main.module.css";
// import Modal from "../components/modal.jsx";
import { cardetails } from "../components/cardetails";

export default function Main() {
  const [modal, setmodal] = useState(false);
  const [searchCar, setSearchcar] = useState("");
  let [car, SetCar] = useState("");
  let [caught, Setcaught] = useState("");
  let [date, Setdate] = useState("");
  let [pic, Setpic] = useState(null);

  useEffect(() => {
    let sch = 0;
    if (searchCar !== "") {
      console.log(searchCar);
      // console.log(searchCar.type);
      cardetails.forEach((el) => {
        let car1 = el.car;
        let caught = el.caught;
        let date = el.date;
        let pic = el.pic;
        // console.log(cardetails);
        sch++;
        if (searchCar === car1) {
          setmodal(true);
          SetCar(car1);
          Setcaught(caught);
          Setdate(date);
          Setpic(pic);

          return;
        } else {
          if (sch == cardetails.length) {
            alert("등록된 차량이 없습니다");
            return;
          }
        }
      });
    }
  }, [searchCar]);

  const closeModal = () => {
    setmodal(false);
  };

  return (
    <div className={styles.background}>
      <TopNav setSearchcar={setSearchcar} />
      <div className={styles.body}>
        <div className={styles.live}>
          <div>80차 2201</div>
        </div>
        <div>
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
                    <div>
                      <span>
                        {date} {caught}
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                  <div className={styles.modaltext1}>
                    {/* <div
                      className={styles.detailcon}
                    > */}
                      <img src={pic} alt="go" className={styles.carimage}/>

                    {/* </div> */}
                    <div className={styles.contenttext}>
                      <div className={styles.name}><span style={{width:"60%"}}>이름</span><span className={styles.texts}>: {car}</span></div>
                      <div className={styles.name}>차기종</div>
                      <div className={styles.texts}>: {car}</div>
                      <div className={styles.name}>주행요금</div>
                      <div className={styles.texts}>: {car}원/km</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.back}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
