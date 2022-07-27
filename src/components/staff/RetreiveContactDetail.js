import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RetreiveContactDetail = ({ user }) => {
  const [contactDetails, setContactDetails] = useState({});

  const loadContactDetails = async () => {
    let resp = await axios
      .post("http://localhost:9000/getcontactdetailsincludingdeleted", {
        username: user,
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    if (resp) {
      console.log(resp);
      setContactDetails(resp.data);
    }
  };

  const retreiveContactDetail = async (id) => {
    let resp = await axios
      .post("http://localhost:9000/retreivecontactdetail", {
        contactDetailId: id,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success(resp.data, { autoClose: 1000 });
      loadContactDetails();
      return;
    }
  };

  useEffect(() => {
    loadContactDetails();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="my-3">
          <h1 className="text-center">Retreive Deleted Contact Details</h1>
        </div>
        <div>
          <table className="table table-bordered border-info text-center">
            <thead>
              <tr className="bg-info border-dark">
                <th>Type</th>
                <th>Number</th>
                <th>Retrieve</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(contactDetails).map((details) => (
                <tr key={details.id}>
                  <td>{details.type}</td>
                  <td>{details.number}</td>
                  <td>
                    {details.deletedAt === null ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        disabled
                      >
                        retreive
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          retreiveContactDetail(details.id);
                        }}
                      >
                        retreive
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RetreiveContactDetail;
