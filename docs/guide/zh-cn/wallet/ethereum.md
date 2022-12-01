# 以太坊(EVM)

BitKeep在其用户访问的网站中注入一个全局API，地址是`window?.bitkeep?.ethereum`。这个API允许网站请求用户的以太坊账户，从用户连接的区块链上读取数据，并建议用户签署信息和交易。提供者对象的存在表明是一个以太坊用户。

## 检测以太坊提供者

```js
function getProvider() {
  const provider = window.bitkeep && window.bitkeep.ethereum;
  if (!provider) {
    window.open('https://bitkeep.com/en/download?type=2');
    throw "Please go to our official website to download!!"
  }
  return provider;
}
```
## 基本用法

对于任何有一定复杂度的以太坊网络应用--又称dapp、web3站点等--来说，你必须：

  1. 检测以太坊提供者(`window?.bitkeep?.ethereum`)
  2. 检测用户连接到哪个以太坊网络
  3. 获取用户的以太坊账户

你可以参考[eth-requestaccounts](#eth-requestaccounts)或[address-conflicts-when-switching-network](/faq.html#_3-address-conflicts-when-switching-network)代码片段

提供者API是你创建一个全功能的web3应用程序所需要的全部内容。

可以参考三方库的 Web3.0 登录以实现快速接入 BitKeep 插件钱包。

:::tip 提示
使用第三方库时，使用 `window.bitkeep.ethereum` 作为程序的提供者注入。
:::

  - 库
    -  [web3js](https://www.npmjs.com/package/web3)
    -  [ethers](https://www.npmjs.com/package/ethers)
  - npm
    - [bitkeep-web3modal](https://www.npmjs.com/package/bitkeep-web3modal)

```js
//npm install bitkeep-web3modal
// fork from https://github.com/WalletConnect/web3modal  https://github.com/WalletConnect/web3modal/issues/574
import web3modal from 'bitkeep-web3modal';
const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: true, // optional
  providerOptions: {
    bitkeep: {
      package: true,
    },
    walletconnect: {
      display: {
        logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
        name: 'Mobile',
        description: 'Scan qrcode with your mobile wallet',
      },
      package: WalletConnectProvider,
      options: {
        infuraId: 'INFURA_ID', // required
      },
    },
  }, // required
});

```

## 链 ID 列表

这些是BitKeep默认支持的以太坊链的chainId。更多信息请参考 [chainid.network](https://chainlist.org/zh)。

| Hex        | Decimal    | Network          | Hex        | Decimal    | Network          |
| ---------- | ---------- | ---------------- | ---------- | ---------- | ---------------- |
| 0x1        | 1          | Ethereum         | 0xa        | 10         | Optimism         |
| 0x18       | 24         | KardiaChain      | 0x19       | 25         | Cronos           |
| 0x38       | 56         | BNB Chain        | 0x39       | 57         | Syscoin          |
| 0x3d       | 61         | Ethereum Classic | 0x42       | 66         | OKX Chain        |
| 0x52       | 82         | Meter Mainnet    | 0x56       | 86         | GateChain        |
| 0x58       | 88         | TomoChain        | 0x64       | 100        | Gnosis Chain     |
| 0x6a       | 106        | Velas            | 0x73       | 115        | Lucky Chain      |
| 0x7a       | 122        | Fuse             | 0x80       | 128        | Heco             |
| 0x89       | 137        | Polygon          | 0xc7       | 199        | BitTorrent       |
| 0xfa       | 250        | Fantom           | 0x120      | 288        | Boba Network     |
| 0x141      | 321        | KCC              | 0x334      | 820        | Callisto Mainnet |
| 0x3e6      | 998        | Lucky Network    | 0x500      | 1280       | HALO             |
| 0x505      | 1285       | Moonriver        | 0x71a      | 1818       | CUBE             |
| 0x7e3      | 2019       | ClassZZ          | 0x868      | 2152       | Findora          |
| 0x8ae      | 2222       | Kava             | 0x1251     | 4689       | IoTeX            |
| 0x2019     | 8217       | KLAY             | 0x2710     | 10000      | smartBCH         |
| 0x4b82     | 19330      | TRUE             | 0x4ef4     | 20212      | ZSC              |
| 0x7f08     | 32520      | Bitgert          | 0xa4b1     | 42161      | Arbitrum         |
| 0xa4ec     | 42220      | Celo             | 0xa516     | 42262      | Oasis Emerald    |
| 0xa86a     | 43114      | AVAX-C           | 0x116e2    | 71394      | Nervos CKB EVM   |
| 0x335f9    | 210425     | PlatON           | 0x3e900    | 256256     | Caduceus         |
| 0xa3488    | 668808     | ASM              | 0x4e454152 | 1313161554 | Aurora           |
| 0x63564c40 | 1666600000 | Harmony          |            |            |                  |

## isConnected()

:::tip 提示
请注意，这种方法与用户的账户没有任何关系。你可能经常遇到 "connected "这个词，指的是web3站点是否可以访问用户的账户。然而，在提供者界面中，"conented "和 "disconnected "指的是提供者是否能向当前链发出RPC请求。
:::

```js
const Provider = getProvider();
Provider.isConnected();
```

## request(args)

```js
  const Provider = getProvider();
  interface RequestArguments {
    method: string;
    params?: unknown[] | object;
  }
  Provider.request(args: RequestArguments): Promise<unknown>;
```

### eth_requestAccounts

::: tip 提示
**EIP-1102** 该方法由[EIP-1102](https://eips.ethereum.org/EIPS/eip-1102)指定。它等同于被废弃的`bitkeep.ethereum.enable()`提供者API方法。

在系统内部，它调用wallet_requestPermissions的eth_accounts权限。由于eth_accounts是目前唯一的权限，这个方法是你目前所需要的全部。
:::

**返回值**

`string[]` - 单个十六进制以太坊地址字符串数组。

**描述**

请求用户提供一个以太坊地址来识别。返回一个解析为单个以太坊地址字符串数组的 Promise。如果用户拒绝该请求，Promise 将拒绝并返回 4001 错误。

这个请求会弹出 BitKeep 钱包窗口，通常用按钮来触发，在该请求未有响应时，应禁止用户点击按钮。

如果您没有获取到用户的账户信息，您应该提示用户点击按钮等操作来发起请求。

- `eth_accounts`
  - 获取 user
- `eth_chainId`
  - 获取 chainid(十六进制)

```js
const Provider = getProvider();

function connect() {
  Provider.request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChainChanged) // address or chainId changed
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to BitKeep.');
      } else {
        console.error(error);
      }
    });
}

//if used injected
const accounts = await Provider.request({ method: 'eth_requestAccounts' });

handleAccountsChainChanged(); // updated address or chainID,refer to accountsChanged/chainChanged(events)

const [address] = await Provider.request({ method: 'eth_accounts' }); // [0x1e805A9aB0FB007B4b9D44d598C6404cE292F20D]
const chainId = await Provider.request({ method: 'eth_chainId' }); // 0x1

//if used web3
import Web3 from 'web3';
const accounts = await Provider.request({ method: 'eth_requestAccounts' });
//  [0x1e805A9aB0FB007B4b9D44d598C6404cE292F20D]

const web3 = new Web3(Provider);

handleAccountsChainChanged(); // updated address or chainID, refer to accountsChanged/chainChanged(events)

const accounts = await web3.eth.getAccounts(); // [0x1e805A9aB0FB007B4b9D44d598C6404cE292F20D]
const chainId = await web3.eth.getChainId(); // 0x1
```

### wallet_watchAsset

> **EIP-747**
>
> 这个方法是由[EIP-747](https://eips.ethereum.org/EIPS/eip-747)规定的。

**参数**

  - `WatchAssetParams` - 要观察的资产的元数据。

```ts
  interface WatchAssetParams {
    type: 'ERC20'; // In the future, other standards will be supported
    options: {
      address: string; // The address of the token contract
      'symbol': string; // A ticker symbol or shorthand, up to 11 characters
      decimals: number; // The number of token decimals
      image: string; // A string url of the token logo
    };
}
```

**返回值**

`boolean` - 如果该代币被添加，则为 `true`，否则为 `false`。

**描述**

要求用户在BitKeep中跟踪代币。返回一个布尔值，表示该代币是否被成功添加。

很多以太坊钱包都支持一组代币，通常来自集中管理的代币注册表。`wallet_watchAsset` 使 web3 应用程序开发人员能够在运行时要求他们的用户跟踪他们钱包中的代币。添加后，token 与通过传统方法（例如集中式注册表）添加的 token 无法区分。

```ts
  const Provider = getProvider();
  Provider
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
          symbol: 'FOO',
          decimals: 18,
          image: 'https://foo.io/token-image.svg',
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log('FOO successfully added to wallet!');
      } else {
        throw new Error('Something went wrong.');
      }
    })
    .catch(console.error);
```

### wallet_switchEthereumChain/wallet_addEthereumChain

- **wallet_addEthereumChain**

  创建一个确认，要求用户添加指定的链到BitKeep。用户可以选择在添加后切换到该链。

  **参数:**

  对于`rpcUrls`和`blockExplorerUrls`数组，至少需要一个元素，并且只使用第一个元素。

  ```js
  interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
      name: string,
      symbol: string, // 2-6 characters long
      decimals: 18,
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
  }
  ```

  **返回值**

  `null` - 如果请求成功，该方法返回 `null`，否则返回错误。

  **与 wallet_switchEthereumChain 一起使用**

  我们建议将此方法与 `wallet_addEthereumChain` 一起使用：

  ```js
  const Provider = getProvider();
  try {
    await Provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xf00' }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to Bitkeep.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xf00',
              chainName: '...',
              rpcUrls: ['https://...'] /* ... */,
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
  ```

- **wallet_switchEthereumChain**

  创建一个确认，要求用户切换到指定链ID的链上。

  **参数:**

  对于 `rpcUrls` 和 `blockExplorerUrls` 数组，至少需要一个元素，并且只使用第一个元素。

  ```js
  interface SwitchEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
  }
  ```

  **返回值**

  `null` - 如果请求成功，该方法返回 `null`，否则返回错误。

  如果错误代码（`error.code`）是`4902`，那么BitKeep没有添加所请求的链，你必须通过`wallet_addEthereumChain`请求添加它。

  **描述**

  与任何导致确认出现的方法一样，`wallet_switchEthereumChain` 应该只在用户直接操作的情况下被调用，例如点击按钮。

  在以下情况下，Bitkeep将自动拒绝该请求：

  - 如果链 ID 格式错误
  - 如果指定的链 ID 未被添加到 BitKeep

### sendTransaction(Transfer)

```js
const Provider = getProvider();
const transactionParameters = {
  nonce: '0x00', // ignored by Bitkeep
  gasPrice: '0x09184e72a000', // customizable by user during Bitkeep confirmation.
  gas: '0x2710', // customizable by user during Bitkeep confirmation.
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: Provider.selectedAddress, // must match user's active address.
  value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  data:
    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by Bitkeep.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await Provider.request({
  method: 'eth_sendTransaction',
  params: [transactionParameters],
});

// if used web3
const accounts = await Provider.request({ method: 'eth_requestAccounts' });
const web3 = new Web3(Provider);
const result = await web3.eth.sendTransaction({
  from: Provider.selectedAddress,
  to: '0x0000000000000000000000000000000000000000',
  value: web3.utils.toWei('1', 'ether'),
});
```

## 以太坊 JSON-RPC 方法

关于以太坊 JSON-RPC API，请参见[Ethereum wiki](https://ethereum.org/en/developers/docs/apis/json-rpc/#json-rpc-methods)。
如何使用参考[API Playground](https://metamask.github.io/api-playground/api-documentation)。

- [eth_accounts](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)
- [eth_call](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)
- [eth_getBalance](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
- [eth_sendTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
- [eth_sign](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sign)

```ts

  const Provider = getProvider();

  await Provider.request({method:"eth_accounts", params:[]})
  await Provider.request({method:"eth_getBalance", params:[]})

```

## 事件监听器

当地址和网络改变时通知。使用了[eventemitter3](https://www.npmjs.com/package/eventemitter3)

```js
const Provider = getProvider();
// reomove all listeners
Provider.removeAllListeners();

function handleAccountsChainChanged() {
  Provider.on('accountsChanged', ([address]) => {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
    alert('address changed');
  });
  Provider.on('chainChanged', async (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    alert('chainid changed');
  });
}
```

另外，一旦开启监听器，监听完后不要忘记删除它们（例如在React中的组件卸载）。使用 `removeAllListeners` 防止多次监听。

```js
const Provider = getProvider();
function handleAccountsChanged(accounts) {
  // ...
}
Provider.on('accountsChanged', handleAccountsChanged);

//remove
Provider.removeAllListeners(); //remove all
Provider.removeListener('accountsChanged', handleAccountsChanged); // only remove accountsChanged
```

**accountsChanged**

每当 eth_accounts RPC 方法的返回值发生变化时，BitKeep 提供程序都会发出此事件。eth_accounts 返回一个空数组或包含单个帐户地址的数组。返回的地址（如果有）是允许调用者访问的最近使用的帐户的地址。调用者由其 URL 来源标识，这意味着具有相同来源的所有站点共享相同的权限。

这意味着只要用户暴露的账户地址发生变化，就会发出 accountsChanged。

```ts
  const Provider = getProvider();
  Provider.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

**chainChanged**

当前连接的链发生变化时，BitKeep提供者会发出这个事件。

所有RPC请求都提交给当前连接的链。因此，通过监听这个事件来跟踪当前链的ID是非常重要的。

我们强烈建议在链变化时重新加载页面，除非你有充分的理由不这样做。

```ts
  const Provider = getProvider();
  Provider.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

## 签署数据

  - `eth_sign`
  - `personal_sign`
  - `eth_signTypedData`
  - `eth_signTypedData_v3`
  - `eth_signTypedData_v4`

  你可以参考文档

  - [signing-data-with-metamask](https://docs.metamask.io/guide/signing-data.html#signing-data-with-metamask)
  - [eth-sig-util](https://github.com/MetaMask/eth-sig-util).
  - [demo](https://github.com/bitkeepwallet/example/tree/master/evm-dapp-demo/test-dapp)

## 错误

所有由 BitKeep 提供者抛出或返回的错误都遵循这个接口：

```ts
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

ethereum.request(args) 方法会及时的抛出错误。你通常可以使用错误代码属性来确定请求失败的原因。常见的代码及其含义包括:

- `4001`
  - 该请求被用户拒绝
- `-32603`
  - 内部错误或参数无效
