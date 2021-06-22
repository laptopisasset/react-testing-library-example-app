import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create a custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be use within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubTotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsprovider(props) {
  const [optionsCounts, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubTotal("scoops", optionsCounts);
    const toppingsSubtotal = calculateSubTotal("toppings", optionsCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionsCounts]);

  const value = useMemo(() => {
    function updateItemCount({ itemName, newItemCount, optionType }) {
      const newOptionCounts = { ...optionsCounts };

      // update option count for this new value
      const optionCountsMap = optionsCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCount(newOptionCounts);
    }
    // getter:- object containing option counts for scoops and toppings, subtotal and totals
    // setter: updateOptionCount
    return [{ ...optionsCounts, totals }, updateItemCount];
  }, [optionsCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
