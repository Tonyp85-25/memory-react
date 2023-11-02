import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.buttons}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/easy">Easy</Link>
        </li>
        <li>
          <Link to="/hard">Hard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
