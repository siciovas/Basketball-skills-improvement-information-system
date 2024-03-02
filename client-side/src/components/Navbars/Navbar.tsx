import { useEffect, useState } from "react";
import {
  ADMIN_ROLE,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from "../../Helpers/constants";
import AdminNavbar from "./AdminNavbar";
import GuestNavbar from "./GuestNavbar";
import StudentNavbar from "./StudentNavbar";
import TeacherNavbar from "./TeacherNavbar";
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
              <StudentNavbar />
            </>
          )) ||
            (role === ADMIN_ROLE && (
              <>
                <AdminNavbar />
              </>
            )) ||
            (role === TEACHER_ROLE && (
              <>
                <TeacherNavbar />
              </>
            ))}
        </>
      )}
    </>
  );
};

export { Navbar };
