import { ADMIN_ROLE, STUDENT_ROLE, TEACHER_ROLE } from "../../Helpers/constants";
import AdminNavbar from "./AdminNavbar";
import GuestNavbar from "./GuestNavbar";
import StudentNavbar from "./StudentNavbar";
import TeacherNavbar from "./TeacherNavbar";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

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
  )
};

export { Navbar };
