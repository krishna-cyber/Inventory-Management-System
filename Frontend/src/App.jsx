import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dahboard";
import Homepage from "./pages/home/homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/reset/:token' element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
