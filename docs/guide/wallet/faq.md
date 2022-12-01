# FAQs 

## FAQs about BitKeep Chrome Extension
::: tip Note
Please always use `window.bitkeep.ethereum` as the constant provider when connecting to BitKeep Wallet.
:::
### 1.   If it fails to detect the window?.bitkeep?.ethereum program

If it fails to detect the window?.bitkeep?.ethereum program,  the developer may guide the user to go to [bitkeep.com to download the extension](https://bitkeep.com/en/download?type=2)
    
For instance:
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

### 2. Overwriting and other conflicts 

Many DApps use `window.ethereum` when connecting to `BitKeep Chrome Extension`, which causes overwriting and other conflicts, making users confused. Solution:
::: tip Note
Please use `window.bitkeep.ethereum` to connect to `BitKeep Chrome Extension`, it shares the same features as `web3.currentProvider` `window.ethereum program`. 
Please refer to the following sample code for more than one wallet
:::

### 3. Address conflicts when switching network

::: tip Note
Please clear the current wallet listening event before switching network.
::: 

For instance:

```javascript{45,74,78,86,89,51}
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

### 4. Difficulties in using third-party npm packages to connect

::: tip Note
 When you are using a third-party npm package, please use `window.bitkeep.ethereum` as the provider.
::: 

 - #### [web3modal](https://www.npmjs.com/package/web3modal)

 The latest release of the package allows to connect via the MetaMask interface. The latest code distinguishes different wallets but is not released yet. You have two options for this problem:

  - Option 1:  If BitKeep launches but does not function properly, please refer to: [ssues/574](https://github.com/WalletConnect/web3modal/issues/574)

  -  Option II: Use [bitkeep-web3modal](https://www.npmjs.com/package/bitkeep-web3modal) 
  > web3modal forked in the following way supports the existence of multiple wallets
    

```javascript
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

The next version of the package will support BitKeep but it is yet to be released. For quick support, please refer to the [demo](https://github.com/bitkeepwallet/download/tree/example/example/eth/wagmi-bitkeep-react)[wagmi-bitkeep-react](https://github.com/bitkeepwallet/example/tree/master/evm-dapp-demo/wagmi-bitkeep-react) we provide.

- #### [ethers.js](https://www.npmjs.com/package/ethers)

::: tip Note
ethers.js mounts the `_ethers` object in a window by default. It’s not recommended that you use `window. _ethers`
BitKeep also injects the `_ether`s object by default to avoid conflicts caused by loading sequence.
Refer to the following way to import and use.
:::

```js
//import
import ethers from "ethers"
const ethers = rquire("ethers")
//cdn
window.ethers

```
### 5. Aptos has switched to Mainnet 
::: tip network
 We support network：  `Mainnet` | `Devnet`

 `Testnet` has been modified to `Mainnet` 

  Aptos network switching can be tested by `Devnet`

:::

