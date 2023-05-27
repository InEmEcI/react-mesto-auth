import { Link } from "react-router-dom";
import Header from "./Header";
import LogReg from "./LogReg";

function Login({ onLogin }) {
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__menu_item">
          Регистрация
        </Link>
      </Header>

      <LogReg title={"Вход"} buttonText={"Войти"} onSubmit={onLogin}></LogReg>
    </>
  );
}

export default Login;
