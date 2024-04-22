import { useContext } from "react";
import styles from "./CartItemImage.module.css";
import CartContext from "../contexts/CartContext";

function CartItemImage() {
  const { cartItem } = useContext(CartContext);
  return (
    <div className={styles.imgcont}>
      <img src={cartItem.image} alt={cartItem.image} />
    </div>
  );
}

export default CartItemImage;
