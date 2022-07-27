import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StaffNavbar from "../../components/staff/StaffNavbar";
import SubCard from "./SubCard";

const DisplayContact = () => {
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const [contactData, setContactData] = useState({});
  const currentUser = useParams().username;

  const loadContacts = async () => {
    let resp = await axios
      .post("http://localhost:9000/getcontacts", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp.data);
      setContactData(resp.data);
    }
  };

  const handleUpdateContact = async (id) => {
    let resp = await axios
      .put("http://localhost:9000/updatecontact", {
        contactId: id,
        parameter,
        value,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success(resp.data, { autoClose: 1000 });
      loadContacts();
      return;
    }
  };

  const handleDeleteContact = async (id) => {
    let resp = await axios
      .delete(`http://localhost:9000/deletecontact/?contactId=${id}`)
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success(resp.data, { autoClose: 1000 });
      loadContacts();
      return;
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div>
      <StaffNavbar />
      <div className="container mt-4">
        <div className="my-3">
          <h2 className="text-center">All Contacts</h2>
        </div>
        <div className="row">
          <div className="col-12">
            {Object.values(contactData).map((data) => (
              <div className="card m-3 border" key={data.id}>
                <div className="card-header bg-info  shadow">
                  <div className="d-flex bd-highlight">
                    <p className="px-2 flex-grow-1 bd-highlight text-white h3">
                      {data.firstname} {data.lastname}
                    </p>
                    <button
                      type="button"
                      className=" mx-2 btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                    >
                      Update
                    </button>

                    {/* update modal */}
                    <div
                      className="modal fade"
                      id="updateModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog  text-center">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update Contact
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleUpdateContact}>
                              <div className="mb-2">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-outline-info text-dark dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {parameter === "" ? (
                                      "Select Parameter"
                                    ) : (
                                      <span className="mx-2">{parameter}</span>
                                    )}
                                  </button>
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
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
                                  </ul>
                                </div>
                              </div>
                              <div className="mb-2">
                                <label htmlFor="value" className="form-label">
                                  New Value to Update
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="value"
                                  value={value}
                                  onChange={(e) => {
                                    setValue(e.target.value);
                                  }}
                                />
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleUpdateContact(data.id);
                              }}
                            >
                              Update Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className=" mx-2 btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      Delete
                    </button>

                    {/* delete modal */}
                    <div
                      className="modal fade"
                      id="deleteModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog  text-center">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Do you really want to delete contact ?
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                handleDeleteContact(data.id);
                              }}
                            >
                              Delete Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* cards of contact details */}
                  <SubCard
                    contactDetailData={data.contactdetails}
                    loadContacts={loadContacts}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayContact;
