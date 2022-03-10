import { Link, Route, Routes } from "react-router-dom";
import { PollingTimeoutToggle } from "./pages/PollingTimeoutToggle";
import { PollingWithRequestAnimationFrame } from "./pages/PollingWithRequestAnimationFrame";
import { PollingWithSetIntervall } from "./pages/PollingWithSetIntervall";
import { PollingWithSetTimeout } from "./pages/PollingWithSetTimeout";
import { UseMemoExample } from "./pages/UseMemoExample";
import { UseReducerExample } from "./pages/UseReducerExample";
import { UseRefExample } from "./pages/UseRefExample";

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/">Polling With Set Timout</Link></li>
        <li><Link to="/toggle">Polling (With Toggle) With Set Timout</Link></li>
        <li><Link to="/request-animation">Polling With Request Animation Frame</Link></li>
        <li><Link to="/interval">Polling With Set Intervall</Link></li>
        <li><Link to="/useref">Use Ref Example</Link></li>
        <li><Link to="/usememo">Use Memo Example</Link></li>
        <li><Link to="/usereducer">Use Reducer Example</Link></li>
      </ul>
      <Routes>
        <Route path="/request-animation" element={<PollingWithRequestAnimationFrame />} />
        <Route path="/interval" element={<PollingWithSetIntervall />} />
        <Route path="/toggle" element={<PollingTimeoutToggle />} />
        <Route path="/useref" element={<UseRefExample />} />
        <Route path="/usereducer" element={<UseReducerExample />} />
        <Route path="/usememo" element={<UseMemoExample />} />
        <Route path="/" element={<PollingWithSetTimeout />} />
      </Routes>
    </div>
  );
}

export default App;
