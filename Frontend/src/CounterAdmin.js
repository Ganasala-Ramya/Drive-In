import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Settings, Logout, Store, RestaurantMenu, Restaurant } from "@mui/icons-material";
// import Psn from "/Imagess/psnlogo2.png";
import "./App.css"; // Use same styling if needed
import "bootstrap/dist/css/bootstrap.min.css";

function CounterAdmin() {
  const navigate = useNavigate();

  const navItems = [
    { path: "/counter/counters", label: "Counters", icon: <Restaurant /> },
    { path: "/counter/counterprofiles", label: "Counter Profiles", icon: <Store /> },
    { path: "/counter/counteravailability", label: "Counter Availability", icon: <RestaurantMenu /> },
    { path: "/counter/countersetting", label: "Settings", icon: <Settings /> },
    { path: "/logout", label: "Logout", icon: <Logout /> },
  ];

  return (
    <div>
      {/* Top Header */}
      <div className="d-flex align-items-center p-3 border-bottom">
        {/* <img src={Psn} alt="Logo" style={{ height: "40px", marginRight: "15px" }} /> */}
        <h5 className="mb-0">The Place Drive In</h5>
      </div>

      <div className="d-flex">
        {/* Left Sidebar */}
        <div className="adminsidenav p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `btn d-flex align-items-center gap-2 my-2 px-3 w-100 ${
                  isActive ? "btn-primary" : "btn-warning"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Panel */}
        <div className="adminmain p-4 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CounterAdmin;
