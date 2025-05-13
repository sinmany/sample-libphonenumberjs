"use client";

import { Box, TextField, Typography } from "@mui/material";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useState } from "react";

export default function ParsePhoneNumberOne() {
  const [input, setInput] = useState("");
  const [info, setInfo] = useState(null);

  const normalizePhone = (raw) => {
    // const cleaned = raw.replace(/[^\d+]/g, ""); this function use if the user can input numberic and characters, it will clearned characters

    if (raw.startsWith("+855")) return raw;
    if (raw.startsWith("0")) return `+855${raw.slice(1)}`;
    if (!raw.startsWith("0") || raw.startsWith("+855")) return `+855${raw}`;
    return raw;
  };

  const handleChange = (e) => {
    let raw = e.target.value.replace(/[^\d+]/g, "");

    // Rule: if starts with +855, allow max 13 digits
    if (raw.startsWith("+855") && raw.length > 13) return;

    // Rule: if starts with 0, allow max 10 digits
    if (raw.startsWith("0") && raw.length > 10) return;

    // Rule: if not starting with 0 or +855, only allow max 9 digits
    if (!raw.startsWith("0") && !raw.startsWith("+855") && raw.length > 9)
      return;

    setInput(raw);

    const normalized = normalizePhone(raw);
    const phone = parsePhoneNumberFromString(normalized);
    // const phone = parsePhoneNumberFromString(raw, "KH");
    console.log(phone);

    setInfo({
      number: phone?.number || " ",
      country: phone?.country || " ",
      national: phone?.formatNational(),
      international: phone?.formatInternational(),
      uri: phone?.getURI() || " ",
      type: phone?.getType() || " ",
      possible: phone?.isPossible?.() ?? false,
      valid: phone?.isValid?.() ?? false,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", px: "20px" }}>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <Typography
            sx={{
              textAlign: "center",
              pt: "20px",
              pb: "24px",
              fontWeight: "bold",
              color: "#006A71",
              fontSize: "20px",
            }}
          >
            Parse Phone Number
          </Typography>
          <TextField
            fullWidth
            label="KH"
            value={input}
            onChange={handleChange}
            inputProps={{
              inputMode: "tel",
              pattern: "[+0-9]*",
              maxLength: 13,
            }}
          />
          {info && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ pt: 1 }}>
                <strong>Number:</strong> {info.number}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>Country:</strong> {info.country}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>National:</strong> {info.national}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>International:</strong> {info.international}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>URI:</strong> {info.uri}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>Type:</strong> {info.type}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>Possible:</strong> {String(info.possible)}
              </Typography>
              <Typography sx={{ pt: 1 }}>
                <strong>Valid format:</strong> {String(info.valid)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
