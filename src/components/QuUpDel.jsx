import { useState } from "react";
import styles from "./QuUpDel.module.css";
import { useProps } from "../contexts/PropContext";

function QuUpDel({ cartItem }) {
  const { dispatch } = useProps();
  const [showUpdate, setShowUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <div className={styles.cont}>
      <p>Quantity: {!showUpdate && <span>{cartItem.quantity}</span>}</p>
      {!showUpdate && <span onClick={() => setShowUpdate(true)}> Update</span>}
      {showUpdate && (
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      )}
      {showUpdate && (
        <span
          onClick={() => {
            setShowUpdate(false);
            dispatch({
              type: "updateCartItemQuantity",
              payload: { cartItemId: cartItem.id, quantity: quantity },
            });
          }}>
          Save
        </span>
      )}
      <span
        onClick={() => dispatch({ type: "deleteCartItem", payload: cartItem })}>
        {" "}
        Delete
      </span>
    </div>
  );
}

export default QuUpDel;
