import { useDwormDapp } from "@/providers/DwormProvider/DwormDappProvider";
import { genFormatter, parseDecimals } from "@/utils/utils";
import { utils } from "ethers";
import React from "react";
import styles from "./activity-widget.module.css";

function ActivityWidget() {
  const { prices, totalStakedTokens, userPendingDivs, userDepositedTokens } =
    useDwormDapp();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_header}>
          <h2>Activity</h2>
        </div>
        <div className={styles.content_body}>
          <div>
            <h3>Total Staked</h3>
            <p>
              ${" "}
              {totalStakedTokens && prices?.ethValue && prices?.usdtValue
                ? genFormatter.format(
                    (utils.formatUnits(totalStakedTokens, 9) *
                      prices?.ethValue *
                      prices?.usdtValue) /
                      10 ** 27
                  )
                : "-"}
            </p>
            <span className={styles.conversion}>
              ~
              {totalStakedTokens
                ? genFormatter.format(
                    parseDecimals(utils.formatUnits(totalStakedTokens, 9), 4)
                  )
                : "-"}{" "}
              DWORM
            </span>
          </div>
          <div className="md:justify-self-center">
            <h3>Your Stake (DWORM)</h3>
            <p>
              {userDepositedTokens
                ? parseDecimals(utils.formatUnits(userDepositedTokens, 9), 4)
                : "-"}
            </p>
          </div>
          <div className="md:justify-self-end md:text-end">
            <h3>$DWORM to claim</h3>
            <p>
              {userPendingDivs
                ? parseDecimals(utils.formatUnits(userPendingDivs, 9), 4)
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityWidget;
