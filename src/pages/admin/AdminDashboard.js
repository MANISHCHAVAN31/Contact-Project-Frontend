import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";

const AdminDashboard = () => {
  const currentUser = useParams().username;

  // const checkAuthentication = async () => {
  //   const resp = await axios
  //     .post("http://localhost:9000/checkAuthentication", { currentUser })
  //     .catch((error) => {
  //       console.log(error);
  //       return;
  //     });

  //   if (resp) {
  //     console.log(resp);
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default AdminDashboard;
