// DashboardLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

import "./style.css";
import HeadBar from "../HeadBar/HeadBar";

import { useMenuStore } from "../../store/useMenuStore";
import { useEffect } from "react";
import Footer from "../pages/Footer/Footer";
import PageBar from "../HistoryBar/HistoryBar";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function DashboardLayout() {
  const location = useLocation();
  const width = useWindowWidth();

  const { isPinned, setPinned, isHover, setIsHover } = useMenuStore();

  const isMobile = width < 767.98;

  useEffect(() => {
    setPinned(false);
    setIsHover(false);
  }, [location]);

  return (
    <div className="one_page_module">
      <Sidebar />
      <div className="main-wrapper">
        <main
          className="main-content"
          style={{
            marginLeft: (isHover || isPinned) && !isMobile ? "81.6px" : "0px",
          }}
        >
          <HeadBar />
          <PageBar />
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
