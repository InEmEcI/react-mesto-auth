import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute ";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [email, setEmail] = useState("");

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
    setMessage(null);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    setIsLoginIn(false);
  }

  function handleMessage(message) {
    setMessage(message);
  }

  function handleLogin(inputs) {
    auth
      .authorization(inputs)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        setIsLoginIn(true);
        setEmail(inputs.email);
        navigate("/");
      })
      .catch((error) => {
        const text =
          error.message || " Что-то пошло не так! Попробуйте ещё раз.";
        handleMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function handleRegistr(inputs) {
    auth
      .registration(inputs)
      .then(() => {
        handleMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        navigate("/sign-in");
      })
      .catch((error) => {
        const text =
          error.message || " Что-то пошло не так! Попробуйте ещё раз.";
        handleMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoginIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (isLoginIn) {
      api
        .getUser()
        .then(setCurrentUser)
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [isLoginIn]);

  useEffect(() => {
    if (isLoginIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [isLoginIn]);

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
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loginIn={isLoginIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleEditAddClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onLikeClick={handleCardLike}
                  onDeleteClick={handleCardDelete}
                  cards={cards}
                  email={email}
                  onLogout={handleLogOut}
                  onClose={allPopupsClose}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-up"
            element={<Register onRegistred={handleRegistr} />}
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleMessage={handleMessage}
                onLogin={handleLogin}
                setEmail={setEmail}
              />
            }
          />

          <Route
            path="*"
            element={
              isLoginIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

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
        <InfoTooltip message={message} onClose={allPopupsClose} />
        <ImagePopup card={selectedCard} onClose={allPopupsClose} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
