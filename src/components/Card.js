import React from "react";

export const Card = (props) => {
  return (
    <article className="card">
      <button type="button" aria-label="Удалить" className="card__delete-button"></button>
      <img className="card__image" src={props.link} alt={props.name} onClick={props.onCardClick} />
      <div className="card__caption">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like">
          <button type="button" aria-label="Лайк" className="card__like-button"></button>
          <span className="card__likes-counter">{props.likes}</span>
        </div>
      </div>
    </article>
  )
}