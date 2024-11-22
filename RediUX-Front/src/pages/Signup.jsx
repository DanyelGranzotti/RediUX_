import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../api/entities/user";
import StringField from "../components/form/StringField";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSignup = async () => {
    if (!validateEmail() || !validatePassword() || !validateConfirmPassword())
      return;
    try {
      await signupUser(email, password);
      toast.success("Cadastro realizado com sucesso. Redirecionando...");
      navigate("/content-manager");
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente mais tarde.");
      console.error("Signup failed:", error);
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
          label="Digite o e-mail para acesso"
          placeholder="E-mail"
          type="email"
          onChange={setEmail}
          error={emailError}
        />
        <StringField
          label="Digite a senha para acesso"
          placeholder="Senha"
          type="password"
          onChange={setPassword}
          error={passwordError}
        />
        <StringField
          label="Confirme a senha para acesso"
          placeholder="Confirmar senha"
          type="password"
          onChange={setConfirmPassword}
          error={confirmPasswordError}
        />
        <button className="blue_dark_btn_layout" onClick={handleSignup}>
          Cadastrar
        </button>
      </div>
    </main>
  );
};

export default Signup;
