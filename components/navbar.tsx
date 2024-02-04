import React from "react";
import "./styles/navbar.scss";
import { IoIosMenu } from "react-icons/io";

interface NavbarProps {
  toggleComponent: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleComponent }) => {
  return (
    <>
      <div className="navbar">
        <div className="delta">
          <a
            href="https://www.instagram.com/_saiyam_dubey/"
            title="instagram"
            className="red"
          ></a>
          <a
            href="https://www.linkedin.com/in/saiyam-dubey-77a5371b8/"
            title="linkedin"
            className="yellow"
          ></a>
          <a
            href="https://github.com/saiyamdubey"
            title="github"
            className="green"
          ></a>
        </div>
        <div className="sidenav">
          <div className="menu">
            <IoIosMenu
              onClick={toggleComponent}
              className="menuicon"
              style={{ color: "white", fontSize: "3em" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
