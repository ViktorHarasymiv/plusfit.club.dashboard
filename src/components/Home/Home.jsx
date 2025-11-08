import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Auth from "../Auth/Auth";

export default function Welcome() {
  const { authorized } = useAuth();

  return (
    <>
      {!authorized ? (
        <Auth />
      ) : (
        <>
          <h2>
            Ви в системі
            <Link to={"/dashboard/info"}> перейти в панель</Link>
          </h2>
        </>
      )}
    </>
  );
}
