# 常见问题解答

## BitKeep Chrome 插件

::: tip 提示
请全局使用 `window.bitkeep.ethereum` 作为接入BitKeep钱包的规范，全部的操作都应该使用该对象。
:::

### 1. 检测不到 window?.bitkeep?.ethereum 程序

检测不到 window?.bitkeep?.ethereum 程序项目方自行可引导用户跳转到 [BitKeep 官网下载插件](https://bitkeep.com/en/download?type=2)

示例代码如下：

```TypeScript{2}
function getProvider() {
    const provider = window.bitkeep && window.bitkeep.ethereum;
    if (!provider) {
        window.open('https://bitkeep.com/en/download?type=2');
        throw "Please go to our official website to download!!"
    }
    return provider;
}
```

### 2. 覆盖及其他钱包调用冲突的问题

许多 Dapp 接入 `BitKeep Extension` 时使用 `window.ethereum` 从而导致出现覆盖问题 冲突问题，这给用户带来了很多困惑。解决方案如下：

::: tip 提示
请使用 `window.bitkeep.ethereum` 接入 Bitkeep Extension，它和 `web3.currentProvider` `window.ethereum` 程序提供功能是相同的。可参考下面多钱包示例代码
:::

### 3. 多个钱包切换链或者地址冲突问题

::: tip 提示
在切换钱包连接之前，应该清空上一次钱包监听的事件。
:::

示例代码:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <script src="./js/web3.min.js"></script> -->
    <script src="https://cdn.bootcdn.net/ajax/libs/web3/1.8.0/web3.min.js"></script>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  </style>
  <body>
    <div>
      <button id="bitKeepConnect">BitKeep</button>
      <button id="injectedConnect">injected</button>
      <div>
        <span id="address"></span>
        <span id="chainId"></span>
      </div>
    </div>

    <div>
      <button id="eth_signTypedData_v4">eth_signTypedData_v4</button>
    </div>
    <script>

      let bitKeepBtn = document.querySelector("#bitKeepConnect"),
        injectedBtn = document.querySelector("#injectedConnect"),
        ethSignTypedDataV4Btn = document.querySelector("#eth_signTypedData_v4"),
        addressSpan = document.querySelector("#address"),
        chainIdSpan = document.querySelector("#chainId");

      let provider = null,
        web3 = null;

      function getProvider(type) {
        let provider = null;
        if (type == "bitkeep") {
          provider = window.bitkeep && window.bitkeep.ethereum;
          if (!provider) {
            window.open("https://bitkeep.com/en/download?type=0&theme=light");
            throw "please install BitKeep";
          }
        } else {
          provider = window.ethereum;
          if (!provider) {
            throw "please install injected wallet";
          }
        }
        return provider;
      }

      //address  and chanId changed event
      async function accountsChanged(accounts) {
        console.log("address, isBitKeep:", !!provider.isBitKeep, accounts);
        const [address] = await web3.eth.getAccounts();
        addressSpan.innerText = address;
      }
      async function chainChanged(chainId) {
        console.log("chainChanged,isBitKeep", !!provider.isBitKeep, chainId);
        chainIdSpan.innerText = await web3.eth.getChainId();
      }

      async function connect(type = "bitkeep") {
        const lastProvider = provider;
        const newProvider = getProvider(type);

        await newProvider.request({ method: "eth_requestAccounts" });

        //1. Prevent logical conflicts. clear the last wallet listening event.
        if (lastProvider) {
          provider.removeAllListeners();
        }

        //2. The authorized link successfully replaces the wallet's providers
        provider = newProvider;
        web3 = new Web3(provider);
        // 3. event listener  address and chainId changed.  If the address does not exist, it is disconnected
        provider.on("accountsChanged", async (accounts) => {
          accountsChanged(accounts);
        });
        provider.on("chainChanged", async (chainId) => {
          chainChanged(chainId);
        });
        //4. Get the current address and chainId
        accountsChanged();
        chainChanged();

        //5.  Cache the default link and go to the wallet
        localStorage.setItem("injected", type);
      }

      //connect
      async function bitKeepBtnClick() {
        await connect("bitkeep");
        injectedBtn.style.backgroundColor = "transparent";
        bitKeepBtn.style.backgroundColor = "blue";
      }
      async function injectedBtnClick() {
        await connect("metaMask");
        bitKeepBtn.style.backgroundColor = "transparent";
        injectedBtn.style.backgroundColor = "blue";
      }
      async function ethSignTypedDataV4BtnClick() {
        const [address] = await web3.eth.getAccounts();
        // provider.request({method:"personal_sign",params:[address  ,"Hello world"]})
        const sign = await web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), address);
      }


      bitKeepBtn.onclick = bitKeepBtnClick;
      injectedBtn.onclick = injectedBtnClick;
      ethSignTypedDataV4Btn.onclick = ethSignTypedDataV4BtnClick; // Call up signatur

      localStorage.injected &&  itKeepBtnClick(localStorage.injected);
      //
    </script>
  </body>
</html>
```

### 4. 使用第三方 npm 包接入问题

::: tip 提示
使用第三方 npm 包，应该使用 `window.bitkeep.ethereum` 作为程序的提供者注入。
:::

 - #### [web3modal](https://www.npmjs.com/package/web3modal)

 该包的最新版本默认走MetaMask的统一方式，区分多钱包的方式最新代码还没发版。Bitkeep Extension提供如下两种解决方案示例代码：

  1. 打开 BitKeep，但无法不能使用问题的解决方案: [ssues/574](https://github.com/WalletConnect/web3modal/issues/574)
  2. 使用 [bitkeep-web3modal](https://www.npmjs.com/package/bitkeep-web3modal) 示例代码来支持 Bitkeep Extension
  > 下面这种方式 fork 的 web3modal 支持多钱包存在的情况

```js
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

- #### [wagmi](https://www.npmjs.com/package/wagmi)

该包最新支持BitKeep版本处于待发布状态，如需快速支持可参考我们提供的示例[演示](https://github.com/bitkeepwallet/download/tree/example/example/eth/wagmi-bitkeep-react)实现。

- #### [ethers.js](https://www.npmjs.com/package/ethers)

::: tip 提示
ethers.js 默认在 window 上挂载 `_ethers` 对象, 不建议使用 `window._ethers` BitKeep 默认也注入了 `_ethers` 对象，避免使用 `_ethers` 因为加载顺序造成使用冲突参考以下方式引入使用。
:::

```js
//import
import ethers from "ethers"
const ethers = rquire("ethers")
//cdn
window.ethers

```
### 5. Aptos已经切换成Mainnet
::: tip 网络
  我们现在支持的网络：`Mainnet` | `Devnet`
   
  正式`Mainnet`已经上线,`Testnet`已经修改成`Mainnet`

  可以使用`DevTest`进行测试

:::



