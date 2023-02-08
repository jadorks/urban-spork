import React, { useState } from "react";
import ActivityWidget from "@/components/Stake/ActivityWidget";
import ContextSwitcher from "@/components/Stake/ContentSwitcher";
import styles from "./Stake.module.css";
import StakeForm from "@/components/Stake/Forms/StakeForm";
import UnstakeForm from "@/components/Stake/Forms/UnstakeForm";
import ClaimForm from "@/components/Stake/Forms/Claim";
import Head from "next/head";

export default function Stake() {
  const [state, setState] = useState(0);
  return (
    <>
      <Head>
        <title>DWORM | Stake</title>
      </Head>
      <div className="mb-8 sm:mb-16 w-full md:w-[40rem] flex flex-col gap-4 items-center">
        <ContextSwitcher currentState={state} switchState={setState} />
        {state == 0 && <StakeForm />}
        {state == 1 && <UnstakeForm />}
        {state == 2 && <ClaimForm />}
        <ActivityWidget />
      </div>
    </>
  );
}
