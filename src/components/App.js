import React from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { Card } from "./Card.js";
import { Api } from "../utils/api.js";
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import img from "../images/profile/image.jpg";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({}); //хранит в себе карточку, которую кликнули
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Имя', about: 'Информация о себе', avatar: img });

  const getInfo = () => {
    Api.getUserInfo().then((userInfo) => {
      setCurrentUser(userInfo);
    }).catch(rej => {
      console.log(rej)
    })
  }

  React.useEffect(() => {
    getInfo()
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(clickedCard) {
    setIsImagePopupOpen(true);
    setSelectedCard(clickedCard);
  }

  const getCards = () => {
    Api.getInitialCards().then((cards) => {
      setCards(cards);
    }).catch(rej => {
      console.log(rej)
    })
  }

  React.useEffect(() => {
    getCards()
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      Api.dislike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
    } else {
      Api.like(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
    }
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id);
    setCards(state => state.filter(c => c._id !== card._id)) //либо добавить в .then
  }

  function handleUpdateUser(formData) {
    Api.editProfile(formData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  function handleUpdateAvatar(formData) {
    Api.editAvatar(formData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  function handleAddPlaceSubmit(formData) {
    Api.addCard(formData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body style={{ background: 'black' }}>
        <div className="main-page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}>
            <section className="cards">
              {cards.map((card) =>
                <Card card={card} key={card._id} name={card.name} link={card.link} likes={card.likes.length} onCardLike={() => handleCardLike(card)} onCardDelete={() => handleCardDelete(card)} onCardClick={() => handleCardClick(card)}></Card>
              )}
            </section>
          </Main>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          {/* <PopupWithForm name="add-card" heading="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <>
              <input id="place" type="text" name="place" className="popup__input popup__input_type_place" placeholder="Название"
                minLength="2" maxLength="30" required />
              <span className="popup__error popup__error_type_place"></span>
              <input id="image" type="url" name="image" className="popup__input popup__input_type_image"
                placeholder="Ссылка на картинку" required />
              <span className="popup__error popup__error_type_image"></span>
            </>
          </PopupWithForm> */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm name="confirm" heading="Вы уверены?" buttonText="Да" onClose={closeAllPopups} />

          <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        </div>
      </body>
    </CurrentUserContext.Provider>
  );
}
export default App;