import { useState } from "react";

function LogReg({ title, buttonText, children, onSubmit }) {
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
    onSubmit(inputs);
    resetForm();
  }

  return (
    <>
      <main>
        <div className="popup__container popup__contaner_log">
          <h2 className="popup__title popup__title_log">{title}</h2>
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
              {buttonText}
            </button>
          </form>
          {children}
        </div>
      </main>
    </>
  );
}

export default LogReg;
