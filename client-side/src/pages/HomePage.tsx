import { Box } from "@chakra-ui/react";
import { ADMIN_ROLE, COACH_ROLE, STUDENT_ROLE } from "../Helpers/constants";
import AdminHomePage from "../components/HomePages/AdminHomePage";
import CoachHomePage from "../components/HomePages/CoachHomePage";
import StudentHomePage from "../components/HomePages/StudentHomePage";

const HomePage = () => {
  const role = localStorage.getItem("role");

  return (
    <Box mt={10}>
      {(role === STUDENT_ROLE && (
        <>
          <StudentHomePage />
        </>
      )) ||
        (role === ADMIN_ROLE && (
          <>
            <AdminHomePage />
          </>
        )) ||
        (role === COACH_ROLE && (
          <>
            <CoachHomePage />
          </>
        ))}
    </Box>
  );
};

export default HomePage;
