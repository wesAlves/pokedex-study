import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PokePagination } from "./";

describe("Pagination component", () => {
  it("Should be render when the pokemon list is bigger than 20", async () => {
    const { debug } = render(
      <PokePagination active={0} count={21} changeFn={() => {}} />
    );

    expect(screen.getByRole("list")).toHaveClass("pagination");
  });

  it("Should not be render when the pokemon list is less than 21", () => {
    const { debug } = render(
      <PokePagination active={0} count={20} changeFn={() => {}} />
    );

    expect(screen.getByRole("list")).toHaveClass("pagination");
  });
});
