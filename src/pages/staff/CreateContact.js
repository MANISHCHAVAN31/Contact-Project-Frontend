import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StaffNavbar from "../../components/staff/StaffNavbar";

const CreateContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const currentUser = useParams().username;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      toast.error("Please fill complete information", { autoClose: 1000 });
      return;
    }

    let resp = await axios
      .post("http://localhost:9000/createcontact", {
        username: currentUser,
        firstName,
        lastName,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success("Contact created successfully", { autoClose: 1000 });
      return;
    }
  };

  return (
    <div>
      <StaffNavbar />

      <div className="container col-6 mt-4">
        <div className="card shadow">
          <div className="card-header text-center display-6 fw-bold bg-info text-white">
            Create New Contact
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
              <div className="d-grid mb-1">
                <button className="btn btn-info" type="submit">
                  create contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
