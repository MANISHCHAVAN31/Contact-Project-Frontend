import React, { useEffect, useState } from "react";
import StaffNavbar from "../../components/staff/StaffNavbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContactDetail = () => {
  const [contactDetailParameter, setContactDetailParameter] = useState("");
  const [contactDetailValue, setContactDetailValue] = useState("");
  const id = useParams().contactdetailid;
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const handleUpdateContactDetail = async (e) => {
    e.preventDefault();
    let resp = await axios
      .put("http://localhost:9000/updatecontactdetail", {
        contactDetailId: id,
        parameter: contactDetailParameter,
        value: contactDetailValue,
      })
      .catch((error) => {
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      toast.success(resp.data, { autoClose: 1000 });
      Navigate(`/displaycontact/${currentUser}`);
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
  }, []);
  return (
    <div>
      <StaffNavbar />

      <div className="container mt-5 col-5 bg-light text-center shadow">
        <div className="py-3">
          <h2 className="text-center fw-bold">Update Contact Detail</h2>
        </div>
        <div className="my-2">
          <form onSubmit={handleUpdateContactDetail}>
            <div className="mb-2">
              <div className="dropdown">
                <button
                  className="btn btn-outline-info text-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {contactDetailParameter === "" ? (
                    "Select Parameter"
                  ) : (
                    <span className="mx-2">{contactDetailParameter}</span>
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
                        setContactDetailParameter("type");
                      }}
                    >
                      Type
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setContactDetailParameter("number");
                      }}
                    >
                      Number
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-2 mt-3">
              <label htmlFor="value" className="form-label">
                New Value to Update
              </label>
              <input
                type="text"
                className="form-control"
                id="value"
                value={contactDetailValue}
                onChange={(e) => {
                  setContactDetailValue(e.target.value);
                }}
              />
            </div>
            <div className="d-grid mt-3 pb-4">
              <button type="submit" className="btn btn-info">
                Update Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactDetail;
