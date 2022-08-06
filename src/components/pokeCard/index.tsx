import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pokedex } from "../../api/api";

interface PokeCard {
  id: string;
  // name: string;
  url: string;
}

export const PokeCard = ({ id, url }: PokeCard) => {
  const [sprite, setSprite] = useState();
  const [name, setName] = useState();

  //fetch api to get specific pokemon front_default sprite
  const getPokemonSprite = async (id: string) => {
    try {
      const response = await pokedex.get(`pokemon/${id}`);
      setSprite(response.data.sprites.front_default);
      setName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemonSprite(id);
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
