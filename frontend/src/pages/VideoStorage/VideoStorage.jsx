import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./VideoStorage.module.css";

const baseUrl = process.env.REACT_APP_API_URL;

export default function VideoStorage() {
  const [posts, setPosts] = useState([]);
  const [modal1, Setmodal1] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
  ///이거 블로그에 올릴것 이기능에 title 데이터를 넣어서 set에 넣음
  const openModal = (title) => {
    Setmodal1(true);
    setSelectedTitle(title);
  };
  const closeModal = () => {
    Setmodal1(false);
  };

  return (
    <div className={styles.background}>
      <TopNav/>
      <div className={styles.body}>
        <div className={styles.starts}>
          <div style={{ fontSize: "1.5em", fontWeight: "600" }}>영상리스트</div>
          <div style={{ padding: "5% 0% 5% 0%" }}>
            <div className={styles.center}>
              <div>오늘({getDate()})</div>
            </div>
            <div className={styles.list}>
              {posts.map((post) => (
                <div
                  onClick={() => openModal(post.title)}
                  className={styles.videos}
                  key={post.id}
                >
                  <div className={styles.video1}>
                    {post.id}
                    <div className={styles.video}>{post.title}</div>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal1 && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div onClick={closeModal} className={styles.x}>
              <div>x</div>
            </div>
            <div className={styles.modalin}>
              <div className={styles.centre}>{selectedTitle}</div>
              <div className={styles.centre} style={{ padding: "5%" }}>
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  width="500"
                  height="300"
                  controls
                />
              </div>
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
