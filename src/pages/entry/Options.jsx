import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOptions from "./ScoopOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/scoops`)
      .then((response) => setItems(response.data))
      .catch(console.error);
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map((item, index) => (
    <ItemComponent key={index} {...item} />
  ));

  return <Row>{optionItems}</Row>;
}
