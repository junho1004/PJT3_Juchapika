import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./LivePage.module.css";
import LiveStream from "./LiveStream";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

const { kakao } = window;

export default function VideoStorage() {
  const [time1, setTime] = useState(new Date());
  const [battery1, setbattery] = useState();
  const [bottime, setbottime] = useState("");

  const unsub = onSnapshot(doc(db, "Turtlebot3", "signal_battery"), (doc) => {
    setbattery(doc.data().percentage);
    console.log(unsub1);
  });
  const unsub1 = onSnapshot(doc(db, "Turtlebot3", "signal_time"), (doc) => {
    setbottime(doc.data().start_time);
  });
  const aDate = new Date(bottime);
  const timeDiff = time1.getTime() - aDate.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const remainingMinutes = minutesDiff % 60;
  const remainingSeconds = secondsDiff % 60;

  useEffect(() => {
    mapscript();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    unsub();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(35.20385105018441, 126.81088552898503),
      level: 5,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    const myMarker = new kakao.maps.Marker({
      map: map,
      position: map.getCenter(),
    });
    myMarker.setMap(map);
  };
  function formatTimeFromPercentage(percentage) {
    const totalHours = 2; // 총 시간(시간) 설정, 여기서는 2시간으로 가정합니다.
    const minutes = Math.floor((percentage / 100) * (totalHours * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  }
  const formattedTime = formatTimeFromPercentage(battery1);
  return (
    <div className={styles.background}>
      <TopNav />
      <div className={styles.body}>
        <div className={styles.starts}>
          <LiveStream />
        </div>
        <div className={styles.rightcont}>
          <div className={styles.speaker}>
            <div className={styles.time}>
              <div style={{ fontWeight: "600", marginBottom: "5%" }}>
                현재시간
              </div>
              <div>{time1.toLocaleTimeString()}</div>

              <hr style={{ width: "80%", margin: "10%" }}></hr>
              <div style={{ fontWeight: "600", marginBottom: "5%" }}>
                주행시간
              </div>
              <div>
                {hoursDiff}시 {remainingMinutes}분 {remainingSeconds}초
              </div>
            </div>
            <div className={styles.time1}>
              실시간 <br /> 배터리잔량
              <div className={styles.batterybar}>
                <div
                  className={styles.batteryprogress}
                  style={{ width: `${battery1}%` }}
                ></div>
                <div className={styles.num}>{battery1}%</div>
              </div>
              <span style={{ fontSize: "0.9em" }}>{formattedTime}</span>
            </div>
          </div>
          <div className={styles.gps}>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
