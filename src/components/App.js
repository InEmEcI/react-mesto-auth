import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(data) {
    setSelectedCard({ ...data, isOpen: true });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAddClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function allPopupsClose() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    api
      .getUser()
      .then(setCurrentUser)
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  function handleCardLike(data) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = data.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(data._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === data._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDelete(data) {
    api
      .removeCard(data._id)
      .then(() => {
        setCards((prevState) =>
          prevState.filter((item) => item._id !== data._id)
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUserEdit(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        allPopupsClose();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleAvatarEdit(data) {
    api
      .changeUserAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        allPopupsClose();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function hendleNewPlase(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        allPopupsClose();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleEditAddClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onLikeClick={handleCardLike}
          onDeleteClick={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onEditUser={handleUserEdit}
          onClose={allPopupsClose}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleAvatarEdit}
          onClose={allPopupsClose}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onUpdatePlace={hendleNewPlase}
          onClose={allPopupsClose}
        />

        <ImagePopup card={selectedCard} onClose={allPopupsClose} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
