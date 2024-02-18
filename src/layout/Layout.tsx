import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <Container>
      <div className="mt-7">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </Container>
  );
};

export default Layout;
