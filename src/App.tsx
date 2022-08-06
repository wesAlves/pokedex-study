import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokedex } from "./page/pokedex";

import "./App.scss";
import { PokeDetails } from "./page/pokemonDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:name" element={<PokeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
