import React from "react";
import { PopupWithForm } from './PopupWithForm.js';

export const EditAvatarPopup = (props) => {
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef(null);

  function handleChange() {
    setAvatar(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm name="update-avatar" heading="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="avatar" ref={avatarRef} type="url" name="avatar" className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку" onChange={handleChange} required />
        <span className="popup__error popup__error_type_avatar"></span>
      </>
    </PopupWithForm>
  )
}