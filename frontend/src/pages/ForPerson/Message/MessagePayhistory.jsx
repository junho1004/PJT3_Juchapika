import React from "react";
import styles from "./MessagePayhistory.module.css";
import axios from "axios";
// import axios from "axios";
import { useState, useEffect } from "react";

// const baseUrl = process.env.REACT_APP_API_URL;

export default function MessagePayhistory() {
  const [posts, setPosts] = useState([]);
  const [modal, Setmodal] = useState(false);

  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const openModal = (title) => {
    Setmodal(true);
    setSelectedTitle(title);
  };
  const closeModal = () => {
    Setmodal(false);
  };

  return (
    
        <div className={styles.area}>
                <div className={styles.list}>
                  {posts.map((post) => (
                    <div
                      onClick={() => openModal(post.title)}
                      className={styles.videos}
                      key={post.id}
                    >
                      <div className={styles.video1}>
                        <div style={{width:"20%"}}>{post.id}</div>
                        <div className={styles.video}>{post.title}</div>
                      </div>
                      <hr></hr>
                    </div>
                  ))}
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
                    차번호
                  </div>
                </div>
                <div className={styles.modaltext}>
                  <div style={{ fontSize: "0.7em", marginBottom: "10px" }}>
                    {selectedTitle}
                  </div>
                </div>
                <hr></hr>
                <div className={styles.modaltext1}>
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls
                />

                  <div className={styles.contenttext}>
                    
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>소유주</span>
                      <span className={styles.texts}> 이름</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>전화번호</span>
                      <span className={styles.texts}> 번호</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>주소</span>
                      <span className={styles.texts}>주소</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "50%" }}>납부유무</span>
                      <span className={styles.texts}>
                        {/* {fee === "납부완료" ? (
                          <span style={{ color: "blue" }}>납부완료</span>
                        ) : (
                          <span style={{ color: "red" }}>미납</span>
                        )} */}납부완료
                      </span>
                    </div>
                  </div>
               
                </div>
              </div>
            </div>
            <div className={styles.back} onClick={closeModal}></div>
          </div>
        )}
        </div>
  );
}
