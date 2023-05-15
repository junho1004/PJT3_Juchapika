import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./LivePage.module.css";
import LiveStream from "./LiveStream";
import micimg from "../../assets/mic.png"
import offmic from "../../assets/offmic.png"
import io from 'socket.io-client';

const { kakao } = window;
const socket = io('ws://52.79.199.205:8082');

export default function VideoStorage() {
  const [time, setTime] = useState(new Date());
  const [mic,setmic] = useState(false)
  const [value1, setValue1] = useState(''); ///시간주행시간
  const [value2, setValue2] = useState(0); ////배터리잔량


  useEffect(() => {
    mapscript();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    socket.on('message', (data) => {
      const { value1, value2 } = JSON.parse(data);
      setValue1(value1);
      setValue2(value2);
    });
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

const clickmic=()=>{
  setmic(!mic)
  console.log(value1)
  console.log(value2)
}

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
            <div style={{ fontWeight: "600", marginBottom:"5%" }}>현재시간</div>
              <div> : {time.toLocaleTimeString()}</div>
              <hr style={{width:"80%", margin:"10%"}}></hr>
              <div style={{ fontWeight: "600", marginBottom:"5%" }}>주행시간</div>
              <div> : {time.toLocaleTimeString()} {value1}{value2}</div>
            </div>
            <div className={styles.time1} onClick={clickmic}>
              <div style={{ fontWeight: "600", marginBottom:"5%" }}>스피커</div>
              <div style={{ width: "50%", textAlign: "center"}}>
              {mic ? <img src={micimg} alt="a" className={styles.mic} /> : <img src={offmic} alt="b" className={styles.mic}/>}
              </div>
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
