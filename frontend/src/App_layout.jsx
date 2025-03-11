import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";

import Home from "./pages/Student_home";
import Layout from "./components/layout/layout";

function App_layout() {
  const [role, setRole] = useState(localStorage.getItem("role")); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role")); 
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  console.log("Current Role:", role);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />
        <Route
          path="/Faculty_home"
          element={role === "user" ? <Layout /> : <Navigate to="/" />}
        />
        <Route path="/student_details/:rollno" element={role === "user" ? <Home /> : <Navigate to="/" />} 

        />
        <Route
          path="/Admin_dashboard"
          element={role === "admin" ? <Admin_dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App_layout;
