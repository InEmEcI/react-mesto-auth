import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSumbitEdit(evt) {
    evt.preventDefault();
    props.onEditUser({
      name,
      about: description,
    });
  }

  function handleNameEdit(evt) {
    const text = evt.target.value;
    setName(text);
  }

  function handleAboutEdit(evt) {
    const text = evt.target.value;
    setDescription(text);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSumbitEdit}
    >
      <input
        id="name-input"
        autoComplete="off"
        type="text"
        required
        placeholder="Имя"
        name="name"
        className="popup__input popup__input_name"
        minLength="2"
        maxLength="40"
        value={name ?? ""}
        onChange={handleNameEdit}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="about-input"
        autoComplete="off"
        type="text"
        required
        placeholder="Профессия"
        name="about"
        className="popup__input popup__input_about"
        minLength="2"
        maxLength="200"
        value={description ?? ""}
        onChange={handleAboutEdit}
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
