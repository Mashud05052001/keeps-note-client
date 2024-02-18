import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="text-black">
      <div className="flex justify-center navbar-items">
        <NavLink
          className={`place-items-center px-8 py-3 rounded-md font-medium duration-100`}
          to={"/"}
        >
          All Notes
        </NavLink>
        <div className="divider divider-horizontal"></div>
        <NavLink
          className="place-items-center px-8 py-3 rounded-md font-medium duration-100"
          to={"/addNote"}
        >
          Add New Notes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
