import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Header = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray text-white h-28 flex justify-center items-center">
      <div className="flex justify-between items-center w-11/12">
        <Link to="/">
          <img src="/svg/logo.svg" alt="RediUX Logo" />
        </Link>

        {isAuthenticated && (
          <button
            onClick={logout}
            className="red_dark_outline_btn_layout w-2/12"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
