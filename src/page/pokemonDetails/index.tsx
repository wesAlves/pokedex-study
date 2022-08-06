import { useParams } from "react-router-dom";

export const PokeDetails = () => {
  const { name } = useParams();

  return <div style={{ textTransform: "capitalize" }}>{name} details</div>;
};
