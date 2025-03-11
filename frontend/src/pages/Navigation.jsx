import { Link , useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../styles/home.css";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="navbar">
            
            {location.pathname === "/Faculty_home" ? (
                <><Button className="nav-button" onClick={() => navigate("/Home")}>Home</Button>
                <Button className="nav-button" onClick={() => navigate("/")}>Logout</Button></>
            ) : (
                <Button className="nav-button" onClick={() => navigate("/Faculty_home")}>Back</Button>
            )
            }
            
        </div>
    );
}
