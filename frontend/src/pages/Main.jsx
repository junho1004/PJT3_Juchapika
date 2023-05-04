import React, { useEffect, useState } from "react";
import TopNav from "../components/Nav/TopNav";
import styles from "./Main.module.css";
// import Modal from "../components/modal.jsx";
import { cardetails } from "../components/cardetails";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../assets/calendar.png";

export default function Main() {
  const [modal, setmodal] = useState(false);
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
        let phonenumber = el.phonenumber;
        let address = el.address;
        let carnumber = el.carnumber;
        let fee = el.fee;
        let name = el.name;
        // console.log(cardetails);
        sch++;
        if (searchCar === car1) {
          setmodal(true);
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
        } else if (sch == cardetails.length) {
          alert("등록된 차량이 없습니다");
          setSearchcar("");
          return;
        }
      });
    }
  }, [searchCar]);

  const closeModal = () => {
    setmodal(false);
  };
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleApply = () => {
    // startDate와 endDate를 이용하여 작업 수행
    console.log(startDate, endDate);
  };

  const minDate = new Date();
  const maxDate = () => {
    new Date();
    console.log(startDate, endDate);

    maxDate.setMonth(maxDate.getMonth() + 3);
  };

  return (
    <div className={styles.background}>
      <TopNav setSearchcar={setSearchcar} />
      <div className={styles.body}>
        <div className={styles.list}>
          <div style={{ fontSize: "1.5em", fontWeight: "800" }}>
            단속 현황 조회
          </div>
          <hr></hr>
          <div className={styles.mininav}>
            <div style={{marginRight:"20px",paddingTop:"3px" }}>날짜</div>
            <div>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                selectsRange
                onChange={(update) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                }}
                minDate={minDate}
                maxDate={maxDate}
                className={styles.calendar}
             /></div>
              <div onClick={handleApply} className={styles.calendarimg} >
                <img src={calendar} alt="error" style={{ width:"20px"}}  />
              </div>



              <div style={{marginRight:"20px",paddingTop:"3px" }}>지역</div>
            <div>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                selectsRange
                onChange={(update) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                }}
                minDate={minDate}
                maxDate={maxDate}
                className={styles.calendar}
                
                // placeholderText="날짜를 고르세요"
              />
            </div>
              <div onClick={handleApply} className={styles.calendarimg} >
                <img src={calendar} alt="error" style={{ width:"20px"}}  />
              </div>
          </div>
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
                    {car}
                  </div>
                </div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "0.7em", marginBottom: "20px" }}>
                    {/* <span> */}
                    {date} {caught}
                    {/* </span> */}
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
                    style={{ width: "100px" }}
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
            <div className={styles.back}></div>
          </div>
        )}
        ;
      </div>
    </div>
  );
}
