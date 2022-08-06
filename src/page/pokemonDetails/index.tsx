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
  moves?: [];
}

export const PokeDetails = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState<PokemonAttr>({} as PokemonAttr);

  const getPokemon = async (name: string) => {
    const response = await pokedex.get(`/pokemon/${name}`);
    setPokemon(response.data);
  };

  useEffect(() => {
    getPokemon(name as string);
  }, []);

  const {
    id,
    order,
    height,
    types,
    weight,
    species,
    abilities,
    sprites,
    moves,
    base_experience,
  } = pokemon;

  return (
    <>
      <img
        src={sprites === undefined ? "" : sprites.front_default}
        alt={name}
      />
      <h1 style={{ textTransform: "capitalize" }}>{name} details</h1>
      <div>
        <p>Name: {name}</p>
        <p>Id: {id}</p>
        <p>Order: {order}</p>
        <p>Height: {Number(height) * 10} cm</p>
        <p>Weight: {Number(weight) / 10} kg</p>
        <p>Base experience: {base_experience}</p>
        <p>
          Types:{" "}
          {types?.map((type: any) => {
            return <span>| {type.type.name} </span>;
          })}
        </p>
        <p>
          Moves:{" "}
          {moves?.map((move: any) => (
            <span>| {move.move.name} </span>
          ))}
        </p>
      </div>
    </>
  );
};
