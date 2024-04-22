import styles from "./CartItem.module.css";
import DeliveryDate from "./DeliveryDate";
import InfoAndDelivery from "./InfoAndDelivery";
import { useEffect, useState } from "react";
import { useProps } from "../contexts/PropContext";
import CartContext from "../contexts/CartContext";

function CartItem({ cartItem }) {
  const { deliveryOptions } = useProps();

  const [selectedOption, setSelectedOption] = useState(() => {
    // Retrieve selected option from localStorage or default to the first option
    const storedOption = localStorage.getItem(`selectedOption_${cartItem.id}`);
    return storedOption || deliveryOptions[0]?.id || null;
  });

  useEffect(() => {
    localStorage.setItem(`selectedOption_${cartItem.id}`, selectedOption);
  }, [cartItem.id, selectedOption]);

  return (
    <CartContext.Provider
      value={{
        cartItem: cartItem,
        selectedOption: selectedOption,
        setSelectedOption: setSelectedOption,
      }}>
      <div className={styles.item}>
        <DeliveryDate />
        <InfoAndDelivery />
      </div>
    </CartContext.Provider>
  );
}

export default CartItem;
