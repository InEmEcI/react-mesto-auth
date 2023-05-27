import { Link } from "react-router-dom";
import Header from "./Header";
import LogReg from "./LogReg";

function Register({ onRegistred }) {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__menu_item">
          Войти
        </Link>
      </Header>

      <LogReg
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        onSubmit={onRegistred}
        children={
          <>
            <div className="registred">
              Уже зарегистрированы? &nbsp;
              <Link className="registred__link" to="/sign-in">
                Войти
              </Link>
            </div>
          </>
        }
      ></LogReg>
    </>
  );
}

export default Register;
