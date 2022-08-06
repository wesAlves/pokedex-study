import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  ThemeProvider,
} from "react-bootstrap";
import { pokedex } from "./api/api";
import { PokeCard } from "./components/pokeCard";

import "./App.scss";
import { PokePagination } from "./components/pagination";

interface PokemonData {
  name: string;
  url: string;
}

const App = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]); //state to hold pokemon array
  const [count, setCount] = useState(0); //state to hold the total of entried in the response of pokemons
  const [next, setNext] = useState(""); // state to hold the URL for next pagination
  const [previous, setPrevious] = useState(""); // state to hold the URL for previous pagination

  //getting pokemons from api
  const getPokemons = async (url: string) => {
    try {
      const response = await pokedex.get(url);
      // console.log(response.data);

      setCount(response.data.count);
      setPokemons(response.data.results);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (error) {
      console.error(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (pageNumber: number) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);

    //?limit=20&offset=20"
    // getPokemons(`/pokemons?limit=20&offset=${pageNumber * 20}`);
  };

  useEffect(() => {
    getPokemons("/pokemon");
  }, []);

  return (
    <ThemeProvider breakpoints={["lg", "md", "sm"]}>
      <Container>
        <Row
          as="div"
          lg={5}
          md={3}
          sm={1}
          className="justify-content-md-center"
        >
          {pokemons.map(({ name, url }: PokemonData) => {
            return (
              <Col>
                <PokeCard key={name} name={name} url={url} />
              </Col>
            );
          })}
        </Row>
        <PokePagination
          active={currentPage}
          count={count}
          changeFn={(page) => {
            handlePagination(page);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
