import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await axios
      .post("http://localhost:9000/login", { username, password })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 1000,
        });
      });

    if (resp) {
      console.log(resp);
      if (resp.data.role === "admin") {
        Navigate(`/admindashboard/${username}`);
      } else if (resp.data.role === "staff") {
        Navigate(`/staffdashboard/${username}`);
      }
    }
  };

  return (
    <div>
      <div className="container text-center bg-white pt-5 mt-5 shadow">
        <p className="display-4">
          <span className="text-break">CONTACT APPLICATION</span>
        </p>
        <p className="h3">LOGIN SECTION</p>
        <div className="mt-4">
          <form className="col-6 offset-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid pt-2 pb-5">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
