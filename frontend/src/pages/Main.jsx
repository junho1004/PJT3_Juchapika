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
import Chart from "../components/Table/Chart";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import PropTypes from "prop-types";
import UserTable from "../components/Table/UserTable";
// import {downloadExcel} from "../components/Table/UserTable";


export default function Main() {
  // const { data } = props;
  // const { onDownloadExcel } = this.props;
  const [modal, setmodal] = useState(false);
  const [statistic, setstatistic] = useState(false);
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
  // const [users, setUsers] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [down,setdown] = useState(null)

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
        } else if (sch === cardetails.length) {
          alert("등록된 차량이 없습니다");
          setSearchcar("");
          return;
        }
      }
    });
  }, [searchCar]);

  //엑셀다운버튼

  // const {UserTable} = this.props;
  // function handleDownloadExcel() {
  //   UserTable.downloadExcel(UserTable.users, UserTable.columns);
  // }

  // function handleExcelDownload() {
  //   const users = [] // 다운로드할 유저 데이터
  //   const columns = []
  //   UserTable.downloadExcel(users, columns);
  // }
  const closeModal = () => {
    setmodal(false);
  };

  const openstatistic = () => {
    setstatistic(true);
  };
  const closestatistic = () => {
    setstatistic(false);
  };
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const maxDate = new Date();
  const minDate = () => {
    new Date();
    minDate.setMonth(minDate.getMonth() - 90);
  };
  // const handleApply = () => {
  //   // startDate와 endDate를 이용하여 작업 수행
  //   // console.log(startDate, endDate);
  //   console.log("startDate:", startDate);
  //   console.log("endDate:", endDate);
  // };

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

    const data = {
      start_date: startDate,
      end_date: endDate,
      location: location,
      area: area,
    };

    // axios로 폼 데이터 전송
    axios
      .post("주소주소", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Clickdown = ()=>{
    UserTable.downloadExcel(UserTable.users, UserTable.columns);
  }

  return (
    <div className={styles.background}>
      <TopNav Searchcar1={setSearchcar} />
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
                  id="datepicker"
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  onChange={(update) => {
                    setStartDate(update[0]);
                    setEndDate(update[1]);
                    console.log(update);
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="yyyy/MM/dd"
                  className={styles.calendar}
                />
              </div>
              <div
                onClick={() => {
                  document.getElementById("datepicker").focus();
                }}
                className={styles.calendarimg}
              >
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
            <div
              className={styles.excel}
              style={{ marginRight: "20px" }}
              onClick={Clickdown}>
            
              <div className={styles.excelbtn}>Excel</div>
              <div>
                <img src={file} alt="error" style={{ width: "20px" }} />
              </div>
            </div>
            <div onClick={openstatistic} className={styles.excel}>
              <div className={styles.excelbtn}>통계</div>
              <img src={statistics} alt="error" style={{ width: "20px" }} />
            </div>
          </div>
          <div>
            <UserTable/>
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
        {statistic && (
          <div className={styles.container}>
            <div className={styles.modal1}>
              <div onClick={closestatistic} className={styles.x}>
                <div>x</div>
              </div>
              <div className={styles.modalin}>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "1.5em", fontWeight: "800" }}>
                    발생건수
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7em", marginBottom: "30px" }}>
                    {/* {startDate} ~ {endDate} */}
                    {format(startDate, "yyyy.MM.dd", { locale: ko })}~
                    {format(endDate, "yyyy.MM.dd", { locale: ko })}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                  <Chart startDate={startDate} endDate={endDate} />
                </div>
              </div>
            </div>
            <div className={styles.back} onClick={closestatistic}></div>
          </div>
        )}
      </div>
    </div>
  );
}
Main.propTypes = {
  data: PropTypes.func.isRequired,
  downme: PropTypes.func.isRequired,
};
