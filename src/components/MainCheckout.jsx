import CartItem from "./CartItem";
import styles from "./MainCheckout.module.css";
import { useProps } from "../contexts/PropContext";

function MainCheckout() {
  const { cart } = useProps();
  const isEmpty = cart.length === 0;

  return (
    <div className={styles.main}>
      <p className={styles.subtitle}>Review your order</p>
      {isEmpty ? (
        <p>No Items in your cart now</p>
      ) : (
        cart.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))
      )}
    </div>
  );
}

export default MainCheckout;
