import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/admin/Navbar";

const RetreiveUser = () => {
  const [allUserData, setAllUserData] = useState({});
  const Navigate = useNavigate();
  const currentUser = useParams().username;

  const loadUserData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getallusersincludingdeleted")
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp);
      setAllUserData(resp.data);
    }
  };

  const retreiveUser = async (username) => {
    let resp = await axios
      .post(`http://localhost:9000/retreiveuser/?username=${username}`)
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      toast.success(resp.data, { autoClose: 1000 });
      loadUserData();
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
      <div className="container mt-5">
        <table className="table table-bordered border-info">
          <thead className="border-dark">
            <tr className="bg-info text-center">
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(allUserData).map((data) => (
              <tr key={data.id} className="text-center">
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.credential.username}</td>
                <td>{data.role}</td>
                {/* <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() =>
                      Navigate(
                        `/updateuser/${currentUser}/${data.credential.username}`
                      )
                    }
                  >
                    update
                  </button>
                </td> */}
                <td>
                  {data.deletedAt !== null ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      retreive
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      disabled
                    >
                      retreive
                    </button>
                  )}

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Do you really want to delete user ?
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
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              retreiveUser(data.credential.username);
                            }}
                          >
                            Retreive Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetreiveUser;
