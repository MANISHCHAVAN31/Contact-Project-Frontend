import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RetreiveContactDetail from "../../components/staff/RetreiveContactDetail";
import StaffNavbar from "../../components/staff/StaffNavbar";

const RetreiveContact = () => {
  const currentUser = useParams().username;
  const [allContacts, setAllContacts] = useState({});

  const retreiveContact = async (id) => {
    let resp = await axios
      .post("http://localhost:9000/retreivecontact", {
        contactId: id,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      toast.success(resp.data, { autoClose: 1000 });
      loadDeletedContacts();
      return;
    }
  };

  const loadDeletedContacts = async () => {
    let resp = await axios
      .post("http://localhost:9000/getallcontactsincludingdeleted", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setAllContacts(resp.data);
      return;
    }
  };

  useEffect(() => {
    loadDeletedContacts();
  }, []);

  return (
    <div>
      <StaffNavbar />

      <div className="container">
        <div className="my-3">
          <h1 className="text-center">Retreive Deleted Contacts</h1>
        </div>
        <div>
          <table className="table table-bordered border-info text-center">
            <thead>
              <tr className="bg-info border-dark">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Retrieve</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(allContacts).map((data) => (
                <tr key={data.id}>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>
                    {data.deletedAt === null ? (
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
                        onClick={() => retreiveContact(data.id)}
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

      {/* table for contact details */}
      <RetreiveContactDetail user={currentUser} />
    </div>
  );
};

export default RetreiveContact;
