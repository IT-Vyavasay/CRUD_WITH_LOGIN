// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


const View = () => {  
  const [students, setStudents] = useState([]);
  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    async function getStudent() {
      const students = await axios.get(`http://localhost:3333/students/${id}`);
      setStudents(students.data);}getStudent();}, [id]);




 



  return (
    <>
      <div class="row">
        <div>
          <h4 class="text-center alert alert-info">Show Student Information</h4>
          {/* {% if stu %} */}
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{id}</th>
                <td>{students.stuname}</td>
                <td>{students.email}</td>
                <td>{students.note}</td>
              </tr>
            </tbody> 
          </table>

          {/* {% else %} */}
          <Link to="/"><button>Back to Home</button></Link>
           
          {/* {% endif %} */}
        </div>
      </div>
    </>
  );
};

export default View;
