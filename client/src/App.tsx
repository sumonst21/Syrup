import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Setup from "./pages/setup";
import Login from "./pages/login";
import ContextProviders from "./contexts";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import MainMenu from "./pages/main-menu";
import Order from "./pages/order";

library.add(fas);
library.add(fab);

function App() {
  return (
    <div className="App">
      <ContextProviders>
        <Router>
          <Route path="/" exact component={Login}/>
          <Route path="/setup" exact component={Setup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/main-menu" exact component={MainMenu}/>
          <Route path="/order" exact component={Order}/>
        </Router>
      </ContextProviders>
    </div>
  );
}

export default App;
