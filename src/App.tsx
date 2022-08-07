import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Pokedex } from "./page/pokedex";

import "./App.scss";
import { PokeDetails } from "./page/pokemonDetails";
import { FavoriteList } from "./page/favoriteList";
import { Row } from "react-bootstrap";

const App = () => {
  return (
    <BrowserRouter>
      <Row>
        <Link to="/">Pokedex</Link>
        <Link to="/favorite">Fovorites</Link>
      </Row>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:name" element={<PokeDetails />} />
        <Route path="/favorite" element={<FavoriteList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
