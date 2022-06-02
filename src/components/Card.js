import React from "react";

function Card(props) {
  const [cardLikeButtonClassName, setCardLikeButtonClassName] =
    React.useState("element__heart");

  function handleClick() {
    props.onCardClick({ url: props.url, id: props.id });
    props.clickOnImage();
    props.setSelectedCard({ url: props.url, id: props.id, flag: false });
  }

  function handleLikeClick() {
    let array = props.cards;
    console.log(array);
    if (cardLikeButtonClassName === "element__heart element__heart_anabled") {
      setCardLikeButtonClassName("element__heart");
      props.setSelectedCard({ url: props.url, id: props.id, flag: "del" });
      props.onCardLike({ url: props.url, id: props.id, flag: "del" });
    } else {
      console.log("dddddddddd");
      array.forEach((element) => {
        for (let i = 0; i < props.cards.length; i++) {
          if (props.cards[i].id === element.id) {
            setCardLikeButtonClassName("element__heart element__heart_anabled");

            break;
          } else {
            setCardLikeButtonClassName("element__heart");
          }
        }
      });
      props.onCardLike({ url: props.url, id: props.id, flag: "set" });
      props.setSelectedCard({ url: props.url, id: props.id, flag: "set" });
    }
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  //const isLiked = props.likesArr.some(i => i._id === currentUser.id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка

  return (
    <article className="element">
      <div>
        <img
          className="element__picture"
          src={props.url}
          onClick={handleClick}
          alt={props.name}
        />
      </div>
      <div className="element__container">
        <div className="element__container_likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Лайк"
          ></button>
        </div>
      </div>
    </article>
  );
}

export default Card;
