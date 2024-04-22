import styles from "./Payment.module.css";
import { useProps } from "../contexts/PropContext";

function Payment() {
  const { totalQuantity, totalPrice, totalDeliveryCost, cart } = useProps();

  const convertedPrice = Number((totalPrice * 0.01).toFixed(2));

  const totDelCost = Number((totalDeliveryCost * 0.01).toFixed(2));

  const totalBeforeTax = Number((convertedPrice + totDelCost).toFixed(2));

  const taxTenPrcnt = Number((totalBeforeTax * 0.1).toFixed(2));

  const orderTotalString = (totalBeforeTax + taxTenPrcnt).toFixed(2);

  if (cart.length === 0)
    return <p className={styles.noCart}>& No Billing Payment yet</p>;

  return (
    <div className={styles.payment}>
      <div className={styles.summary}>
        <div className={styles.paymentTitle}>Order Summary</div>
        <div className={styles.itemAndPrice}>
          <div>
            <div className={styles.infoNCost}>
              <p>Items ({totalQuantity}):</p>
              <p className={styles.cost}>${convertedPrice}</p>
            </div>
            <div className={styles.infoNCost}>
              <p>Shipping & handling:</p>
              <p>${totDelCost}</p>
            </div>
            <div className={styles.totalBeforeTax}>
              <p>Total before tax:</p>
              <p className={styles.line}>${totalBeforeTax}</p>
            </div>
            <div className={styles.infoNCost}>
              <p>Estimated tax (10%):</p>
              <p>${taxTenPrcnt}</p>
            </div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.orderTotal}>
            <div>Order Total:</div>
            <div>${orderTotalString}</div>
          </div>
          <div className={styles.paypal}>
            <span>USe PayPal</span>{" "}
            <input type="checkbox" className={styles.checkbox} />
          </div>
          <button className={styles.button}>Place your order</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
