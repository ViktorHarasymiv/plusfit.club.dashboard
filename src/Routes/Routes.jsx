import { Routes, Route } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

import Dashboard from "../components/Dashboard/Dashboard";

import PrivateRoute from "../components/PrivateRoute";
import Home from "../components/Home/Home";
import Subscription from "../components/pages/Subscription/Subscription";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Trainers from "../components/pages/Trainers/Trainers";
import Message from "../components/pages/Message/Message";
import Portfolio from "../components/pages/Portfolio/Portfolio";
import SliderHero from "../components/pages/SliderHero/SliderHero";

// import NotFound from "../NotFound/NotFound";

function Router() {
  return (
    <>
      <Routes>
        {/* Публічні сторінки */}
        <Route path="/" element={<Home />} />

        {/* Захищені маршрути */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="info" element={<Dashboard />} />
            <Route path="subscribers" element={<Subscription />} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="message" element={<Message />} />
            <Route path="slider" element={<SliderHero />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Route>

        {/* Сторінка 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default Router;
