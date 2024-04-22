import { useContext } from "react";
import styles from "./NamePrcQty.module.css";
import QuUpDel from "./QuUpDel";
import CartContext from "../contexts/CartContext";

function NamePrcQty() {
  const { cartItem } = useContext(CartContext);
  return (
    <div className={styles.npq}>
      <p className={styles.itemName}>{cartItem.name}</p>
      <span>${cartItem.price}</span>
      <QuUpDel cartItem={cartItem} />
    </div>
  );
}

export default NamePrcQty;
