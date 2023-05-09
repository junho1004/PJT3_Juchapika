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
  let [search, Setsearch] = useState({
    startDate: "",
    endDate: "",
    county: "전체",
    dong: "전체"
  });
  let [tableData, setTableData] = useState([]);
  let [chartData, setChartData] = useState({});
  
  // const [down,Setdown] = useState(null)

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




  const closeModal = () => {
    setmodal(false);
  };

  const convertExcel = () => {
    console.log("asd");
    const data = Array(tableData.length)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      date: tableData[i].date,
      time: tableData[i].time,
      location: tableData[i].location,
      carNum: tableData[i].carNum,
    }));

    data.forEach(test => {
      console.log(test);
    });
  

    axios
      .post("http://localhost:8081/api/record/download", data, {
        responseType: 'blob' // blob 형태로 데이터를 받아옴
      })
      .then((res) => {
        // Blob 데이터를 이용해 엑셀 파일 생성
        const file = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        // 엑셀 파일 다운로드 링크 생성
        const fileURL = URL.createObjectURL(file)
        const a = document.createElement('a')
        const startDate = search.startDate.slice(0, 10)
        const endDate = search.endDate.slice(0, 10)

        a.href = fileURL
        a.download = '(' + startDate + '~' + endDate + ')' + ' 단속현황_조회_' + search.county + ' ' + search.dong + '.xlsx'
        a.click()
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const openstatistic = () => {
    console.log("openstatistic");

    const data = {
      startDate: search.startDate,
      endDate: search.endDate,
      county: search.county,
      dong: search.dong
    }

    if (data.county == "") {
      data.county = "전체"
    }

    if (data.dong == "") {
      data.dong = "전체"
    }

    console.log(data);
    
    axios
      .post("http://localhost:8081/api/record/statistics", data)
      .then((res) => {
        console.log("12345");
        console.log(res.data.responseData[0])
        const responseData = res.data.responseData[0].county

        
        setChartData(responseData)
        setstatistic(true);
        
      })
      .catch((error) => {
        console.log(error);
      });


  };



  const closestatistic = () => {
    console.log("closestatistic");

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
    { value: "전체", name: "전체" },
    { value: "광산구", name: "광산구" },
    // { value: "동구", name: "동구" },
    // { value: "서구", name: "서구" },
    // { value: "남구", name: "남구" },
    // { value: "북구", name: "북구" },
  ];

  const areas = [
    { value: "전체", name: "전체" },
    { value: "수완동", name: "수완동" },
    { value: "장덕동", name: "장덕동" },
    { value: "하남동", name: "하남동" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"),
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"),
      county: location,
      dong: area,
    };

    console.log(data.county);
    console.log(data.dong);

    if (data.county == "") {
      data.county = "전체"
    }

    if (data.dong == "") {
      data.dong = "전체"
    }

    Setsearch(data)

    console.log(data.startDate);
    console.log(data.endDate);
    console.log(typeof (data.startDate));
    console.log(typeof (data.endDate));


    // axios로 폼 데이터 전송
    axios
      .post("http://localhost:8081/api/record/search-by-detail", data)
      .then((res) => {


        console.log(res.data.responseData[0]);
        console.log(typeof(res.data.responseData[0]));
        setTableData(res.data.responseData);


        console.log(tableData);
        // res.data
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              onClick={convertExcel}
            >
              <div  className={styles.excelbtn}>Excel</div>
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
          <UserTable tableData={tableData} />
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
                    기간별 통계
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7em", marginBottom: "30px" }}>
                    {/* {startDate} ~ {endDate} */}
                    {format(startDate, "yyyy.MM.dd", { locale: ko })} ~ {format(endDate, "yyyy.MM.dd", { locale: ko })}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                  <Chart startDate={startDate} endDate={endDate} chartData={chartData} />
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
