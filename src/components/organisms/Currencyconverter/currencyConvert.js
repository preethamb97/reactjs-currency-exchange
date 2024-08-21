import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomDropdown from "../../atom/dropdown/dropdown";
import {
  setBaseCurrency,
  setOutputCurrency,
  setConvertedValue,
  storeRate,
} from "../../../reducer";

const currencies = [
  "INR", "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK",
];

function CurrencyConvert() {
  const dispatch = useDispatch();
  const { baseCurrency, outputCurrency, currencyConvertedValue, rates } = useSelector(
    (state) => state.currency
  );

  const onClickHandler = (e, curType) => {
    const selectedCurrency = e.target.value;
    if (curType === "BASE") {
      dispatch(setBaseCurrency(selectedCurrency));
    } else if (curType === "OUTPUT") {
      dispatch(setOutputCurrency(selectedCurrency));
    }
  };

  useEffect(() => {
    if (baseCurrency && outputCurrency) {
      const key = `${baseCurrency}_${outputCurrency}`;
      
      // Check if rate is already in the store so that it wont call the api if already data exists
      if (rates[key]) {
        dispatch(setConvertedValue(rates[key]));
      } else {
        const apiURL = `https://openexchangerates.org/api/latest.json?app_id=cc72bba4969640b6b46550a3a36b6105&base=${baseCurrency}&symbols=${outputCurrency}`;
        fetch(apiURL)
          .then((res) => res.json())
          .then((val) => {
            if (val.error) {
              alert("Cannot perform this operation, as the API giving access forbidden on changing base currency");
            } else {
              const conversionRate = val?.rates?.[outputCurrency];
              dispatch(setConvertedValue(conversionRate));
              dispatch(storeRate(key, conversionRate));
            }
          })
          .catch((e) => {
            console.error("Error fetching the rates", e);
          });
      }
    }
  }, [baseCurrency, outputCurrency, dispatch, rates]);

  return (
    <div>
      <CustomDropdown
        currencyType="BASE"
        currencies={currencies}
        onClickHandler={onClickHandler}
      />
      <CustomDropdown
        currencyType="OUTPUT"
        currencies={currencies}
        onClickHandler={onClickHandler}
      />

      {currencyConvertedValue && (
        <h1>
          {`1 ${baseCurrency} = ${currencyConvertedValue} ${outputCurrency}`}
        </h1>
      )}
    </div>
  );
}

export default CurrencyConvert;
