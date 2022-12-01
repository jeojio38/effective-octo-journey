# Aptos

要在您的 DApp 中使用 BitKeep 钱包，您的用户必须先在浏览器中安装 BitKeep 扩展钱包。BitKeep 钱包会在 [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) 中注入一个 `bitkeep.aptos` 对象。

## npm package 
  - [Aptos Wallet Adapter](https://github.com/hippospace/aptos-wallet-adapter) 
## 是否安装

要检查用户是否已经安装BitKeep钱包，请执行以下检查:

```js
const isBitKeepInstalled = window.bitkeep && window.bitkeep.aptos;
```

## 检测 Aptos 提供者

如果 BitKeep 钱包没有安装，你可以提示用户先安装 BitKeep 钱包，并提供以下安装说明。例如，见下文：

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

## 连接到 BitKeep 钱包

在确认Web应用程序拥有`bitkeep.aptos`对象后，我们可以通过调用`wallet.connect()`来连接BitKeep钱包。

当你调用`wallet.connect()`时，它会提示用户允许你的Web应用程序对BitKeep钱包进行额外的调用，并从用户那里获得基本信息，如地址和公钥。

:::tip 提示:
在用户第一次批准连接后，网络应用程序的域名将被记住，用于未来的会话。
:::

见下面的示例代码:

```js
const wallet = getAptosWallet();
try {
  const response = await wallet.connect();
  console.log(response); // { address: string, address: string }

  const account = await wallet.account();
  console.log(account); // { address: string, address: string }
} catch (error) {
  // { code: 4001, message: "User rejected the request."}
}
```

## 发送交易

在您的网络应用程序连接到BitKeep钱包后，网络应用可以提示用户签署并发送交易到Aptos区块链。

BitKeep钱包API以两种方式处理交易。

1. 签署交易并提交给Aptos区块链。向网络应用程序返回一个待定交易。
2. 签署一个交易，但不提交给Aptos区块链。将已签署的交易返回给网络应用程序，让网络应用程序提交该交易。

请看下面的例子来了解这两个选项。

:::tip 提示:
更多关于Aptos交易的信息，请参见[Aptos SDKs](https://aptos.dev/sdks/index/) 和 [Aptos的交易指南](https://aptos.dev/guides/creating-a-signed-transaction/)。
:::

### 签署和提交

下面的代码示例显示了如何使用 `signAndSubmitTransaction()` API来签署交易并将其发送到Aptos区块链上。

```js
const wallet = getAptosWallet(); // see "Connecting"

// Example Transaction, following an [EntryFunctionPayload](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/generated/models/EntryFunctionPayload.ts#L8-L21)
const transaction = {
    arguments: [address, '717'],
    function: '0x1::coin::transfer',
    type: 'entry_function_payload',
    type_arguments: ['0x1::aptos_coin::TestCoin'],
};

/** 自定义 gas fee
 *  default {
        "gas_unit_price":"100",
        "max_gas_amount":"10000"
    }
 */
const options = {
  
    gas_unit_price: 100,
    max_gas_amount: 10000
} 
try {
    const pendingTransaction = await window.bitkeep.aptos.signAndSubmitTransaction(transaction);
    // const pendingTransaction = await window.bitkeep.aptos.signAndSubmitTransaction(transaction, options);

    // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
    const client = new AptosClient('https://testnet.aptoslabs.com');
    client.waitForTransaction(pendingTransaction.hash);
} catch (error) {
    // see "Errors"
}
```

### 只签署

**重要**：我们不建议使用这个，因为在大多数情况下你不需要它，而且对用户来说也不是超级安全的。他们会因此收到一个额外的警告。

下面的代码例子显示了如何使用 `signTransaction()` API来只签署交易，而不提交给Aptos区块链。

```js
const wallet = getAptosWallet(); // see "Connecting"

// Example Transaction
const transaction = {
    arguments: [address, '717'],
    function: '0x1::coin::transfer',
    type: 'entry_function_payload',
    type_arguments: ['0x1::aptos_coin::TestCoin'],
};

/** 自定义 gas fee
 *  default {
        "gas_unit_price":"100",
        "max_gas_amount":"10000"
    }
 */
const options = {
    gas_unit_price: 100,
    max_gas_amount: 10000
} 
try {
    const signTransaction = await window.bitkeep.aptos.signTransaction(transaction)
      // const signTransaction = await window.bitkeep.aptos.signTransaction(transaction, options)
} catch (error) {
    // see "Errors"
}

```

## 签署消息

Web应用程序也可以通过使用BitKeep钱包API要求用户签署信息：`wallet.signMessage(payload: SignMessagePayload)`。

- `signMessage(payload: SignMessagePayload)`向用户提示要签名的 payload.message
- 返回 `Promise<SignMessageResponse>`。

类型:

```ts
export interface SignMessagePayload {
  address?: boolean; // Should we include the address of the account in the message
  application?: boolean; // Should we include the domain of the dapp
  chainId?: boolean; // Should we include the current chain id the wallet is connected to
  message: string; // The message to be signed and displayed to the user
  nonce: string; // A nonce the dapp should generate
}

export interface SignMessageResponse {
  address: string;
  application: string;
  chainId: number;
  fullMessage: string; // The message that was generated to sign
  message: string; // The message passed in by the user
  nonce: string;
  prefix: string; // Should always be APTOS
  signature: string; // The signed full message
}
```

### 消息示例

signMessage({nonce: 1234034, message: "Welcome to dapp!" })
这将生成要签名的 fullMessage 并作为签名返回:

```text
    APTOS
    nonce: 1234034
    message: Welcome to dapp!
```

### 验证

签署信息的最常见的使用情况是验证私有资源的所有权。

```js
import nacl from 'tweetnacl';

const message = "hello";
const nonce = "random_string"

try {
  const response = await window.bitkeep.aptos.signMessage({
    message,
    nonce,
  });
  const { publicKey } = await window.bitkeep.aptos.account();
  // Remove the 0x prefix
  const key = publicKey!.slice(2, 66);
  const verified = nacl.sign.detached.verify(Buffer.from(response.fullMessage),
                                             Buffer.from(response.signature, 'hex'),
                                             Buffer.from(key, 'hex'));
  console.log(verified);
} catch (error) {
  console.error(error);
}
```

## 事件监听

### onNetworkChange() 和 network()

一个DApp可能想确保用户是在正确的网络上。在这种情况下，你需要检查钱包使用的是什么网络。

::: warning 网络
  We support network：
  `Mainnet` | `Devnet`

  正式`Mainnet`已经上线,`Testnet`已经修改成`Mainnet`
:::

由BitKeep钱包提供的默认网络:

```ts
// default networks in the wallet
enum Network {
  Mainnet = 'Mainnet'
  Devnet = 'Devnet'
}

// Current network
let network = await window.bitkeep.aptos.network();

// event listener for network changing
window.bitkeep.aptos.onNetworkChange((newNetwork) => {
  network = newNetwork; // { networkName: 'Mainnet' }
});
```

### onAccountChange()

在BitKeep钱包中，用户在与你的应用程序互动时可能会改变账户。要检查这些事件，请使用：onAccountChange来监听它们。

```ts
// get current account
let currentAccount = await window.bitkeep.aptos.account();

// event listener for disconnecting
window.bitkeep.aptos.onAccountChange((newAccount) => {
  // If the new account has already connected to your app then the newAccount will be returned
  if (newAccount) {
    currentAccount = newAccount;
  } else {
    // Otherwise you will need to ask to connect to the new account
    currentAccount = window.bitkeep.aptos.connect();
  }
});
```

## 错误

当向BitKeep钱包API发出请求时，你可能会收到一个错误。以下是可能出现的错误及其相应的代码的部分列表：

```js
 {
    code: 4100,
    message:"The requested method and/or account has not been authorized by the user."
 }
```

- 4100 要求的方法或账户没有得到用户的授权。
- 4000 账户未找到。
- 4001 用户拒绝了请求。
