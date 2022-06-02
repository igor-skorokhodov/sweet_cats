import "../index.css";
import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import React from "react";
import ImagePopup from "../components/ImagePopup.js";
import api from "../utils/api.js";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [favoriteCards, setFavoriteCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}}`);
      });
  }, []);

  React.useEffect(() => {
    function handleClick(evt) {
      if (evt.target.classList.contains("popup_active")) {
        closeAllPopups();
      }
    }

    function handleOnKeyDown(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("click", handleClick);
    };
  });

  function handleImageClick() {
    setIsImagePopupOpen(true);
  }
  function setFavorite(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    let likesArr = favoriteCards;
    let array = cards;
    let indexMain = 0;
    let indexLike = 0;
    if (likesArr.length === 0) {
      likesArr.push(card);
      setFavoriteCards(likesArr);
    } else {
      array.forEach((element, pos) => {
        if (element.id === card.id) {
          indexMain = pos;
        }
      });
      likesArr.forEach((element, pos) => {
        if (element.id === card.id) {
          indexLike = pos;
        }
      });
      if (card.flag === "set") {
        likesArr.push(card);
        setFavoriteCards(likesArr);
      }
    }
    if (card.flag === "del") {
      likesArr.splice(indexLike, 1);
      setFavoriteCards(likesArr);
    }
  }

  return (
      <body className="background">
        <div className="page">
          <Switch>
            <Route path="/main">
              <Header
                name="Выйти"
                tip="signOut"
              />
              <Main
                setSelectedCard={setFavorite}
                onImage={handleImageClick}
                card={selectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                setCards={setFavoriteCards}
                onCardClick={setIsImagePopupOpen}
                favoriteCards={favoriteCards}
                setFavoriteCards={setFavoriteCards}
                path="main"
              />
              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
              <Footer />
            </Route>
            <Route path="/favorite">
              <Header
                name="Выйти"
                tip="signOut"
              />
              <Main
                setSelectedCard={setSelectedCard}
                onImage={handleImageClick}
                card={selectedCard}
                cards={favoriteCards}
                setCards={setFavoriteCards}
                onCardLike={handleCardLike}
                onCardClick={setIsImagePopupOpen}
                favoriteCards={favoriteCards}
                setFavoriteCards={setFavoriteCards}
                path="favorite"
              />
              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
              <Footer />
            </Route>
            <Route path="/">
              <Redirect to="/main" />
            </Route>
          </Switch>
        </div>
      </body>
  );
}

export default App;
