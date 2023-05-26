import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const newAvatarRef = useRef();

  useEffect(() => {
    newAvatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: newAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        ref={newAvatarRef}
        id="avatar-input"
        autoComplete="off"
        type="url"
        required
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__avatar-input"
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
