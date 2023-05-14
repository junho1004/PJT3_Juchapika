import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"
import Main from './pages/Main';

//로그인
import Login from './pages/FirstPage/Login';

//차량등록
import EnrollmentCar from './pages/EnrollmentCar/EnrollmentCar'

//실시간영상

//범법자용 고지서
import Feeletter from "./pages/ForPerson/FeeLetter";
import PayHistory from "./pages/ForPerson/PayHistory";
import MessageFine from "./pages/ForPerson/Message/MessageFine";
import MessagePayhistory from "./pages/ForPerson/Message/MessagePayhistory";

// // Kinesis video stream
// import LiveStream from "./pages/LiveStream/LiveStream";
import Livepage from "./pages/LiveStream/LivePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/feeletter" element={<Feeletter />} />
          <Route exact path="/payhistory" element={<PayHistory />} />
          <Route exact path="/messagefine" element={<MessageFine />} />
          <Route exact path="/messagepayhistory" element={<MessagePayhistory />} />
          <Route exact path="/livepage" element={<Livepage/>} />
          <Route exact path="/enrollmentcar" element={<EnrollmentCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
