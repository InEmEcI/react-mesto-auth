import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name,
      link,
    });
  }

  function handleNameEdit(evt) {
    const text = evt.target.value;
    setName(text);
  }

  function handleLinkEdit(evt) {
    const text = evt.target.value;
    setLink(text);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-input"
        autoComplete="off"
        type="text"
        required
        name="name"
        placeholder="Название"
        className="popup__input popup__input_card-name"
        minLength="2"
        maxLength="30"
        onChange={handleNameEdit}
        value={name}
      />
      <span className="popup__input-error place-name-input-error"></span>
      <input
        id="photo-link-input"
        autoComplete="off"
        type="url"
        required
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_photo-link"
        onChange={handleLinkEdit}
        value={link}
      />
      <span className="popup__input-error photo-link-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
