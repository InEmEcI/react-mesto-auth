import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegistred }) {
  const defaultInput = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(defaultInput);

  function handeleChange(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function resetForm() {
    setInputs({ ...defaultInput });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistred(inputs);
    resetForm();
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__menu_item">
          Войти
        </Link>
      </Header>

      <main>
        <div className="popup__container popup__contaner_log">
          <h2 className="popup__title popup__title_log">Регистрация</h2>
          <form className="popup__form" onSubmit={handleSubmit}>
            <input
              id="sing-up-email-input"
              type="email"
              required
              name="email"
              value={inputs.email}
              onChange={handeleChange}
              placeholder="Email"
              className="popup__input popup__input_log"
            />
            <input
              id="sing-up-password-input"
              type="password"
              required
              value={inputs.password}
              onChange={handeleChange}
              name="password"
              placeholder="Пароль"
              className="popup__input popup__input_log"
            />
            <button className="popup__save popup__save_log" type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className="registred">
            Уже зарегистрированы? &nbsp;
            <Link className="registred__link" to="/sign-in">
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
