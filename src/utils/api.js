import { apiConfig } from "./constants.js";

function ApiConstructor(config) {

  ApiConstructor.prototype.checkResponse = function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  ApiConstructor.prototype.getUserInfo = function () {
    return fetch(`${config.baseUrl}/v1/cohort-56/users/me`, {
      method: 'GET',
      headers: config.headers
    }).then((res) => { return this.checkResponse(res) });
  }

  ApiConstructor.prototype.getInitialCards = () => {
    return fetch(`${config.baseUrl}/v1/cohort-56/cards`, {
      method: 'GET',
      headers: config.headers
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.editProfile = (profile) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: profile.name,
        about: profile.aboutYourself,
      })
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.addCard = (card) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card.place,
        link: card.image,
      })
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.like = (id) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
      method: 'PUT',
      headers: config.headers
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.dislike = (id) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/cards/${id}/likes`, {
      method: 'DELETE',
      headers: config.headers
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.deleteCard = (id) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }

  ApiConstructor.prototype.editAvatar = (profile) => {
    return fetch(`${config.baseUrl}/v1/cohort-56/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: profile.avatar,
      })
    }).then((res) => { return this.checkResponse(res) });
    // .then((data) => {
    //   return data;
    // })
  }
}

export const Api = new ApiConstructor(apiConfig);