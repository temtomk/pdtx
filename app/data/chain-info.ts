const ebonyChainInfo = {
  chainId: "ebony-2",
  chainName: "Ebony",
  rpc: "https://ebony-rpc.finschia.io",
  rest: "https://ebony-api.finschia.io",
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "TFINSCHIA",
      coinMinimalDenom: "tcony",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TFINSCHIA",
      coinMinimalDenom: "tcony",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: [
    {
      coinDenom: "TFINSCHIA",
      coinMinimalDenom: "tcony",
      coinDecimals: 6,
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 1,
    average: 1,
    high: 1,
  },
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
};

const finschiaChainInfo = {
  chainId: "finschia-2",
  chainName: "Finschia",
  rpc: "https://finschia-rpc.finschia.io",
  rest: "https://finschia-api.finschia.io",
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "FINSCHIA",
      coinMinimalDenom: "cony",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "FINSCHIA",
      coinMinimalDenom: "cony",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: [
    {
      coinDenom: "FINSCHIA",
      coinMinimalDenom: "cony",
      coinDecimals: 6,
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 1,
    average: 1,
    high: 1,
  },
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
};

// export const chainInfo = process.env.NODE_ENV === "development" ? ebonyChainInfo : finschiaChainInfo;
export const chainInfo = ebonyChainInfo;
