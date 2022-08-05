import { useEffect, useState } from "react";
import { pokedex } from "../../api/api";

interface PokeCard {
  name: string;
  url: string;
}

export const PokeCard = ({ name, url }: PokeCard) => {
  const [sprite, setSprite] = useState();

  const getPokemonSprite = async (name: string) => {
    try {
      const response = await pokedex.get(`pokemon/${name}`);
      console.log(response);
      setSprite(response.data.sprites.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemonSprite(name);
  }, []);

  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "4px",
        width: "150px",
        height: "150px",
      }}
    >
      <img src={sprite} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};
