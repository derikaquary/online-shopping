import HeaderCheckout from "../components/HeaderCheckout";
import MainCheckout from "../components/MainCheckout";
import Payment from "../components/Payment";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  return (
    <div>
      <HeaderCheckout />
      <div className={styles.productAndPayment}>
        <MainCheckout />
        <Payment />
      </div>
    </div>
  );
}

export default CheckoutPage;
