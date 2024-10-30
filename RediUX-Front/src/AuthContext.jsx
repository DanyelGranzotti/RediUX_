import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { loginUser } from "./api/entities/user";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");

    if (token && user) {
      const decodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTimestamp) {
        dispatch({
          type: "LOAD_USER",
          payload: { token, user: JSON.parse(user) },
        });
      } else {
        logout();
      }
    }

    setLoading(false);

    const interval = setInterval(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (decodedToken.exp <= currentTimestamp) {
          logout();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const { token, user } = data;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: { token, user },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
