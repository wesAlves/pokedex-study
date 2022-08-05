import { useEffect, useState } from "react";
import { pokedex } from "./api/api";
import { PokeCard } from "./components/pokeCard";

interface PokemonData {
  name: string;
  url: string;
}

const App = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  const getPokemons = async () => {
    try {
      const response = await pokedex.get("/pokemon");
      console.log(response.data);
      setCount(response.data.count);
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
        return <PokeCard key={name} name={name} url={url} imageURL={""} />;
      })}

      <button>Previous</button>
      {Math.floor(count / 20)}
      <button>Next</button>
    </>
  );
};

export default App;
