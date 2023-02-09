import React from "react";
import { Api } from "../utils/api.js";
import img from "../images/profile/image.jpg";

export const Main = (props) => {
  const [userName, setUserName] = React.useState("Имя");
  const [userDescription, setUserDescription] = React.useState("Информация о себе");
  const [userAvatar, setUserAvatar] = React.useState(img);

  const getInfo = () => {
    Api.getUserInfo().then((userInfo) => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
    }).catch(rej => {
      console.log(rej)
    })
  }

  React.useEffect(() => {
    getInfo()
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="аватар" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__headline">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about-yourself">{userDescription}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      {props.children}
    </main>
  )
}