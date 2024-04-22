import { Link } from "react-router-dom";
import styles from "./HeaderCheckout.module.css";

function HeaderCheckout() {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        {" "}
        ← main page
      </Link>
      <span>
        <strong>Checkout</strong>
      </span>
      <div></div>
    </header>
  );
}

export default HeaderCheckout;
