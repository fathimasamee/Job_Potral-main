import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Admin from "./pages/Admin";
import NoPage from "./pages/NoPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobseeker" element={<JobSeekerProfile />} />
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
