import React, { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, CircularProgress, 
  Box, Avatar, Button 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FacultyHome({ searchQuery = '' }) {
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch("contactsearch-production.up.railway.app");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setStudentDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  const filteredStudents = studentDetails.filter((student) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      student.rollno?.toString().toLowerCase().includes(query) ||
      student.name?.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Student Details {searchQuery ? `- Search: "${searchQuery}"` : ''}
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && filteredStudents.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          No student records found.
        </Typography>
      )}

      {!loading && !error && filteredStudents.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                {["Roll No", "Name", "Semester", "CGPA", "Profile", "Action"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.rollno} hover>
                  <TableCell>{student.rollno}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.semster}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>
                    <Avatar src={student.profilepic} alt="Profile" sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell>
                  <Button 
                    variant="contained" color="primary"
                    onClick={() => navigate(`/student_details/${student.rollno}`)}
                  >
                  View
                  </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
