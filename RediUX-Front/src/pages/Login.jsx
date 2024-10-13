import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import StringField from "../components/form/StringField";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("O campo de e-mail não pode estar vazio.");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("O campo de senha não pode estar vazio.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateEmail() || !validatePassword()) return;
    try {
      await login(email, password);
      navigate("/content-manager");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main
      className="container flex flex-col justify-center items-center bg-gray-light md:flex-row gap-16"
      style={{ minHeight: "calc(100dvh - 7rem)", minWidth: "100vw" }}
    >
      <img
        src="/img/hero_login.png"
        alt="RediUX Logo"
        className="w-3/4 md:w-1/4 mb-8"
      />
      <div className="flex flex-col justify-center items-center w-3/4 md:w-2/6 gap-4 bg-white p-8 rounded-lg md:py-16 md:px-12">
        <img
          src="/img/horizontal_logo.png"
          alt="RediUX Logo"
          className="w-3/4 mb-8"
        />
        <StringField
          label="Digite seu e-mail"
          placeholder="E-mail"
          type="email"
          onChange={setEmail}
          error={emailError}
        />
        <StringField
          label="Digite sua senha"
          placeholder="Senha"
          type="password"
          onChange={setPassword}
          error={passwordError}
        />
        <button className="blue_dark_btn_layout" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </main>
  );
};

export default Login;
