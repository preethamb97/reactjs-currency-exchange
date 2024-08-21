const initialState = {
  baseCurrency: "USD",
  outputCurrency: "INR",
  currencyConvertedValue: null,
  rates: {},
};

export const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
export const SET_OUTPUT_CURRENCY = "SET_OUTPUT_CURRENCY";
export const SET_CONVERTED_VALUE = "SET_CONVERTED_VALUE";
export const STORE_RATE = "STORE_RATE";

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return { ...state, baseCurrency: action.payload, currencyConvertedValue: null };
    case SET_OUTPUT_CURRENCY:
      return { ...state, outputCurrency: action.payload, currencyConvertedValue: null };
    case SET_CONVERTED_VALUE:
      return { ...state, currencyConvertedValue: action.payload };
    case STORE_RATE:
      return {
        ...state,
        rates: { ...state.rates, [action.payload.key]: action.payload.value },
      };
    default:
      return state;
  }
}

export const setBaseCurrency = (currency) => ({
  type: SET_BASE_CURRENCY,
  payload: currency,
});

export const setOutputCurrency = (currency) => ({
  type: SET_OUTPUT_CURRENCY,
  payload: currency,
});

export const setConvertedValue = (value) => ({
  type: SET_CONVERTED_VALUE,
  payload: value,
});

export const storeRate = (key, value) => ({
  type: STORE_RATE,
  payload: { key, value },
});
