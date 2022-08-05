import { pokedex } from "./api/api";

const App = () => {
  const getPokemons = async () => {
    try {
      const response = await pokedex.get("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return <div onClick={getPokemons}>Pokedex</div>;
};

export default App;
