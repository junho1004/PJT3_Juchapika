import React from "react";
import styles from "./PayHistory.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useState, useEffect } from "react";

export default function PayHistory() {
  const navigate = useNavigate();
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
    <div className={styles.background}>
      <div className={styles.nav}>
        <div>납부이력</div>
      </div>
      <div className={styles.body}>
        <div className={styles.mininav}>
          <div className={styles.content1}>
            <div className={styles.center}>
              <div style={{ fontWeight: "700", fontSize: "1.8em" }}>
                231 가 2475
              </div>
              <div>차량소유자: 정우영</div>
            </div>
            <hr style={{ marginTop: "30px", width: "100%" }}></hr>
          </div>
          <div
            onClick={() => {
              navigate("/feeletter");
            }}
            className={styles.content}
          >
            주정차위반과태료
          </div>
          <div
            className={styles.content}
            style={{ fontWeight: "800" }}
            onClick={() => {
              navigate("/payhistory");
            }}
          >
            납부이력
          </div>
        </div>
        <div className={styles.area}>
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
          {modal && (
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
      </div>
    // </div>
  );
}
