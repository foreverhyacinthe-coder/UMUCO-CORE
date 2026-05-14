import UmucoAuth from "./UmucoAuth";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<UmucoAuth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;