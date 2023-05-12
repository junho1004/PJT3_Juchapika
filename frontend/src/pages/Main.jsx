import React, { useEffect, useState } from "react";
import TopNav from "../components/Nav/TopNav";
import styles from "./Main.module.css";
// import Modal from "../components/modal.jsx";
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
  const [statistic, setstatistic] = useState(false);
  let [search, Setsearch] = useState({
    startDate: "",
    endDate: "",
    county: "전체",
    dong: "전체",
  });
  let [tableData, setTableData] = useState([]);
  let [chartData, setChartData] = useState({});
  const [location, Setlocation] = useState("전체");
  const [area, Setarea] = useState([{ value: "전체", name: "전체" }]);
  const [selectedArea, SetselectedArea] = useState("전체");
  const today = new Date();// 오늘 0시 0분 0초
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    
    const data = {
      startDate: format(startDate, "yyyy-MM-dd'T'00:00:00.SSSSSS"),
      endDate: format(endDate, "yyyy-MM-dd'T'23:59:59.SSSSSS"),
      county: location,
      dong: selectedArea,
    };
    console.log(data)
    Setsearch(data);

    // axios로 폼 데이터 전송
    axios
      .post("http://localhost:8081/api/record/search-by-detail", data)
      .then((res) => {
        console.log(res.data.responseData[0]);
        console.log(typeof res.data.responseData[0]);
        setTableData(res.data.responseData);

        console.log(tableData);

        // res.data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const locations = [
    { value: "전체", name: "전체" },
    { value: "광산구", name: "광산구" },
    { value: "동구", name: "동구" },
    { value: "서구", name: "서구" },
    { value: "남구", name: "남구" },
    { value: "북구", name: "북구" },
  ];

  const locationChange = (e) => {
    console.log(e.target.value);
    Setlocation(e.target.value);
    change(e);
  };
  const change = (e) => {
    if (e.target.value === "광산구") {
      Setarea([
        { value: "전체", name: "전체" },
        { value: "수완동", name: "수완동" },
        { value: "장덕동", name: "장덕동" },
        { value: "하남동", name: "하남동" },
        { value: "우산동", name: "우산동" },
      ]);
    } else if (e.target.value === "북구") {
      Setarea([
        { value: "전체", name: "전체" },
        { value: "두암동", name: "두암동" },
        { value: "일곡동", name: "일곡동" },
        { value: "매곡동", name: "매곡동" },
        { value: "오치동", name: "오치동" },
      ]);
    } else if (e.target.value === "동구") {
      Setarea([
        { value: "전체", name: "전체" },
        { value: "동명동", name: "동명동" },
        { value: "충장동", name: "충장동" },
        { value: "지산동", name: "지산동" },
        { value: "산수동", name: "산수동" },
      ]);
    } else if (e.target.value === "서구") {
      Setarea([
        { value: "전체", name: "전체" },
        { value: "서창동", name: "서창동" },
        { value: "풍암동", name: "풍암동" },
        { value: "치평동", name: "치평동" },
        { value: "금호동", name: "금호동" },
      ]);
    } else if (e.target.value === "남구") {
      Setarea([
        { value: "전체", name: "전체" },
        { value: "양림동", name: "양림동" },
        { value: "봉선동", name: "봉선동" },
        { value: "백운동", name: "백운동" },
        { value: "주월동", name: "주월동" },
      ]);
    } else if (e.target.value === "전체") {
      Setarea([{ value: "전체", name: "전체" }]);
      SetselectedArea("전체");
    }
  };

  const areaChange = (e) => {
    console.log(e.target.value);
    // Setarea([{ value: e.target.value, name: e.target.value }]);
    SetselectedArea(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!endDate) {
      alert("날짜를 잘못 선택하였습니다! 다시 선택해주세요");
      return;
    }

    const data = {
      startDate: format(startDate, "yyyy-MM-dd'T'00:00:00.SSSSSS"),
      endDate: format(endDate, "yyyy-MM-dd'T'23:59:59.SSSSSS"),
      county: location,
      dong: selectedArea,
    };
    // console.log(endDate)
    Setsearch(data);

    // axios로 폼 데이터 전송
    axios
      .post("http://localhost:8081/api/record/search-by-detail", data)
      .then((res) => {
        console.log(res.data.responseData[0]);
        console.log(typeof res.data.responseData[0]);
        setTableData(res.data.responseData);
        console.log(tableData);

        // res.data
      })
      .catch((error) => {
        console.log(error);
      });
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

    data.forEach((test) => {
      console.log(test);
    });

    axios
      .post("http://localhost:8081/api/record/download", data, {
        responseType: "blob", // blob 형태로 데이터를 받아옴
      })
      .then((res) => {
        // Blob 데이터를 이용해 엑셀 파일 생성
        const file = new Blob([res.data], { type: "application/vnd.ms-excel" });
        // 엑셀 파일 다운로드 링크 생성
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement("a");
        const startDate = search.startDate.slice(0, 10);
        const endDate = search.endDate.slice(0, 10);

        a.href = fileURL;
        a.download =
          "(" +
          startDate +
          "~" +
          endDate +
          ")" +
          " 단속현황_조회_" +
          search.county +
          " " +
          search.dong +
          ".xlsx";
        a.click();
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
      dong: search.dong,
    };

    console.log(data);

    axios
      .post("http://localhost:8081/api/record/statistics", data)
      .then((res) => {
        console.log("12345");
        console.log(res.data.responseData[0]);
        const responseData = res.data.responseData[0].county;

        setChartData(responseData);
        setstatistic(true);

        for (let key in responseData) {
          console.log(key);
        }

        responseData.forEach((test) => {
          console.log(test);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closestatistic = () => {
    console.log("closestatistic");

    setstatistic(false);
  };

  const maxDate = new Date();
  const minDate = () => {
    new Date();
    minDate.setMonth(minDate.getMonth() - 90);
  };

  return (
    <div className={styles.background}>
      <TopNav />
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
                  selectsRange
                  onChange={(update) => {
                    setStartDate(update[0]);
                    setEndDate(update[1]);
                    console.log(update);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="yyyy/MM/dd"
                  className={styles.calendar}
                  todayButton="Today"
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
                {
                  // area &&
                  area.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))
                }
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
            <UserTable tableData={tableData} />
          </div>
        </div>
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
                    {format(startDate, "yyyy.MM.dd", { locale: ko })} ~{" "}
                    {format(endDate, "yyyy.MM.dd", { locale: ko })}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                  <Chart
                    startDate={startDate}
                    endDate={endDate}
                    chartData={chartData}
                  />
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
