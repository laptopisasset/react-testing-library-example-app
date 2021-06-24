import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const [{ totals }] = useOrderDetails();
  return (
    <>
      <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
      </div>
      <h2>Grand Total: {totals.grandTotal}</h2>
    </>
  );
}
