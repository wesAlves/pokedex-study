import { Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Navbar = () => {
  return (
    <Container style={{ marginTop: "32px" }}>
      <Nav variant="pills" defaultActiveKey="/">
        <LinkContainer to="/">
          <Nav.Link>Pokedex</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/favorite">
          <Nav.Link>Fovorites</Nav.Link>
        </LinkContainer>
      </Nav>
    </Container>
  );
};
