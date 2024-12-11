import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="max-w-6xl mx-auto flex justify-between pt-5">
      <Link to="/">
        <img src="./netflix-logo.png" alt="netflix_logo" className="w-40" />
      </Link>
    </header>
  );
}

export default Header;
