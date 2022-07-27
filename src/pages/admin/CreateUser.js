import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/admin/Navbar";

const CreateUser = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      password === "" ||
      role === ""
    ) {
      toast.error("Please fill complete information", { autoClose: 1000 });
      return;
    }

    let resp = await axios
      .post("http://localhost:9000/createuser", {
        firstName,
        lastName,
        username,
        password,
        role,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success("User created", { autoClose: 1000 });
      return;
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container col-6 mt-4">
        <div className="card shadow">
          <div className="card-header text-center display-6 fw-bold bg-info text-white">
            Create New User
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="role">
                  Role of User
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid mb-1">
                <button className="btn btn-info" type="submit">
                  create user
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
