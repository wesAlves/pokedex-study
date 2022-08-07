import { useState } from "react";
import { PokeCard } from "../../components/pokeCard";

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("@Pokedex:favorite") as string)
  );

  return (
    <>
      {favorites.map((favorite: any) => {
        return <PokeCard id={favorite} url={""} />;
      })}
    </>
  );
};
