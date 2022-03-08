import { Route, Routes } from "react-router-dom";
import { PollingWithSetIntervall } from "./pages/PollingWithSetIntervall";
import { PollingWithSetTimeout } from "./pages/PollingWithSetTimeout";

function App() {
  return (
    <div className="App">
      <ul>
        <li><a href="/">Polling With Set Timout</a></li>
        <li><a href="/interval">Polling With Set Intervall</a></li>
      </ul>
      <Routes>
        <Route path="/interval" element={<PollingWithSetIntervall />} />
        <Route path="/" element={<PollingWithSetTimeout />} />
      </Routes>
    </div>
  );
}

export default App;
