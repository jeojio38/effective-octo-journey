# Quickly support BitKeep Wallet

## EVM

::: tip Note
 Precondition:
You have connected to Chrome extension wallets (including MetaMask) with the same protocol used to connect to MetaMask.
:::

**What’s the easiest way to connect to BitKeep Wallet**

 Check if the provider is `window.bitkeep.ethereum`, if not, please replace it with the exclusive BitKeep provider `window.bitkeep.ethereum`.

For example, see below:

```JS
function getProvider() {
  const provider = window.bitkeep && window.bitkeep.ethereum;
  if (!provider) {
    return window.open('https://bitkeep.com/en/download?type=2');
  }
  return provider;
}
```

**Attention**

Don't forget to remove listeners, once it is detected that the address and network have been changed.

For example, see below:

```JS
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

## Solana

::: tip Note
Precondition:
You have connected to Chrome extension wallets with the same protocol used to connect to MathWallet.
:::

**What’s the easiest way to connect to BitKeep Wallet**

 Check if the provider is `window.bitkeep.solana`, if not, please replace it with the exclusive BitKeep provider `window.bitkeep.solana`.

For example, see below:

```JS
function getProvider() {
  const provider = window.bitkeep && window.bitkeep.solana;
  if (!provider) {
    window.open('https://bitkeep.com/en/download?type=2');
    throw  `Please guide users to download from our official website`
  }
  return provider;
}
```

## Aptos

::: tip Note
Precondition:
You have connected to Chrome extension wallets with the same protocol of petra.
:::

**What’s the easiest way to connect to BitKeep Wallet**

 Check if the provider is `window.bitkeep.aptos`, if not, please replace it with the exclusive BitKeep provider `window.bitkeep.aptos`.

For example, see below:

```JS
function getAptosWallet() {
  const provider = window.bitkeep && window.bitkeep.aptos;
  if (!provider) {
    window.open('https://bitkeep.com/en/download?type=2');
    throw 'Please go to  https://bitkeep.com/en/download?type=2  to download!!';
  }
  return provider;
}
```

## Other

If the developer has not connected to other Chrome extension wallets using the above standards, please refer to the access mechanism of other mainnet APIs or third-party npm packages to connect to BitKeep Chrome extension wallet.

### API

- [EVM](/guide/wallet/ethereum.html)
- [Solana](/guide/wallet/solana.html)
- [Tron](/guide/wallet/tron.html)
- [Aptos](/guide/wallet/aptos.html)

### Third-party npm packages supported

**EVM**

- [web3js](https://www.npmjs.com/package/web3)
- [ethers](https://www.npmjs.com/package/ethers)
- [bitkeep-web3modal](https://www.npmjs.com/package/bitkeep-web3modal)

**Solana**

- [solana-web3.js](https://solana-labs.github.io/solana-web3.js/)
- [@solana/wallet-adapter-react](https://www.npmjs.com/package/@solana/wallet-adapter-react)
