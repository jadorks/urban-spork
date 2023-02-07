import React from "react";
import styles from "./context-switcher.module.css";

function ContextSwitcher({currentState , switchState }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={currentState == 0 ? styles.active : undefined} onClick={() => switchState(0)}>
          Stake
        </button>
        <button className={currentState == 1 ? styles.active : undefined} onClick={() => switchState(1)}>Unstake</button>
        <button className={currentState == 2 ? styles.active : undefined} onClick={() => switchState(2)}>Claim</button>
      </div>
    </div>
  );
}

export default ContextSwitcher;
