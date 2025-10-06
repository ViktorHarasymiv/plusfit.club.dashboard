import { Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function Dashboard() {
  return (
    <section>
      <h1>Інформаційна панель</h1>
      <Home />
    </section>
  );
}
