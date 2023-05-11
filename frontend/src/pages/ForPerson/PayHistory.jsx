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
                  width="500"
                  height="300"
                  controls
                />
                  {/* <img
                    src={pic}
                    alt="go"
                    className={styles.carimage}
                    style={{ width: "150px", marginRight: "20px" }}
                  /> */}

                  <div className={styles.contenttext}>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>소유주</span>
                      <span className={styles.texts}> 이름</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>전화번호</span>
                      <span className={styles.texts}> 번호</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>주소</span>
                      <span className={styles.texts}>주소</span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>번호판</span>
                      <span className={styles.texts}>
                        {" "}
                        {/* <img
                          src={carnumber}
                          alt="go"
                          style={{ width: "100px" }}
                        /> */}
                      </span>
                    </div>
                    <div className={styles.name}>
                      <span style={{ width: "40%" }}>납부유무</span>
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
      </div>
    // </div>
  );
}
