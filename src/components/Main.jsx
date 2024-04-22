import styles from "./Main.module.css";
import Error from "../components/Error";
import Loading from "./Loading";
import Product from "./Product";
import { useProps } from "../contexts/PropContext";

function Main() {
  const { isLoading, status, products, dispatch } = useProps();

  if (isLoading) return <Loading />;
  if (status === "error") return <Error />;

  // Add a check for empty products array
  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <ul className={styles.main}>
      {products.map((product) => (
        <Product product={product} key={product.id} dispatch={dispatch} />
      ))}
    </ul>
  );
}

export default Main;
