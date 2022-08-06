import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokedex } from "./page/pokedex";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:name/:id" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
