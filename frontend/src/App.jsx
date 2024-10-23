import Dashboard from "./components/Dashboard";
import LoginForm from "./components/Login";
import SignupForm from "./components/SignupForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials= true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
