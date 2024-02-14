import './App.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div><Outlet /></div>
    </div>
  );
}

export default App;
