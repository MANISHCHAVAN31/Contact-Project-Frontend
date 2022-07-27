import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateUser from "./pages/admin/CreateUser";
import DisplayUser from "./pages/admin/DisplayUser";
import RetreiveUser from "./pages/admin/RetreiveUser";
import UpdateUser from "./pages/admin/UpdateUser";
import Login from "./pages/Login";
import CreateContact from "./pages/staff/CreateContact";
import CreateContactDetail from "./pages/staff/CreateContactDetail";
import DisplayContact from "./pages/staff/DisplayContact";
import RetreiveContact from "./pages/staff/RetreiveContact";
import StaffDashboard from "./pages/staff/StaffDashboard";
import UpdateContactDetail from "./pages/staff/UpdateContactDetail";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard/:username" element={<AdminDashboard />} />
        <Route path="/createuser/:username" element={<CreateUser />} />
        <Route path="/displayuser/:username" element={<DisplayUser />} />
        <Route
          path="/updateuser/:username/:usertoupdate"
          element={<UpdateUser />}
        />
        <Route path="/retreiveuser/:username" element={<RetreiveUser />} />
        {/* staff users */}
        <Route path="/staffdashboard/:username" element={<StaffDashboard />} />
        <Route path="/createstaff/:username" element={<CreateContact />} />
        <Route path="/createcontact/:username" element={<CreateContact />} />
        <Route path="/displaycontact/:username" element={<DisplayContact />} />
        <Route
          path="/createcontactdetail/:username"
          element={<CreateContactDetail />}
        />
        <Route
          path="/retreivecontact/:username"
          element={<RetreiveContact />}
        />
        <Route
          path="/updatecontactdetail/:username/:contactdetailid"
          element={<UpdateContactDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
