import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import logo from "../../assets/logo.png";
import magnifier from "../../assets/magnifier.png";

// eslint-disable-next-line react/prop-types
export default function TopNav({setSearchcar}) {
  const navigate = useNavigate();
  const [InputText, setInputText] = useState("");
  
  // let [modal, setModal] = useState(false);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
      const data=InputText
      e.preventDefault();
      setSearchcar(data)
      setInputText("");
      // console.log(data)
    }
  

  return (
    <nav className={styles.body}>
      <div className={styles.contentbox}>
        <div className={styles.block1}>
          <div
            className={styles.blockimg}
            onClick={() => {
              navigate("/main");
            }}
          >
            <img src={logo} alt="logo" style={{ width: "150px" }} />
          </div>
          <div
            className={styles.block}
            onClick={() => {
              navigate("/live");
            }}
          >
            LIVE
          </div>
          <div
            className={styles.block}
            onClick={() => {
              navigate("/videostorage");
            }}
          >
            VIDEO STORAGE
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.blocklogout}>
            <input
              type="text"
              value={InputText}
              onChange={onChange}
              className={styles.searchbox}
              placeholder="차량번호조회"
            />
            <div onClick={handleSubmit} className={styles.icon}> <img src={magnifier} alt="mag" style={{width:"20px"}}></img></div>
          </div>
        </form>
      </div>
    </nav>
  );
}
