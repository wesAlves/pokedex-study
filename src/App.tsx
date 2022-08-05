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
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  const getPokemons = async (url: string) => {
    try {
      const response = await pokedex.get(url);
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
    getPokemons("/pokemon");
  }, []);

  // const handleNext = (next) => {
  //   getPokemons()
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "8px",
          maxWidth: "800px",
          flexWrap: "wrap",
        }}
      >
        {pokemons.map(({ name, url }: PokemonData) => {
          return <PokeCard key={name} name={name} url={url} />;
        })}
      </div>

      <button onClick={() => getPokemons(previous)}>Previous</button>
      {Math.floor(count / 20)}
      <button onClick={() => getPokemons(next)}>Next</button>
    </>
  );
};

export default App;
