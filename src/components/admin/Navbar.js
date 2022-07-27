import axios from "axios";
import React from "react";
import { FcCallback } from "react-icons/fc";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BiExit } from "react-icons/bi";

const Navbar = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;

  const logoutUser = async () => {
    let resp = await axios
      .get("http://localhost:9000/logout")
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp);
      Navigate("/");
      toast.success("User logged out succesfully", { autoClose: 1000 });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`/admindashboard/${currentUser}`}>
            <FcCallback className="mx-3" size={40} />
            <span className="fw-bold h2">
              CONTACTS <span className="lead">admin</span>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="text-center fw-bold text-secondary">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Contact
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/createuser/${currentUser}`}
                      >
                        Create User
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/displayuser/${currentUser}`}
                      >
                        Display User
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/retreiveuser/${currentUser}`}
                  >
                    Retreive
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-outline-danger" onClick={logoutUser}>
            <BiExit className="me-2" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
