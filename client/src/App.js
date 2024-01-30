import './App.css';
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"

function App() {
  return (
    <div>
      <div><NavBar /></div>
      <div><Outlet /></div>
    </div>
  );
}

export default App;
