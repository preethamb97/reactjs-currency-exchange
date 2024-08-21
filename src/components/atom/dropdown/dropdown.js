import React from "react";

function CustomDropdown({ currencyType = "", onClickHandler, currencies }) {
  return (
    <div>
      <select
        defaultValue={currencyType === "BASE" ? "USD" : "INR"}
        onChange={(e) => {
          onClickHandler(e, currencyType);
        }}
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomDropdown;
