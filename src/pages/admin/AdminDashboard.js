import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";

const AdminDashboard = () => {
  const currentUser = useParams().username;
  const Navigate = useNavigate();

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
      <Navbar />
    </div>
  );
};

export default AdminDashboard;
