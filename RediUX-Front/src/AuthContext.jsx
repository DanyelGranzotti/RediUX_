import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
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

const decryptToken = (encryptedToken) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  const encryptToken = (token) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    return CryptoJS.AES.encrypt(token, secretKey).toString();
  };

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const encryptedToken = localStorage.getItem("jwt");
    if (encryptedToken) {
      const token = decryptToken(encryptedToken);
      const decodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp <= currentTimestamp) {
        logout();
      }
    }
  }, [logout]);

  const loadUserFromLocalStorage = useCallback(() => {
    const encryptedToken = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    if (encryptedToken && user) {
      const token = decryptToken(encryptedToken);
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
  }, [logout]);

  useEffect(() => {
    loadUserFromLocalStorage();
    setLoading(false);
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [checkTokenExpiration, loadUserFromLocalStorage]);

  const login = useCallback(async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const { token, user } = data;
      const encryptedToken = encryptToken(token);
      localStorage.setItem("jwt", encryptedToken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: { token, user },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, decryptToken };
