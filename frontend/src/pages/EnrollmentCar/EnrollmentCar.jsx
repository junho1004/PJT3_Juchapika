import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./EnrollmentCar.module.css";
// import car from "../../assets/car3.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EnrollmentCar() {
  const [posts, setPosts] = useState([]);
  const [InputText, setInputText] = useState("");
  const [nail, setsumnail] = useState(null);
  // const [carnum, setcarnum] = useState(InputText);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clickitem = (title, id) => {
    setInputText(title);

    const post1 = posts.find((post) => post.id === id);
    const thumbnailUrl = post1 ? post1.thumbnailUrl : "";
    setsumnail(thumbnailUrl);
  };
  // thumbnailUrl을 이용한 로직 처리

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const button = (e) => {
    e.preventDefault();
    setInputText(InputText);
  };

  return (
    <div className={styles.background}>
      <TopNav />
      <div className={styles.body}>
        <div className={styles.now}>
          <div className={styles.now1}>
            {posts.map((post) => (
              <div
                className={styles.nums}
                key={post.id}
                onClick={() => clickitem(post.title, post.id)}
              >
                <div className={styles.num}>{post.title}</div>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imgcon}>
          {!nail && <div>리스트에서 차량 번호를 선택해주세요</div>}
          {nail && <img src={nail} alt="logo" className={styles.img} />}
        </div>

        <div className={styles.detailscon}>
          <div className={styles.details}>
            <div className={styles.detail}>
              <div className={styles.title}>차량번호</div>
              <div className={styles.data1}>
                <form onSubmit={button} style={{ width: "60%" }}>
                  <input
                    type="text"
                    value={InputText}
                    onChange={onChange}
                    className={styles.input}
                  />
                </form>
                <div onClick={button} className={styles.button}>
                  <div>수정</div>
                </div>
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.title}>적발일시</div>
              <div className={styles.data}>{InputText}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>적발장소</div>
              <div className={styles.data}>적발장소</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.title}>납부금액</div>
              <div className={styles.data}>납부금액</div>
            </div>
            <div className={styles.bill}>
              <div
                className={styles.button1}
                onClick={() => {
                  navigate("/feeletter", { state: { data: InputText } });
                }}
              >
                고지서 미리보기
              </div>
            </div>
          </div>
          <div className={styles.button2} style={{ marginBottom: "3%" }}>
            납부 알림 메시지 전송
          </div>
          <div className={styles.button2}>삭제</div>
        </div>
      </div>
    </div>
  );
}
