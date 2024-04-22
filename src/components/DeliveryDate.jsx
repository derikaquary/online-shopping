import { useContext } from "react";
import { getFormattedDate } from "../utility/getFormatedDate";
import CartContext from "../contexts/CartContext";

function DeliveryDate() {
  const { selectedOption } = useContext(CartContext);

  let day = Number(selectedOption);
  let deliveryDay = 0;

  if (day === 1) deliveryDay = 7;
  if (day === 2) deliveryDay = 3;
  if (day === 3) deliveryDay = 1;

  return (
    <div>
      <p>Delivery date: {getFormattedDate(deliveryDay)}</p>
    </div>
  );
}

export default DeliveryDate;
