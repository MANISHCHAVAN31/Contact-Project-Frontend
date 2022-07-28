import axios from "axios";
import React, { useState, useLocation, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/admin/Navbar";

const UpdateUser = () => {
  const currentUser = useParams().username;
  const userToUpdate = useParams().usertoupdate;
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState({});
  const Navigate = useNavigate();

  const loadUserData = async () => {
    let resp = await axios
      .post("http://localhost:9000/getuser", { username: userToUpdate })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp);
      setUserData(resp.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData.id);
    let resp = await axios
      .put("http://localhost:9000/updateuser", {
        userid: userData.id,
        parameter,
        value,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success(resp.data, { autoClose: 1000 });
      return;
    }
  };

  const checkoutUser = async () => {
    let resp = await axios
      .get(`http://localhost:9000/checkoutuser/?username=${currentUser}`)
      .catch((error) => {
        console.log(error);
        Navigate("/");
        return;
      });

    if (resp) {
      console.log(resp);
      console.log("User is checked out");
      return;
    }
  };

  useEffect(() => {
    checkoutUser();
    loadUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container bg-light col-5 mt-5 text-center shadow rounded">
        <h2 className="display-6 fw-bold py-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="dropdown">
              <a
                className="btn btn-info dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {parameter === "" ? (
                  "Select Parameter"
                ) : (
                  <span className="mx-2">{parameter}</span>
                )}
              </a>
              <ul
                className="dropdown-menu bg-info"
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setParameter("firstname");
                    }}
                  >
                    First Name
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setParameter("lastname");
                    }}
                  >
                    Last Name
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setParameter("role");
                    }}
                  >
                    Role
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setParameter("username");
                    }}
                  >
                    Username
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="value">
              Value to Update
            </label>
            <input
              className="form-control"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-info mb-3 mt-2" type="submit">
              update value
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
