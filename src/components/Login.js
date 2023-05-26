import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Login({ onLogin }) {
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
    onLogin(inputs);
    resetForm();
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__menu_item">
          Регистрация
        </Link>
      </Header>
      <main>
        <div className="popup__container popup__contaner_log">
          <h2 className="popup__title popup__title_log">Вход</h2>
          <form className="popup__form" onSubmit={handleSubmit}>
            <input                      
              type="email"
              required              
              name="email"              
              value={inputs.email}
              onChange={handeleChange}
              placeholder="Email"
              className="popup__input popup__input_log"              
            />
            <input            
              type="password"
              required
              name="password"
              placeholder="Пароль"
              value={inputs.password}
              onChange={handeleChange}
              className="popup__input popup__input_log"
            />
            <button className="popup__save popup__save_log" type="submit">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
