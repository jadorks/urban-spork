import React, { useEffect, useState } from "react";
import styles from "../forms.module.css";
import DWORMLogo from "@/assets/images/currency.svg";
import { useDwormDapp } from "@/providers/DwormProvider/DwormDappProvider";
import { BigNumber, utils } from "ethers";
import { genFormatter, parseDecimals } from "@/utils/utils";
import { useClaimRewards } from "@/hooks/stake/useClaimDivs";
import { useRouter } from "next/router";
import WalletManager from "@/components/common/WalletManager";
import { useEthers } from "@usedapp/core";

function ClaimForm() {
  const { account } = useEthers();
  const router = useRouter();
  const { userPendingDivs, isChainError } = useDwormDapp();
  const [isClaiming, setIsClaiming] = useState(false);
  const { send: claimRewards, state: claimState } = useClaimRewards();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }
  useEffect(() => {
    if (isClaiming && claimState.status == "Success") {
      alert("Rewards claimed successfully");
      setIsClaiming(false);
      router.reload();
    } else if (
      isClaiming &&
      (claimState.status == "Fail" || claimState.status == "Exception")
    ) {
      alert(
        `Failed to claim: ${
          claimState.errorMessage.charAt(0).toUpperCase() +
          claimState.errorMessage.slice(1)
        }`
      );
      setIsClaiming(false);
    }
  }, [claimState]);

  const handleClaimRewards = () => {
    setIsClaiming(true);
    try {
      void claimRewards();
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsClaiming(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.currency}>
            <img src={DWORMLogo.src} />
            <p>DWORM</p>
          </div>
          <div className={`${styles.form_input} overflow-x-scroll`}>
            {genFormatter.format(
              userPendingDivs
                ? parseDecimals(utils.formatUnits(userPendingDivs, 9), 5)
                : 0
            )}
          </div>
          <div className={styles.balance}>
            <p>Available Dividend</p>
          </div>
        </div>

        {account != undefined && !isChainError && (
          <button
            disabled={!userPendingDivs || userPendingDivs <= 0}
            onClick={handleClaimRewards}
            className={styles.button}
          >
            {userPendingDivs > 0 ? "Claim" : "Nothing to claim"}
          </button>
        )}
        {account != undefined && isChainError && (
          <button
            className={`${styles.button} !bg-red-700 !border-0 cursor-not-allowed`}
          >
            Wrong Network
          </button>
        )}
        {account == undefined && (
          <button onClick={openModal} className={styles.button}>
            Connect Wallet{" "}
          </button>
        )}
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </div>
  );
}

export default ClaimForm;
