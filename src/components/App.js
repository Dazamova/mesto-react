import React from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { Card } from "./Card.js";
import { Api } from "../utils/api.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({}); //хранит в себе карточку, которую кликнули
  const [cards, setCards] = React.useState([]);

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

  return (
    <body style={{background: 'black'}}>
      <div className="main-page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}>
          <section className="cards">
            {cards.map((card) =>
              <Card key={card._id} name={card.name} link={card.link} likes={card.likes.length} onCardClick={() => handleCardClick(card)}></Card>
            )}
          </section>
        </Main>
        <Footer />
        <PopupWithForm name="edit-profile" heading="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <>
            <input id="name" type="text" name="name" className="popup__input popup__input_type_name" placeholder="Введите имя"
              minLength="2" maxLength="40" required />
            <span className="popup__error popup__error_type_name"></span>
            <input id="about-yourself" type="text" name="aboutYourself"
              className="popup__input popup__input_type_about-yourself" placeholder="Введите информацию о себе" minLength="2"
              maxLength="200" required />
            <span className="popup__error popup__error_type_aboutYourself"></span>
          </>
        </PopupWithForm>

        <PopupWithForm name="add-card" heading="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <>
            <input id="place" type="text" name="place" className="popup__input popup__input_type_place" placeholder="Название"
              minLength="2" maxLength="30" required />
            <span className="popup__error popup__error_type_place"></span>
            <input id="image" type="url" name="image" className="popup__input popup__input_type_image"
              placeholder="Ссылка на картинку" required />
            <span className="popup__error popup__error_type_image"></span>
          </>
        </PopupWithForm>

        <PopupWithForm name="update-avatar" heading="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <>
            <input id="avatar" type="url" name="avatar" className="popup__input popup__input_type_avatar"
              placeholder="Ссылка на картинку" required />
            <span className="popup__error popup__error_type_avatar"></span>
          </>
        </PopupWithForm>

        <PopupWithForm name="confirm" heading="Вы уверены?" buttonText="Да" onClose={closeAllPopups} />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
      </div>
    </body>
  );
}
export default App;