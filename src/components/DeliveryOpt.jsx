import styles from "./DeliveryOpt.module.css";
import { useProps } from "../contexts/PropContext";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";

function DeliveryOpt() {
  const { deliveryOptions, dispatch } = useProps();

  const { cartItem, selectedOption, setSelectedOption } =
    useContext(CartContext);

  return (
    <div className={styles.deliverylist}>
      <p>Select delivery option:</p>
      <ul>
        {deliveryOptions.map((option) => (
          <li className={styles.list} key={option.id}>
            <label>
              <input
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  dispatch({
                    type: "addDeliveryCost",
                    payload: {
                      delivOption: option.priceCents,
                      cartItem: cartItem,
                    },
                  });
                }}
              />{" "}
              {option.deliveryDays} work days,price: ${option.priceCents / 100}{" "}
              - {option.tag}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeliveryOpt;
