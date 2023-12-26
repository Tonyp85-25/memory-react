import Game from "../pages/Game";

import Navigation from "./Navigation";
import Home from "../pages/Home";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <main className="container">
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/:difficulty">
            <Game />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
