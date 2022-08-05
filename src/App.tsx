import { useEffect, useState } from "react";
import { pokedex } from "./api/api";

interface PokemonData {
  name: string;
  url: string;
}

const App = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  const getPokemons = async () => {
    try {
      const response = await pokedex.get("/pokemon");
      console.log(response.data);
      setPokemons(response.data.results);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      {pokemons.map(({ name, url }: PokemonData) => {
        return (
          <div key={name}>
            <h3>{name}</h3>
            <a href={url}>Details</a>
          </div>
        );
      })}
      <button>Previous</button>
      123
      <button>Next</button>
    </>
  );
};

export default App;
