import { Row, Button, Pagination } from "react-bootstrap";

interface PokePaginationProps {
  count: number;
  active: number;
}

export const PokePagination = ({ count, active = 4 }: PokePaginationProps) => {
  const items = [...Array(Math.floor(count / 20)).keys()]; //create an array with given number and populate it with the number / by 20 that is my pagination offset

  return (
    <Row>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {active >= 4 && <Pagination.Ellipsis />}

        {items.slice(active, active + 2).map((item: number) => {
          return (
            <Pagination.Item key={item} active={item === active}>
              {item + 1}
            </Pagination.Item>
          );
        })}

        {active < items.length - 2 && <Pagination.Ellipsis />}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Row>
  );
};
