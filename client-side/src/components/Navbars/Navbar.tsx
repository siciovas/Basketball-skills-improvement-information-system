import { STUDENT_ROLE } from "../../Helpers/constants";
import { GuestNavbar } from "./GuestNavbar";
import StudentNavbar from "./StudentNavbar";

const Navbar = () => {
  const role = localStorage.getItem("role");
  return <>{role === STUDENT_ROLE ? <StudentNavbar /> : <GuestNavbar />}</>;
};

export { Navbar };
