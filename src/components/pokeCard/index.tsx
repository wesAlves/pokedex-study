import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pokedex } from "../../api/api";

interface PokeCard {
  name: string;
  url: string;
}

export const PokeCard = ({ name, url }: PokeCard) => {
  const [sprite, setSprite] = useState();

  //fetch api to get specific pokemon front_default sprite
  const getPokemonSprite = async (name: string) => {
    try {
      const response = await pokedex.get(`pokemon/${name}`);
      setSprite(response.data.sprites.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemonSprite(name);
  }, []);

  return (
    <Link to={`/${name}`}>
      <div
        style={{
          border: "1px solid",
          borderRadius: "4px",
          width: "150px",
          height: "150px",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <img src={sprite} alt={name} />
        <h2>{name}</h2>
      </div>
    </Link>
  );
};
