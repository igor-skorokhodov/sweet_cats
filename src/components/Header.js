import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

function Header(props) {
  function compareTips() {
    if (props.tip === "signOut") {
      props.signOut();
    }
    if (props.tip === "register") {
      props.signUp();
    }
    if (props.tip === "login") {
      props.signIn();
    }
  }
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={Logo} alt="лого" />
        <div className="header__subcontainer">
          <Link className="header__favorite" to={`/main`}>Все котики</Link>
          <Link className="header__favorite" to={`/favorite`}>Любимые котики</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
