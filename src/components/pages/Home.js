// @ts-nocheck
import React, { useState, useEffect } from "react";
import View from "./View";
import Edit from "../pages/Edit";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  //-----------------------------------------------RETRIVE
  useEffect(() => {
    async function getAllStudent() {
      const students = await axios.get("http://localhost:3333/students");
      setStudents(students.data);
    }
    getAllStudent();
  });

  //-------------------------------------------->CREATE
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
    password: "",
    note: "",
  });
  const [status, setStatus] = useState();

  function onTextFieldChange(e) {
    console.log(e.target.value);
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/students`, student);
      setStatus(true);
    } catch (error) {
      console.log("Something is Wrong");
    }
  }
  if (status) {
    return <Home />;
  }
  //------------------------------------------------DELETE

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3333/students/${id}`);
    // below code used for refresh page
    var newstudent = students.filter((item) => {
      return item.id !== id;
    });
    setStudents(newstudent);
  };
  //............................................................Image save..................................

  //........................................... User interface .............................................
  return (
    <>
      <div class="row">
        <h1>{location.state?.message}</h1>
        <div class="col-sm-4">
          <h4 class="text-center alert alert-info">Add New Student</h4>
          <form action="" method="POST">
            <div class="form-group">
              Name:{" "}
              <input
                type="text"
                name="stuname"
                class="form-control"
                placeholder="Enter your Full Name"
                onChange={(e) => onTextFieldChange(e)}
              />
              <br></br>
              Email Id:{" "}
              <input
                type="text"
                name="email"
                class="form-control"
                placeholder="Enter your Valid Email ID"
                onChange={(e) => onTextFieldChange(e)}
              />
              <br></br>
              Password:{" "}
              <input
                type="text"
                name="password"
                class="form-control"
                placeholder="Enter Password"
                onChange={(e) => onTextFieldChange(e)}
              />
              <br></br>
              Note:{" "}
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note If you want to add"
                onChange={(e) => onTextFieldChange(e)}
              />
              <br></br>
            </div>
            <button onClick={(e) => onFormSubmit(e)}>Add</button>
          </form>
        </div>

        <div class="col-sm-7 offset-1">
          <h4 class="text-center alert alert-info">Show Student Information</h4>
          {/* {% if stu %} */}

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{student.stuname}</td>
                      <td>{student.email}</td>

                      <td>
                        <Link to={`/View/${student.id}`}>
                          <a>👁 </a>
                        </Link>
                        <Link to={`/Edit/${student.id}`}>
                          <a>🖊️ </a>
                        </Link>
                        <button onClick={() => handleDelete(student.id)}>
                          🗑️{" "}
                        </button>
                        <Link to={`/Login/${student.id}`}>
                          <a>LG</a>
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <h4 class="text-center alert alert-warning">No Records</h4>
      </div>
    </>
  );
};
