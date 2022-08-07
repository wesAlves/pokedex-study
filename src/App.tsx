import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Pokedex } from "./page/pokedex";

import "./App.scss";
import { PokeDetails } from "./page/pokemonDetails";
import { FavoriteList } from "./page/favoriteList";
import { Navbar } from "./components/navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:name" element={<PokeDetails />} />
        <Route path="/favorite" element={<FavoriteList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
