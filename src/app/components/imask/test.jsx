"use client";

import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { IMaskMixin } from "react-imask";

export default function Test() {
  const [phone, setPhone] = useState("");
  console.log(phone);

  const ref = useRef(null);
  console.log("ref", ref);
  const inputRef = useRef(null);
  console.log("inputRef", inputRef);

  const onSumit = (e) => {
    console.log(ref.current.maskRef._rawInputValue);
    // ref.current.maskRef._rawInputValue
  };

  const IMaskPhoneInput = IMaskMixin(({ inputRef, ...props }) => {
    return <TextField autoFocus inputRef={inputRef} {...props} />;
  });

  return (
    <>
      <IMaskPhoneInput
        mask={"00 000 0000"}
        placeholder="Enter number here"
        radix="."
        ref={ref}
        inputRef={inputRef}
        value={phone}
        unmask={true}
        onAccept={(val) => setPhone(val)}
        autofix
        fullWidth
        variant="filled"
        size="small"
        onComplete={(val) => {
          console.log(" Input complete:", val);
        }}
      />
    </>
  );
}
