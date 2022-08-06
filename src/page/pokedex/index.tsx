import { useState, useEffect } from "react";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pokedex } from "../../api/api";
import { PokePagination } from "../../components/pagination";
import { PokeCard } from "../../components/pokeCard";

interface PokemonData {
  name: string;
  url: string;
}

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]); //state to hold pokemon array
  const [count, setCount] = useState(0); //state to hold the total of entried in the response of pokemons
  const [next, setNext] = useState(""); // state to hold the URL for next pagination
  const [previous, setPrevious] = useState(""); // state to hold the URL for previous pagination

  //getting pokemons from api
  const getPokemons = async (url: string) => {
    try {
      const response = await pokedex.get(url);
      // console.log(response.data);
      //total 1154 pokemons

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
    // console.log(pageNumber);
    setCurrentPage(pageNumber);

    //?limit=20&offset=20"
    getPokemons(`/pokemon?limit=20&offset=${pageNumber * 20}`);
  };

  useEffect(() => {
    getPokemons("/pokemon");
  }, []);

  return (
    <ThemeProvider breakpoints={["lg", "md", "sm"]}>
      <Container>
        <Row>
          <Link to="/favorite">Fovorites</Link>
        </Row>
        <Row
          as="div"
          lg={5}
          md={3}
          sm={1}
          className="justify-content-md-center"
        >
          {pokemons.map(({ name, url }: PokemonData) => {
            return (
              //   <Col>
              <PokeCard key={name} id={name} url={url} />
              //   </Col>
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
