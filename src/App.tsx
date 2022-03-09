import { Link, Route, Routes } from "react-router-dom";
import { PollingWithRequestAnimationFrame } from "./pages/PollingWithRequestAnimationFrame";
import { PollingWithSetIntervall } from "./pages/PollingWithSetIntervall";
import { PollingWithSetTimeout } from "./pages/PollingWithSetTimeout";

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/">Polling With Set Timout</Link></li>
        <li><Link to="/request-animation">Polling With Request Animation Frame</Link></li>
        <li><Link to="/interval">Polling With Set Intervall</Link></li>
      </ul>
      <Routes>
        <Route path="/request-animation" element={<PollingWithRequestAnimationFrame />} />
        <Route path="/interval" element={<PollingWithSetIntervall />} />
        <Route path="/" element={<PollingWithSetTimeout />} />
      </Routes>
    </div>
  );
}

export default App;
