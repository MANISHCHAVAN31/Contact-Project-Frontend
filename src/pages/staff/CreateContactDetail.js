import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StaffNavbar from "../../components/staff/StaffNavbar";

const CreateContactDetail = () => {
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [contact, setContact] = useState("");
  const currentUser = useParams().username;
  const [contactData, setContactData] = useState({});

  const loadContacts = async () => {
    let resp = await axios
      .post("http://localhost:9000/getcontacts", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setContactData(resp.data);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "" || number === "" || contact === "") {
      toast.error("Please fill complete information", { autoClose: 1000 });
      return;
    }

    let newNumber = parseInt(number);
    if (isNaN(newNumber)) {
      toast.error("Number should be in numeric format", { autoClose: 1000 });
      return;
    }

    if (number.length !== 10) {
      toast.error("Number should be of 10 digits only", { autoClose: 1000 });
      return;
    }

    let resp = await axios
      .post("http://localhost:9000/createcontactdetail", {
        contactId: contact,
        type,
        number,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      toast.success("Contact Detail created successfullly", {
        autoClose: 1000,
      });
      return;
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);
  return (
    <div>
      <StaffNavbar />

      <div className="container col-6 mt-4">
        <div className="card shadow">
          <div className="card-header text-center display-6 fw-bold bg-info text-white">
            Create New Contact Detail
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-center">
                <div className="dropdown">
                  <button
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {contact === "" ? (
                      "Select Contact"
                    ) : (
                      <span className="mx-2">{contact}</span>
                    )}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {Object.values(contactData).map((data) => (
                      <li key={data.id}>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            setContact(data.id);
                            console.log(data.id);
                          }}
                        >
                          {data.firstname} {data.lastname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Type Of User
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="number">
                  Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="number"
                  id="number"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid mb-1">
                <button className="btn btn-info" type="submit">
                  create contact detail
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactDetail;
