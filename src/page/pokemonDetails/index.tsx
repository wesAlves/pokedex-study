import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pokedex } from "../../api/api";

interface PokemonAttr {
  abilities?: [];
  base_experience?: number;
  forms?: [];
  game_indices?: [];
  height?: number;
  held_items?: [];
  id?: number;
  is_default?: boolean;
  order?: number;
  species?: any;
  sprites?: any;
  stats?: [];
  types?: [];
  weight?: number;
}

export const PokeDetails = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState<PokemonAttr>({} as PokemonAttr);
  const [evolutionChain, setEvolutionChain] = useState();

  const getPokemon = async (name: string) => {
    const response = await pokedex.get(`/pokemon/${name}`);
    setPokemon(response.data);
  };

  useEffect(() => {
    getPokemon(name as string);
  }, []);

  const { order, height, types, weight, species, abilities, sprites } = pokemon;

  return (
    <>
      <img
        src={sprites === undefined ? "" : sprites.front_default}
        alt={name}
      />
      <h1 style={{ textTransform: "capitalize" }}>{name} details</h1>
      <div>
        <p>Order: {order}</p>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
        <p>Types: {"types"}</p>
        <p>Evolves from:</p>
        <p>Evolves to:</p>
        {/* {Object.entries(pokemon).map((pokeInfo: any) => {
          console.log(pokeInfo);
          return (
            <>
              <h3>{pokeInfo[0]}</h3>
              <div>{`${pokeInfo[1]}`}</div>
            </>
          );
        })} */}
      </div>
    </>
  );
};
