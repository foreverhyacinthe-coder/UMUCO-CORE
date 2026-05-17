import UmucoAuth from "./UmucoAuth";
import Dashboard from "./Dashboard";
import AiPage from "./ai";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UmucoAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </Router>
  );
};

export default App;
