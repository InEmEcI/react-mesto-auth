import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          type="button"
          onClick={props.onEditAvatar}
          className="profile__change-image-btn"
        >
          <img
            src={currentUser.avatar}
            className="profile__image"
            alt="аватар"
          />
        </button>
        <div className="profile__about">
          <div className="profile__name-and-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit"
              type="button"
            ></button>
          </div>
          <p className="profile__who-is-this">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-new"
          type="button"
        ></button>
      </section>

      <section>
        <ul className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              data={card}
              onCardClick={props.onCardClick}
              onClose={props.onClose}
              onDeleteClick={props.onDeleteClick}
              onLikeClick={props.onLikeClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
