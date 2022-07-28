import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StaffNavbar from "../../components/staff/StaffNavbar";
import axios from "axios";

const StaffDashboard = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;

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
  });
  return (
    <div>
      <StaffNavbar />
    </div>
  );
};

export default StaffDashboard;
