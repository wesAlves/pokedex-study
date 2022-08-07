import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pokedex } from "../../api/api";

interface PokeCard {
  id: string;
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
      <Card style={{ marginTop: "16px" }}>
        <img src={sprite} alt={name} />
        <h4 style={{ textAlign: "center" }}>{name}</h4>
      </Card>
    </Link>
  );
};
