const ChainInfo = {
  chainId: "finschia-2",
  chainName: "Finschia",
  rpc: "https://finschia-rpc.finschia.io/",
  rest: "https://finschia-api.finschia.io",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmos" + "pub",
    bech32PrefixValAddr: "cosmos" + "valoper",
    bech32PrefixValPub: "cosmos" + "valoperpub",
    bech32PrefixConsAddr: "cosmos" + "valcons",
    bech32PrefixConsPub: "cosmos" + "valconspub",
  },
  currencies:
  {
    coinDenom: "FINSCHIA",
    coinMinimalDenom: "cony",
    coinDecimals: 6,
  },
feeCurrencies:
  {
    coinDenom: "FINSCHIA",
    coinMinimalDenom: "cony",
    coinDecimals: 6,
  },
stakeCurrency: {
  coinDenom: "FINSCHIA",
  coinMinimalDenom: "cony",
  coinDecimals: 6,
},
  coinType: 118,
  gasPriceStep: {
    low: 1,
    average: 1,
    high: 1,
  },
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
};

export default ChainInfo;