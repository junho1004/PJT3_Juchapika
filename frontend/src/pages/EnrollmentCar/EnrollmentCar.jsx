import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import TopNav from "../../components/Nav/TopNav";
import styles from "./EnrollmentCar.module.css";
// import car from "../../assets/car3.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EnrollmentCar() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { data1 } = location.state ?? { data1: "" }; // feeletter에서 차 넘버로 받아옴 이거는 feeletter 고지서미리보기 버튼을 누르지 않으면 실행 nono
  const { data2 } = location.state ?? { data2: "" }; /// feeletter에서 받아온 id임 이걸로 axios에서 받아오면돼 다시 
  const [InputText, setInputText] = useState(data1); //고지서미리보기 버튼을 누르지 않았으면 data가 null값 이니깐 작동 가능
  const [nail, setsumnail] = useState(null);
  const [id, setid] = useState(data2 || "");
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
    
  }, [InputText]);
  useEffect(() => {
  }, []);
  
  const clickitem = (title, id) => {
    setInputText(title);
    // 이부분 axios로 받아와야함
    setid(id);
    // postsss(id)
    const post = posts.find((post) => post.id === id); //id가 같으면 그 객체가 가지고 있는 사진
    const thumbnailUrl = post ? post.thumbnailUrl : "";
    setsumnail(thumbnailUrl); ///사진을 받아온거임
    }
  

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
                  navigate("/feeletter", {
                    state: { data1: InputText, data2: id },
                  });
                }}
                // "inputtext"(=즉 carnum) 이부분에 들어간 걸 feeletter로 보내는 거임 id는 id
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
