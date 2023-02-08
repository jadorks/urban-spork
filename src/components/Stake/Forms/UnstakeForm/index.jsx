import React, { useState, useEffect } from "react";
import styles from "../forms.module.css";
import DWORMLogo from "@/assets/images/currency.svg";
import DisclaimerIcon from "@/assets/icons/disclaimer.svg";
import { useEthers } from "@usedapp/core";
import { useWithdraw } from "@/hooks/stake/useWithdraw";
import { useRouter } from "next/router";
import {
  compareNonTokenWithToken,
  onInputNumberChange,
  parseDecimals,
} from "@/utils/utils";
import { useDwormDapp } from "@/providers/DwormProvider/DwormDappProvider";
import { utils } from "ethers";
import Spinner from "@/assets/images/spinner.svg";
import { differenceInDays } from "date-fns";
import WalletManager from "@/components/common/WalletManager";

function UnstakeForm() {
  const { account } = useEthers();
  const router = useRouter();

  const { userDepositedTokens, userStakingTime, isChainError } = useDwormDapp();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }

  const userTimestamp = false ? utils.formatUnits(userStakingTime, 0) : NaN;
  const dateDifference = differenceInDays(
    new Date(),
    !isNaN(userTimestamp)
      ? new Date((userTimestamp * 1000).toString())
      : new Date()
  );

  const getTax = (dateDifference) => {
    if (dateDifference <= 5) {
      return 5;
    } else if (dateDifference > 5 && dateDifference <= 14) {
      return 4;
    } else if (dateDifference > 14 && dateDifference <= 30) {
      return 3;
    } else if (dateDifference > 30 && dateDifference < 60) {
      return 2;
    }
    return 0;
  };
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnstaking, setIsUnstaking] = useState(false);

  const { send: unstake, state: unstakeState } = useWithdraw();

  const unstakeTokens = () => {
    setIsUnstaking(true);
    try {
      void unstake(utils.parseUnits(amount, 9));
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsUnstaking(false);
    }
  };

  const handleUnstakeAmountChange = (value) => {
    setAmount(value);
  };

  useEffect(() => {
    if (account) {
      if (amount <= 0) {
        setErrorMessage("Enter an Amount");
      } else if (
        userDepositedTokens != undefined &&
        compareNonTokenWithToken(userDepositedTokens, amount, 9) == -1
      ) {
        setErrorMessage("Insufficient balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [amount]);

  useEffect(() => {
    if (isUnstaking && unstakeState.status == "Success") {
      alert("Successfully unstaked");
      setIsUnstaking(false);
      router.reload();
    } else if (
      isUnstaking &&
      (unstakeState.status == "Fail" || unstakeState.status == "Exception")
    ) {
      alert(
        `Failed to unstake tokens: ${
          unstakeState.errorMessage.charAt(0).toUpperCase() +
          unstakeState.errorMessage.slice(1)
        }`
      );
      setIsUnstaking(false);
    }
  }, [unstakeState]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.currency}>
            <img src={DWORMLogo.src} />
            <p>DWORM</p>
          </div>
          <input
            type="text"
            placeholder="0.00"
            className={styles.form_input}
            value={amount}
            onChange={(e) => {
              onInputNumberChange(e, handleUnstakeAmountChange);
            }}
          />
          <div className={styles.balance}>
            <p>Tokens Staked</p>
            <p>
              {userDepositedTokens
                ? parseDecimals(utils.formatUnits(userDepositedTokens, 9), 4)
                : "-"}{" "}
              DWORM
            </p>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <img src={DisclaimerIcon.src} alt="" />
          <p>{`${dateDifference} days elapsed. Unstake Tax is ${getTax(
            dateDifference
          )}%.`}</p>
        </div>
        {account != undefined && !isChainError && (
          <button
            onClick={unstakeTokens}
            disabled={amount <= 0 || errorMessage.length > 0}
            className={styles.button}
          >
            {errorMessage.length <= 0 ? "Unstake" : errorMessage}
            {isUnstaking && <img src={Spinner.src} className="w-6" />}
          </button>
        )}
        {account != undefined && isChainError && (
          <button className={`${styles.button} !bg-red-700 !border-0 cursor-not-allowed`}>
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

export default UnstakeForm;
