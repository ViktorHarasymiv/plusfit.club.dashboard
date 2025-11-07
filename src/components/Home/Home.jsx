import { useAuth } from "../../context/AuthContext";
import Login from "../Login/Login";
import { Link } from "react-router-dom";

export default function Welcome() {
  const { authorized } = useAuth();

  return (
    <>
      {!authorized ? (
        <Login />
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
