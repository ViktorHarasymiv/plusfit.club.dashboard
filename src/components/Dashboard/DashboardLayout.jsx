// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

import "./Dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
