import React from "react";
import styles from "./activity-widget.module.css";

function ActivityWidget() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <h2>Activity</h2>
        </div>
        <div className={styles.content_body}>
          <div>
            <h3>Total Staked</h3>
            <p>$0.0000</p>
            <span className={styles.conversion}>~0.00000 DWORM</span>
          </div>
          <div className="md:justify-self-center">
            <h3>Your Stake</h3>
            <p>$0.0000</p>
          </div>
          <div className="md:justify-self-end md:text-end">
            <h3>$DWORM to claim</h3>
            <p>$0.0000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityWidget;
