# 快速接入 BitKeep 插件钱包

## EVM

:::tip 提示
前置条件：如果开发者已经 接入兼容 **MetaMask** 相同规范的插件钱包 。
:::

**如何快速接入**

检测 provider 是否为`window.bitkeep.ethereum`，如不是 ，请将其替换为BitKeep专属provider `window.bitkeep.ethereum`。

代码示例：

```js
function getProvider() {
  const provider = window.bitkeep && window.bitkeep.ethereum;
  if (!provider) {
    return window.open('https://bitkeep.com/en/download?type=2');
  }
  return provider;
}
```

**注意事项**

若开发者接入多个插件钱包，当用户切换网络或地址时，为避免与其他插件钱包事件监听冲突，开发者应在切换钱包之前清除当前钱包监听事件。

代码示例：

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

## Solana

:::tip 提示
前置条件：开发者已经接入 兼容 **MathWallet** 相同规范的插件钱包。
:::

**如何快速接入**

检测provider 是否为`window.bitkeep.solana`，如不是 ，请将其替换为BitKeep专属provider `window.bitkeep.solana`。

代码示例：

```js
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

:::tip 提示
前置条件：开发者已经接入 兼容 **petra** 相同规范的插件钱包。
:::

**如何快速接入**

检测provider 是否为 `window.bitkeep.aptos`，如不是 ，请将其替换为BitKeep 专属provider `window.bitkeep.aptos`。

代码示例：

```js
function getAptosWallet() {
  const provider = window.bitkeep && window.bitkeep.aptos;
  if (!provider) {
    window.open('https://bitkeep.com/en/download?type=2');
    throw 'Please go to  https://bitkeep.com/en/download?type=2  to download!!';
  }
  return provider;
}
```

## 其他

如果开发者未按上述标准接入过其他插件钱包，可参考 不同链API接入 或 第三方npm包的接入方法接入BitKeep插件钱包。

### API 接入

- [EVM](/guide/wallet/ethereum.html)
- [Solana](/guide/wallet/solana.html)
- [Tron](/guide/wallet/tron.html)
- [Aptos](/guide/wallet/aptos.html)

### 已支持三方包

**EVM**

- [web3js](https://www.npmjs.com/package/web3)
- [ethers](https://www.npmjs.com/package/ethers)
- [bitkeep-web3modal](https://www.npmjs.com/package/bitkeep-web3modal)

**Solana**

- [solana-web3.js](https://solana-labs.github.io/solana-web3.js/)
- [@solana/wallet-adapter-react](https://www.npmjs.com/package/@solana/wallet-adapter-react)
