import Login from "../Login/Login";

import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { hasAccess } = useAuth();

  return (
    <>
      {!hasAccess ? (
        <Login />
      ) : (
        <>
          <h2>
            Ви в системі
            <Link to={"/dashboard"}> перейти в панель</Link>
          </h2>
        </>
      )}
    </>
  );
}
