import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pokedex } from "../../api/api";
import MyLoader from "../skeleton";

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
    <Link
      to={`/${name}`}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
      }}
    >
      <Card style={{ marginTop: "16px", width: "150px", minHeight: "180px" }}>
        {sprite === undefined ? (
          <MyLoader />
        ) : (
          <>
            {/* <MyLoader /> */}
            <Card.Img variant="top" src={sprite} alt={name} />
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
          </>
        )}
      </Card>
    </Link>
  );
};
