import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { PokeCard } from "../../components/pokeCard";

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("@Pokedex:favorite") as string)
  );

  return (
    <Container>
      <Row
        as="div"
        className="justify-content-center"
        style={{ maxWidth: "960px", margin: "auto" }}
      >
        {favorites.map((favorite: any) => {
          return <PokeCard id={favorite} url={""} />;
        })}
      </Row>
    </Container>
  );
};
