import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import React from "react"

//로그인
import Login from './pages/FirstPage/Login';

//네비
import Viewer from './useViewer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/live" element={<Viewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
