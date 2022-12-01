# Solana

:::tip 提示
使用第三方库时，使用 `window.bitkeep.solana` 作为程序的提供者。
:::

- 库
  - [solana-web3](https://solana-labs.github.io/solana-web3.js)
- npm
  - [wallet-adapter](https://www.npmjs.com/package/@solana/wallet-adapter-react)

## 是否安装

```js
const isBitKeepInstalled = window.isBitKeep && window.bitkeep.solana;
```

[https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets](https://github.com/solana-labs/wallet-adapter/tree/master/packages/wallets)

## 提供者

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

## connect

请求授权连接

```js
try {
  await window.bitkeep.solana.connect();
  const publicKey = await window.bitkeep.solana.getAccount();
  window.bitkeep.solana.publicKey.toString(); // Once the web application is connected to Bitkeep,
} catch {
  alert('connected error');
}
```

## connected

```js
window.bitkeep.solana.connected;
const publicKey = await window.bitkeep.solana.getAccount();
window.bitkeep.solana.publicKey.toString(); // Once the web application is connected to Bitkeep
```

## signMessage

```js
//string
window.bitkeep.solana.signMessage(
  '020006106e655af38ff7324bbf1d4e16b06084763269b9'
);

// uint8Array
const message = `You can use uint8array to verify`;
const encodedMessage = new TextEncoder().encode(message);
const signedMessage = await window.bitkeep.solana.signMessage(encodedMessage);
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');
// nacl.sign.detached.verify(encodedMessage, signedMessage, publicKey)
nacl.sign.detached.verify(
  encodedMessage,
  signedMessage,
  new PublicKey(address).toBytes()
);
```

## 事件监听器

使用 [eventemitter3](https://www.npmjs.com/package/eventemitter3)

```js
window.bitkeep.solana.on('connect', () => console.log('connected!'));
```

## sendTransaction

你可以参考下列演示:

- [simple demo](https://github.com/bitkeepwallet/download/blob/example/example/solana/dapp/index.html)
- [web3 demo](https://github.com/solana-labs/solana/tree/master/web3.js/examples)
- [Token demo](https://github.com/solana-labs/solana-program-library/tree/master/token/js/examples)
