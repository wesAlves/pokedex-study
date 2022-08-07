import { useEffect, useState } from "react";
import { Badge, Button, Card, CardImg, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { pokedex } from "../../api/api";
import { BsHeart, BsHeartFill } from "react-icons/bs";

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
    <Container style={{ marginTop: "32px" }}>
      <Card>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card.Title as="h2" style={{ textTransform: "capitalize" }}>
            {name} details
          </Card.Title>
          {favorite ? (
            <div onClick={() => removeFromFavorite(id as number)}>
              Favorite <BsHeartFill size={24} fill="#f00" />
            </div>
          ) : (
            <div onClick={() => addToFavorite(id as number)}>
              Favorite <BsHeart size={24} fill="#f00" />
            </div>
          )}
        </Card.Header>

        <CardImg
          src={sprites === undefined ? "" : sprites.front_default}
          alt={name}
          style={{ maxWidth: "250px", alignSelf: "center" }}
        />

        <Card.Body>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <Card.Text>
              <b>Id:</b> {id}
            </Card.Text>
            <Card.Text>
              <b>Order:</b> {order}
            </Card.Text>
            <Card.Text>
              <b>Name:</b> {name}
            </Card.Text>
            <Card.Text>
              <b>Height:</b> {Number(height) * 10} cm
            </Card.Text>
            <Card.Text>
              <b>Weight:</b> {Number(weight) / 10} kg
            </Card.Text>
            <Card.Text>
              <b>Base experience:</b> {base_experience}
            </Card.Text>

            <Card.Text>
              <b>Types:</b>
              {types?.map((type: any, index: number) => {
                return (
                  <Badge style={{ marginLeft: "8px" }} key={index}>
                    {type.type.name}{" "}
                  </Badge>
                );
              })}
            </Card.Text>
          </div>

          <Card.Text>
            <b>Moves:</b>
            {moves?.map((move: any, index: number) => (
              <Badge
                style={{ marginLeft: "8px" }}
                bg="light"
                text="dark"
                key={index}
              >
                {move.move.name}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
