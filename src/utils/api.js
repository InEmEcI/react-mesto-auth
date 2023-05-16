class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkError() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getCards() {
    return fetch(this._url + `/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError());
  }

  getUser() {
    return fetch(this._url + `/users/me/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError());
  }

  editUserInfo(info) {
    return fetch(this._url + `/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkError());
  }

  changeUserAvatar(data) {
    return fetch(this._url + `/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkError());
  }

  addNewCard(data) {
    return fetch(this._url + `/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkError());
  }

  removeCard(cardId) {
    return fetch(this._url + `/cards/` + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError());
  }

  likeCard(cardId) {
    return fetch(this._url + `/cards/` + cardId + `/likes/`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkError());
  }

  dislikeCard(cardId) {
    return fetch(this._url + `/cards/` + cardId + `/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError());
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.dislikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "186e858b-0f86-414d-8c8c-a1408bf9b14d",
    "Content-Type": "application/json",
  },
});

export default api;
