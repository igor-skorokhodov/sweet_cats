import React from "react";
import Card from "../components/Card.js";

function Main(props) {

  return (
    <div className="elements">
      {props.cards.map((card) => {
        return (
          <Card
            key={card.id}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            url={card.url}
            id={card.id}
            clickOnImage={props.onImage}
            setSelectedCard={props.setSelectedCard}
            cards={props.cards}
            setCards={props.setCards}
            card={props.card}
            onCardClick={props.onCardClick}
            setFavoriteCards={props.setFavoriteCards}
            favoriteCards={props.favoriteCards}
            path={props.path}
          />
        );
      })}
    </div>
  );
}

export default Main;
