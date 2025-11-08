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

  const isMobile = width < 991.98;

  useEffect(() => {
    if (isPinned || isHover) {
      setPinned(false);
      setIsHover(false);
    } else return;
  }, [location]);

  return (
    <div className="one_page_module">
      <Sidebar />
      <div
        className="main-wrapper"
        style={{
          maxWidth:
            !isPinned && !isMobile && width > 1391.98
              ? "85%"
              : !isPinned && !isMobile
              ? "77%"
              : null,
        }}
      >
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
