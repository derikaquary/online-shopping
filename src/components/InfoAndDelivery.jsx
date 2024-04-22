import styles from "./InfoAndDelivery.module.css";
import CartItemImage from "./CartItemImage";
import DeliveryOpt from "./DeliveryOpt";
import NamePrcQty from "./NamePrcQty";

function InfoAndDelivery() {
  return (
    <div className={styles.infoAndDelivery}>
      <div className={styles.info}>
        <div className={styles.imageAndInfo}>
          <CartItemImage />
          <NamePrcQty />
        </div>
        <DeliveryOpt />
      </div>
    </div>
  );
}

export default InfoAndDelivery;
