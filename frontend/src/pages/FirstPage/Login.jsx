import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import locker from "../../assets/locker.png";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  let [loginId, setLoginId] = useState("");
  let [loginpassword, setLoginpassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);
  // const [post, setPosts] = useState([]);
  const sessionStorage = window.sessionStorage;
  
  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setLoginId(cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie("rememberId", loginId, { maxAge: 2000 });
    } else {
      removeCookie("rememberId");
    }
  };
  const login = async () => {
    const data = {
      userId: loginId,
      password: loginpassword,
    };
    axios
      .post("https://juchapika.site/api/user/signin", data)
      .then((res) => {
        sessionStorage.setItem("token", res.data.responseData.token);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
        alert("아이디나 비밀번호를 확인해주세요");
        setLoginId("")
        setLoginpassword("")
      });
  };
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };


  return (
    <div className={styles.body}>
      <div className={styles.body2}>
        <div className={styles.body3}>
          <div className={styles.title1}>
            <div className={styles.title}>Admin System</div>
          </div>
          <hr></hr>
          <div className={styles.logo}>
            <img src={logo} alt="logo" style={{ width: "150px" }} />
          </div>
          <div className={styles.detail}>
            <div className={styles.id}>
              <img src={user} alt="user" style={{ width: "30px" }} />
              <input
                type="text"
                className={styles.box}
                onChange={(e) => {
                  setLoginId(e.target.value);
                }}
                style={{ fontSize: "1.2em" }}
                placeholder="ID"
                value={loginId}
                onKeyDown={onCheckEnter}
              />
            </div>
            <div className={styles.id}>
              <img src={locker} alt="user" style={{ width: "30px" }} />
              <input
                type="password"
                className={styles.box}
                onChange={(e) => {
                  setLoginpassword(e.target.value);
                }}
                value={loginpassword}
                style={{ fontSize: "1.2em" }}
                placeholder="Password"
                onKeyDown={onCheckEnter}
              />
            </div>
          </div>
          <label className={styles.logintext}>
            <input
              type="checkbox"
              onChange={handleOnChange}
              checked={isRemember}
            />
            Save ID
          </label>
          <div className={styles.arr}>
            <div className={styles.loginbtn} onClick={login}>
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
