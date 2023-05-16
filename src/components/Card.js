import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ data, onCardClick, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = data.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = data.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    onCardClick(data);
  }

  function handleDeleteClick() {
    onDeleteClick(data);
  }

  function handleLikeClick() {
    onLikeClick(data);
  }

  return (
    <li className="element">
      <img
        src={data.link}
        alt={data.name}
        className="element__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="element__trash"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      )}
      <div className="element__title-and-like">
        <h2 className="element__title">{data.name}</h2>
        <div className="element__like-and-counter">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="element__like-counter">{data.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
