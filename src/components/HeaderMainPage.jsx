import { Link } from "react-router-dom";
import styles from "./HeaderMainPage.module.css";

import SearchProducts from "./SearchProducts";
import { useProps } from "../contexts/PropContext";

function HeaderMainPage() {
  const { totalQuantity } = useProps();

  return (
    <header className={styles.header}>
      <span>Logo</span>
      <div className={styles.inputcont}>
        {/* 5) put SearchProducts here */}
        <SearchProducts />
        <button className={styles.btn}>🔍</button>
      </div>
      <span>returns and order</span>
      <Link to="/checkout"> 🛒 ({`${totalQuantity}`})</Link>
    </header>
  );
}

export default HeaderMainPage;
