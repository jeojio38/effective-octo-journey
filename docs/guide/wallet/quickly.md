# Quickly support bitkeep Wallet

If the Other wallet is already available.
[FAQs about BitKeep Chrome Extension](/faq.html#faqs-about-bitkeep-chrome-extension)

- `MetaMask`

Refer to [Address conflicts when switching network](/faq.html#_3-address-conflicts-when-switching-network)  code snippet 
```js
//Bitkeep used
const BitKeepProvider = window.bitkeep && window.bitkeep.ethereum;

await BitKeepProvider.request({ method: 'eth_requestAccounts' });

BitKeepProvider.removeAllListeners();
BitKeepProvider.on('accountsChanged', async (accounts) => {
   console.log("accounts changed")
});
BitKeepProvider.on('chainChanged', async (chainId) => {
   console.log("chainId changed")
});

//MetaMask used
const MetaMaskProvider = window.ethereum;
//BitKeepProvider.removeAllListeners();
MetaMaskProvider.request({ method: 'eth_requestAccounts' });
MetaMaskProvider.removeAllListeners();
MetaMaskProvider.on('accountsChanged', async (accounts) => {
  console.log("accounts changed")
});
MetaMaskProvider.on('chainChanged', async (chainId) => {
  console.log("chainId changed")
});
```

- `window.solana` || `window.phantom`
  ::: tip
  If the solana Wallet is already available. You can use the `window.bitkeep.solana` as a provider, which is the same as `window.solana` and `window.phantom`.  
  :::

- `window.aptos`
  ::: tip
  If the aptos Wallet is already available. You can use the `window.bitkeep.aptos` as a provider, which is the same as `window.aptos`.
  :::

- Wallet Supported by bitkeep

  | BitKeep Global Object    | support chain |
  | ------------------------ | ------------- |
  | window.bitkeep.ethereum  | EVM(MetaMask) |
  | window.bitkeep.solana    | Solana        |
  | window.tronLink          | Tron          |
  | window.bitkeep.visionWeb | Vsision       |
  | window.bitkeep.IWalletJS | Iost          |
  | window.bitkeep.arweave   | Arweave       |
  | window.bitkeep.aptos     | Aptos       |
