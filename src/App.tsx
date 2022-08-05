import { useEffect, useState } from "react";
import { pokedex } from "./api/api";
import { PokeCard } from "./components/pokeCard";

interface PokemonData {
  name: string;
  url: string;
}

const App = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]); //state to hold pokemon array
  const [count, setCount] = useState(0); //state to hold the total of entried in the response of pokemons
  const [next, setNext] = useState(""); // state to hold the URL for next pagination
  const [previous, setPrevious] = useState(""); // state to hold the URL for previous pagination

  //getting pokemons from api
  const getPokemons = async (url: string) => {
    try {
      const response = await pokedex.get(url);
      // console.log(response.data);

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
      {previous === null ? null : (
        <button onClick={() => getPokemons(previous)}>Previous</button>
      )}

      {Math.floor(count / 20) /*Total of entries*/}

      {/*1...4|5|6...57 pagination should look like this*/}

      {next === null ? null : (
        <button onClick={() => getPokemons(next)}>Next</button>
      )}
    </>
  );
};

export default App;
