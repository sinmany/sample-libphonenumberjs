import React, { useEffect, useRef } from "react";
import IMask from "imask";
import { TextField } from "@mui/material";

export default function ApplyReactIMask() {
  const inputRef = useRef(null);

  useEffect(() => {
    const mask = IMask(inputRef.current, {
      mask: "+855 00 000 000",
    });

    return () => mask.destroy(); // Clean up
  }, []);

  return (
    <>
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </>
  );
}
