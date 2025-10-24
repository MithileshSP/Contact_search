import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../pages/Navigation";
import myimage from "../assets/profile.jpg";
import "../styles/home.css";
import { IoCall } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { IoCalendarSharp } from "react-icons/io5";
import { HiBriefcase } from "react-icons/hi2";

export default function Home() {
    const { rollno } = useParams(); 
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/student_details/${rollno}`);

                const response = await fetch(`http://contactsearch-production.up.railway.app/student_details/`);
                if (!response.ok) throw new Error("Failed to fetch student data");
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (rollno) fetchStudentData();
    }, [rollno]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!student) return <p>No student found.</p>;

    return (
        <div className="home-container">
            <Navbar />
            <div className="info">
                <img src={myimage} height="100" className="dp" alt="Profile"/>
                <p id="content">
                    {student.name}
                    <br />
                    <div>{student.rollno}</div>
                    <div id="sem">SEMESTER - {student.semester}</div>
                    <div id="con">{student.status}</div>
                </p>
                <div><p id="content2">{student.course}</p></div>
                <div><span id="men">Mentor: </span><span id="nm">{student.mentor}</span><span id="call"><IoCall /></span></div><br />
                <div><span id="men">Warden: </span><span id="nm">{student.warden}</span><span id="call"><IoCall /></span></div><br />
            </div>
            <div className="attendence">
                <div id="at">Attendance Overview</div>
                <div id="ic1">
                    <span id="icon1"><LuClock3 /></span>
                    <span id="to">Total Days <br /><span id="num">{student.totaldays}</span></span>
                    <span id="iconn1"><IoCalendarSharp /></span>
                    <span id="to">Present Days <br /><span id="num">{student.presentdays}</span></span>
                </div>
                <div id="ic1">
                    <span id="icon2"><HiBriefcase /></span>
                    <span id="to">Leave <br /><span id="num">{student.leavedays}</span></span>
                    <span id="iconn2"><LuClock3 /></span>
                    <span id="to">Percentage <br /><span id="num">{student.percentage}%</span></span>
                </div>
            </div>
            <div className="cgpa">
                <span id="cum">Cumulative Grade Point Average (CGPA)</span><br />
                <span id="na">{student.cgpa}</span>
            </div>
        </div>
    );
}
