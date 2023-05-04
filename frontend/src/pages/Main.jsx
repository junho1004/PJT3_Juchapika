import React, { useEffect, useState } from "react";
import TopNav from "../components/Nav/TopNav";
import styles from "./Main.module.css";
// import Modal from "../components/modal.jsx";
import { cardetails } from "../components/cardetails";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../assets/calendar.png";
import file from "../assets/file.png";
import statistics from "../assets/statistics.png";
import axios from "axios";
import TotalTable from "../components/TotalTable";

const API_URL = process.env.REACT_APP_API_URL;

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
  // const [view, setView] = useState(false);

  // const [selectedData, setSelectedData] = useState("");

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
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
  };

  const minDate = new Date();
  const maxDate = () => {
    new Date();
    console.log(startDate, endDate);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    maxDate.setMonth(maxDate.getMonth() + 3);
  };

  const [location, Setlocation] = useState("");
  const [area, Setarea] = useState("");

  const locationChange = (e) => {
    // event handler
    console.log(e.target.value);
    Setlocation(e.target.value);
  };
  const areaChange = (e) => {
    // event handler
    console.log(e.target.value);
    Setarea(e.target.value);
  };

  const locations = [
    { value: "all", name: "전체" },
    { value: "gwangsangoo", name: "광산구" },
    { value: "donggoo", name: "동구" },
    { value: "seogoo", name: "서구" },
  ];

  const areas = [
    { value: "all", name: "전체" },
    { value: "suwandong", name: "수완동" },
    { value: "jangdukdong", name: "장덕동" },
    { value: "hanamdong", name: "하남동" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // 폼 데이터 생성
    // const formData = new FormdData();
    // formData.append("start_date", startDate);
    // formData.append("end_date", endDate);
    // formData.append("location", location);
    // formData.append("area", area);

    // console.log(formData)
    const data = {
      start_date: startDate,
      end_date: endDate,
      location: location,
      area: area,
    };

    // axios로 폼 데이터 전송
    axios
      .post(REACT_APP_API_URL + , data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <form onSubmit={handleSubmit}>
            <div className={styles.mininav}>
              <div style={{ marginRight: "30px", paddingTop: "3px" }}>날짜</div>
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
                  dateFormat="yyyy/MM/dd"
                  className={styles.calendar}
                />
              </div>
              <div onClick={handleApply} className={styles.calendarimg}>
                <img src={calendar} alt="error" style={{ width: "20px" }} />
              </div>

              <div style={{ marginRight: "30px", paddingTop: "3px" }}>지역</div>
              <select onChange={locationChange} className={styles.localist}>
                {locations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div style={{ marginRight: "30px", paddingTop: "3px" }}>동</div>
              <select onChange={areaChange} className={styles.localist}>
                {areas.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div onClick={handleSubmit} className={styles.btn}>
                <div>조회</div>
              </div>
            </div>
          </form>

          <div className={styles.excelside}>
            <div className={styles.excel} style={{marginRight:"20px"}}>
              <div style={{paddingRight:"10px"}}>Excel</div>
              <div>
                <img src={file} alt="error" style={{ width: "20px" }} />
                </div>
            </div>
            <div className={styles.excel}>
              <div style={{paddingRight:"10px"}}>통계</div>
              <img src={statistics} alt="error" style={{ width: "20px" }} />
            </div>
          </div>
            <div className={styles.count}>총 4개</div>
            <div>
<TotalTable/>
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
      </div>
    </div>
  );
}
