import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const SubCard = ({ contactDetailData, loadContacts }) => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;
  const handleDeleteContactDetail = async (id) => {
    let resp = await axios
      .delete(
        `http://localhost:9000/deletecontactdetail/?contactDetailId=${id}`
      )
      .catch((error) => {
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      toast.success(resp.data, { autoClose: 1000 });
      loadContacts();
      return;
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-evenly">
        {Object.values(contactDetailData).map((detailData) => (
          <div className="col-3" key={detailData.id}>
            <div className="card shadow">
              <div className="card-body">
                <p>
                  <span className="h6 fw-bold">Type: </span>
                  {detailData.type}
                </p>
                <p>
                  <span className="h6 fw-bold">Number: </span>
                  {detailData.number}
                </p>
                <button
                  type="button"
                  className="me-2 btn btn-outline-primary btn-sm"
                  onClick={() => {
                    Navigate(
                      `/updatecontactdetail/${currentUser}/${detailData.id}`
                    );
                  }}
                >
                  update
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteContactDetailModal"
                  onClick={() => {
                    console.log(detailData);
                    handleDeleteContactDetail(detailData.id);
                  }}
                >
                  delete
                </button>
                {/* delete modal */}
                <div
                  className="modal fade"
                  id="deleteContactDetailModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Do you really want to delete contact detail ?
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
                            console.log(detailData);
                            handleDeleteContactDetail(detailData.id);
                          }}
                        >
                          Delete Contact Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCard;
