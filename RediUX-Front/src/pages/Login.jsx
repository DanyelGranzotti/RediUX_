import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("O campo de e-mail não pode estar vazio.");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Formato de e-mail inválido.");
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
      const response = await login(email, password);

      if (response) {
        toast.success("Login efetuado com sucesso. Redirecionando...");
        navigate("/content-manager");
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error("E-mail ou senha inválidos.");
        return;
      }
      toast.error("Erro ao efetuar login. Tente novamente mais tarde.");
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
      <div
        className="flex flex-col justify-center items-center w-3/4 md:w-2/6 gap-4 bg-white p-8 rounded-lg md:py-16 md:px-12"
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      >
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
