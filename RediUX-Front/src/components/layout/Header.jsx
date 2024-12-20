import React, { useContext } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";

const Header = () => {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  const handleLogout = () => {
    toast.success("Logout efetuado com sucesso.");
    logout();
  };

  return (
    <header className="bg-gray text-white h-28 flex justify-center items-center">
      <div className="flex justify-between items-center w-11/12">
        <Link to="/">
          <img src="/svg/logo.svg" alt="RediUX Logo" />
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-status-red flex items-center gap-2 hover:opacity-50"
          >
            <BsBoxArrowRight size={24} /> Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
