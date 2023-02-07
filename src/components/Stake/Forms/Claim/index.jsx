import React from "react";
import styles from "../forms.module.css";
import DWORMLogo from "@/assets/images/currency.svg";
import DisclaimerIcon from "@/assets/icons/disclaimer.svg";

function ClaimForm() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.currency}>
            <img src={DWORMLogo.src} />
            <p>DWORM</p>
          </div>
          <input type="text" placeholder="0.00" className={styles.form_input} />
          <div className={styles.balance}>
            <p>Available Balance</p>
            <p>0.0000 DWORM</p>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <img src={DisclaimerIcon.src} alt="" />
          <p>Kindly note that there is a lol.</p>
        </div>
        <button className={styles.button}>Claim</button>
      </div>
    </div>
  );
}

export default ClaimForm;
