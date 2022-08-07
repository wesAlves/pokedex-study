import React from "react";
import { PokeCard } from "../../components/pokeCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  Link: "Link",
  Route: ({ children, path }: any) => children({ match: path === "/" }),
}));

describe("Favorite page", () => {
  it("Should render all pokemons in favorite", async () => {
    const pokemons = [
      {
        id: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      {
        id: "squirtle",
        url: "https://pokeapi.co/api/v2/pokemon/7/",
      },
      {
        id: "charmander",
        url: "https://pokeapi.co/api/v2/pokemon/4/",
      },
    ];

    const favorite = ["bulbasaur", "charmander"];

    const { debug } = render(
      <>
        {pokemons.map((pokemon) => {
          if (favorite.includes(pokemon.id)) {
            return <PokeCard id={pokemon.id} url={pokemon.url} />;
          }
          <></>;
        })}
      </>
    );

    console.log(debug());

    expect(await screen.findByAltText("bulbasaur")).toBeTruthy();
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();

    expect(await screen.findByAltText("charmander")).toBeTruthy();
    expect(await screen.findByText("charmander")).toBeInTheDocument();

    expect(await screen.queryByAltText("squirtle")).toBeFalsy();
    expect(await screen.queryByText("squirtle")).not.toBeInTheDocument();
  });
});
