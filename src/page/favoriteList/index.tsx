import { useState } from "react";
import { PokeCard } from "../../components/pokeCard";

export const FavoriteList = () => {
  //  const favoriteList: number[] = JSON.parse(
  //    localStorage.getItem("@Pokedex:favorite") as string
  //  );

  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("@Pokedex:favorite") as string)
  );

  return (
    <>
      {favorites.map((favorite: any) => {
        return (
          // <div>{favorite}</div>;
          <PokeCard id={favorite} url={""} />
        );
      })}
    </>
  );
};
