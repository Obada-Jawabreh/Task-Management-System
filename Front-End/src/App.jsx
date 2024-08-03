import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./Pages/Signup";
import LogIn from "./Pages/Login";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
