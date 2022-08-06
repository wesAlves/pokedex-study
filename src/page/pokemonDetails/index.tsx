import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

  const [favorite, setFavorite] = useState(false);

  const getPokemon = async (name: string) => {
    const response = await pokedex.get(`/pokemon/${name}`);
    setPokemon(response.data);
  };

  const favoriteList: number[] = JSON.parse(
    localStorage.getItem("@Pokedex:favorite") as string
  );

  useEffect(() => {
    getPokemon(name as string);
  }, []);

  useEffect(() => {
    if (!!favoriteList) {
      const findeIndex = favoriteList.findIndex((itemId) => itemId === id);
      if (findeIndex === -1) {
        setFavorite(false);
        return;
      }
      setFavorite(true);
    }
  }, [pokemon]);

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

  const addToFavorite = (id: number) => {
    if (favoriteList !== null) {
      if (favoriteList.includes(id)) {
        return;
      } else {
        console.log("added");
        setFavorite(true);
        localStorage.setItem(
          "@Pokedex:favorite",
          JSON.stringify([...favoriteList, id])
        );
      }
    } else {
      console.log("adding");
      setFavorite(true);
      localStorage.setItem("@Pokedex:favorite", JSON.stringify([id]));
    }
  };

  const removeFromFavorite = (id: number) => {
    const currentFavorite = [...favoriteList];

    const idIndex = currentFavorite.findIndex((item) => item === id);

    currentFavorite.splice(idIndex, 1);

    setFavorite(false);
    localStorage.setItem(
      "@Pokedex:favorite",
      JSON.stringify([...currentFavorite])
    );
  };

  return (
    <>
      {favorite ? (
        <Button onClick={() => removeFromFavorite(id as number)}>
          Remove from favorite
        </Button>
      ) : (
        <Button onClick={() => addToFavorite(id as number)}>
          Make favorite
        </Button>
      )}

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
          {types?.map((type: any, index: number) => {
            return <span key={index}>| {type.type.name} </span>;
          })}
        </p>
        <p>
          Moves:{" "}
          {moves?.map((move: any, index: number) => (
            <span key={index}>| {move.move.name} </span>
          ))}
        </p>
      </div>
    </>
  );
};
