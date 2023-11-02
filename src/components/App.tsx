import Game from "./Game";

import Navigation from "./Navigation";
import Home from "./Home";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/easy">
          <Game difficulty="easy" />
        </Route>
        <Route path="/hard">
          <Game difficulty="hard" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
