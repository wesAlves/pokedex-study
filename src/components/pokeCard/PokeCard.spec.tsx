import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PokeCard } from ".";

jest.mock("react-router-dom", () => ({
  Link: "Link",
  Route: ({ children, path }: any) => children({ match: path === "/" }),
}));

describe("Pokecard component", () => {
  it("Should be render with pokemon name and image", async () => {
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

    const { debug } = render(
      <>
        {pokemons.map((pokemon) => {
          return <PokeCard id={pokemon.id} url={pokemon.url} />;
        })}
      </>
    );

    expect(await screen.findByAltText("bulbasaur")).toBeTruthy();
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();

    expect(await screen.findByAltText("squirtle")).toBeTruthy();
    expect(await screen.findByText("squirtle")).toBeInTheDocument();

    expect(await screen.findByAltText("charmander")).toBeTruthy();
    expect(await screen.findByText("charmander")).toBeInTheDocument();
  });
});
