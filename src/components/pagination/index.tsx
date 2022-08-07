import React from "react";
import { Row, Button, Pagination, Col } from "react-bootstrap";

interface PokePaginationProps {
  count: number;
  active: number;
  changeFn: (page: number) => void;
  //   next: string;
  //   prev: string;
}

export const PokePagination = ({
  count,
  active,
  changeFn,
}: PokePaginationProps) => {
  if (count / 20 < 1) {
    return <></>;
  }

  const paginationItems =
    count % 20 > 1 ? Math.floor(count / 20) + 1 : count / 20;

  const items = []; //create an array with given number and populate it with the number / by 20 that is my pagination offset

  for (let i = 0; i < paginationItems; i++) {
    items.push(i);
  }

  const paginationStartSlice = active < 2 ? items[0] : active - 1; //set the first position to slice the array of items
  //   const paginationEndSlice = active <= 1 ? active + 6 : active + 4; //set the first position to slice the array of items

  return (
    <Pagination style={{ width: "fit-content" }}>
      {active >= 2 && (
        <>
          <Pagination.Prev onClick={() => changeFn(active - 1)} />
          <Pagination.First onClick={() => changeFn(0)} />
          <Pagination.Ellipsis disabled />
        </>
      )}

      {items
        .slice(paginationStartSlice, items[active] + 2)
        .map((item: number) => {
          return (
            <Pagination.Item
              key={item}
              active={item === active}
              onClick={() => changeFn(item)}
            >
              {item + 1}
            </Pagination.Item>
          );
        })}

      {active < items.length - 2 && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Last onClick={() => changeFn(items.length - 1)} />
          <Pagination.Next
            onClick={() =>
              active < items.length
                ? changeFn(active + 1)
                : changeFn(active + 1)
            }
          />
        </>
      )}
    </Pagination>
  );
};
