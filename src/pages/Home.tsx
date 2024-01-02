import { Link } from "react-router-dom";

const Home = () => (
  <div className="home">
    <h1>Welcome!</h1>
    <section>
      <div className="container">
        <p>
          Let&apos;s play the famous memory game! Click one card at a time, find
          the second identical card or retry until you find all pairs.
        </p>

        <section className="grid">
          <article>
            <header>
              <Link to="/easy" className="secondary">
                Easy game
              </Link>
            </header>
            <p>Find 14 pairs in one minute</p>
          </article>
          <article>
            <header>
              <Link to={"/hard"} className="secondary">
                Hard game
              </Link>
            </header>
            <p>Find 16 pairs in one minute and half</p>
          </article>
        </section>
      </div>
    </section>
  </div>
);
export default Home;
