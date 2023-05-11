import React from "react";
// import axios from "axios";
import { useEffect } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./LivePage.module.css";
import LiveStream from "./LiveStream"

export default function VideoStorage() {


  useEffect(() => {}, []);

  return (
    <div className={styles.background}>
      <TopNav />
      <div className={styles.body}>
        <div className={styles.starts}>
          
              <div><LiveStream/></div>
           
         
        </div>
      </div>
    </div>
  );
}
