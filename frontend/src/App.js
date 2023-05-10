import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"
import Main from './pages/Main';

//비디오저장소
import VideoStorage from './pages/VideoStorage/VideoStorage'
//로그인
import Login from './pages/FirstPage/Login';

//차량등록
import EnrollmentCar from './pages/EnrollmentCar/EnrollmentCar'

//실시간영상

//범법자용 고지서
import Feeletter from "./pages/ForPerson/FeeLetter";
import PayHistory from "./pages/ForPerson/PayHistory"

// Kinesis video stream
import LiveStream from "./pages/LiveStream/LiveStream";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/videostorage" element={<VideoStorage />} />
          <Route exact path="/feeletter" element={<Feeletter />} />
          <Route exact path="/payhistory" element={<PayHistory />} />
          <Route exact path="/live" element={<LiveStream />} />
          <Route exact path="/enrollmentcar" element={<EnrollmentCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
