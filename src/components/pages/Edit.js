// @ts-nocheck
import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";  
import { useState, useEffect } from "react";

const Edit = () => {

  const { id } = useParams();
  
  const [student, setStudent] = useState({
   stuname: "",
   email: "",
   note:''
  }); 
  useEffect(() => {
   async function getStudent() {
    try {
     const student = await axios.get(`http://localhost:3333/students/${id}`)
     // console.log(student.data);
     setStudent(student.data);
    } catch (error) {
     console.log("Something is Wrong");
    }
   }
   getStudent();
  }, [id]);
 
// --------------------------------------------EDIT 
  
  function onTextFieldChange(e) {
   setStudent({
    ...student,
    [e.target.name]: e.target.value
   })
  }
 
  async function onFormSubmit(e) {
   e.preventDefault()
   try {
    await axios.put(`http://localhost:3333/students/${id}`, student)
 
   } catch (error) {
    console.log("Something is Wrong");
   }
  }

//---------------------------------------------->USER INTERFACE


  return (
    <> 
      <div class="row">
        <div class="col-sm-4">
          <h4 class="text-center alert alert-info">Add New Student</h4>
          <form action="" method="POST">
            <div class="form-group">
              Name: <input type="text" name="stuname" defaultValue={student.stuname} onChange={e => onTextFieldChange(e)}  class="form-control" />
              <br></br>
              Email Id: <input type="text" name="email" defaultValue={student.email} onChange={e => onTextFieldChange(e)}  class="form-control" />
              <br></br>
              Notes: <input type="text" name="note" defaultValue={student.note} onChange={e => onTextFieldChange(e)}  class="form-control" />
              <br></br>
 
            </div>
            <button onClick={e => onFormSubmit(e)}>Add</button>
            <Link to="/"><button>Back To Home</button></Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
