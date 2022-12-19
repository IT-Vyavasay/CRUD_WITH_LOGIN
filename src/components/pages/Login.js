// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Home } from "./Home";

const s1 = "";
const getData = () => {};
export const Login = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState();
  const [s1, setS1] = useState([]);
  const [s2, setS2] = useState([]);

  const [students, setStudents] = useState();
  const { id } = useParams();
  console.log(id, "Hii");
  useEffect(() => {
    const students = axios
      .get(`http://localhost:3333/students/${id}`)
      .then((data) => {
        setStudents(data.data);
      })
      .catch((err) => {
        console.log(err, "Error");
      });
    console.log(pass, 111, students, "hii");
  }, []);

  useEffect(() => {
    pass === students?.password
      ? setS1("You logged in")
      : setS1("Please enter correct password");
  }, [pass]);

  // const ch = 5;
  // ch === 5 ? setS1('You logged in'):setS1('Please enter correct password');

  return (
    <>
      <div className="row">
        <div>
          <h4 className="text-center alert alert-info">
            Show Student Information
          </h4>
          Password: <form></form>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <h1>{pass}</h1>
          <h1>{students?.password}</h1>
          <button
            onClick={() => {
              setS2(s1);
              navigate("/", { state: { message: s1 } });
            }}
          >
            Submit
          </button>
          {/* <h1>{s1}</h1> */}
          <h1>Break</h1>
          <h1>{s2}</h1>
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export const Ans = (props) => {
  return (
    <>
      <h1>
        {props.data} {props.data1}
      </h1>
    </>
  );
};
