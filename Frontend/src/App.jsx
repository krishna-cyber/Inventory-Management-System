import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dahboard";
import Homepage from "./pages/home/homepage";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
