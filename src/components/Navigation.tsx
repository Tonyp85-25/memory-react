import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <strong>
              <Link to="/">Memory Game</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/easy">Easy</Link>
          </li>
          <li>
            <Link to="/hard">Hard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
