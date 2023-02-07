import React, { useState } from "react";
import ActivityWidget from "@/components/Stake/ActivityWidget";
import ContextSwitcher from "@/components/Stake/ContentSwitcher";
import { forms } from "@/components/Stake/Forms";
import styles from "./Stake.module.css";
import StakeForm from "@/components/Stake/Forms/StakeForm";

export default function Stake() {
  const [state, setState] = useState(0);
  return (
    <div className="mb-8 sm:mb-16 w-full md:w-[40rem] flex flex-col gap-4 items-center">
      <ContextSwitcher currentState={state} switchState={setState} />
      {forms[state]}
      <ActivityWidget />
    </div>
  );
}
