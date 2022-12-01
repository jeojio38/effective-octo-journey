# Tron

We provide [Simple demo](https://github.com/bitkeepwallet/download/tree/example/example/tron/dapp) and are compatible with [tronlink dapp](https://developers.tron.network/docs/dapp-integrate-with-tronlink-introduction).

## Installed or not

```js
const isBitKeepInstalled = window.tronLink && window.isBitKeep;
```

## eth_requestAccounts(request authorization to connect)

```js
try {
  await tronLink.request({ method: 'tron_requestAccounts' });
  const address = tronWeb.defaultAddress.base58;
  const balance = await tronWeb.trx.getBalance(address);
} catch {}
```

## connected

```js
  window.tronWeb.ready;
```

## sendTransaction(Transfer)

```js
var tronweb = window.tronWeb;
var tx = await tronweb.transactionBuilder.sendTrx(
  'TW8u1VSwbXY7o7H9kC8HmCNTiSXvD69Uiw',
  1000000,
  tronWeb.defaultAddress.base58
);
var signedTx = await tronweb.trx.sign(tx);
var broastTx = await tronweb.trx.sendRawTransaction(signedTx);
console.log(broastTx);
console.log(broastTx.txid);

//Token
let decimal = 18;
let Contract = await tronWeb
  .contract()
  .at('TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7'); //WIN
const decimalCall = Contract.decimals || Contract.DECIMALS;
if (decimalCall) {
  decimal = await decimalCall().call();
}
let broastTx = await Contract.transfer(
  'TW8u1VSwbXY7o7H9kC8HmCNTiSXvD69Uiw',
  // "0xde0b6b3a7640000"
  tronWeb.toHex(2 * Math.pow(10, decimal))
)
  .send
  // {
  //     feeLimit: 10000000
  // }
  ();
console.log(broastTx);
```

