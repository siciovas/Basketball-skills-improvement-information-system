import { useEffect, useState } from "react";
import { ADMIN_ROLE, STUDENT_ROLE, COACH_ROLE } from "../../Helpers/constants";
import AdminNavbar from "./AdminNavbar";
import GuestNavbar from "./GuestNavbar";
import StudentNavbar from "./StudentNavbar";
import TeacherNavbar from "./CoachNavbar";
import eventBus from "../../Helpers/eventBus";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    eventBus.on("storage", () => {
      setToken(localStorage.getItem("accessToken"));
      setRole(localStorage.getItem("role"));
    });
  }, []);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    eventBus.dispatch("logOut", "");
  };

  return (
    <>
      {!token ? (
        <>
          <GuestNavbar />
        </>
      ) : (
        <>
          {(role === STUDENT_ROLE && (
            <>
              <StudentNavbar logOut={logout} />
            </>
          )) ||
            (role === ADMIN_ROLE && (
              <>
                <AdminNavbar logOut={logout} />
              </>
            )) ||
            (role === COACH_ROLE && (
              <>
                <TeacherNavbar logOut={logout} />
              </>
            ))}
        </>
      )}
    </>
  );
};

export { Navbar };
