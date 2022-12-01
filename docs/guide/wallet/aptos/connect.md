# Aptos
To use BitKeep Wallet with your dApp, your users must first install the BitKeep Wallet Chrome extension in their browser. BitKeep Wallet injects an `your` object into the [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) of any web app the user visits.

## IsInstalled
To check if the user has installed BitKeep Wallet, perform the below check:

```js
const isBitKeepInstalled = window.bitkeep && window.bitkeep.aptos;
```


## Detect the Aptos provider
If BitKeep Wallet is not installed, you can prompt the user to first install Petra Wallet and provide the below installation instructions. For example, see below:

```js
    function getAptosWallet() {
        const provider = window.bitkeep && window.bitkeep.aptos;
            if (!provider) {
                window.open('https://bitkeep.com/download?type=2');
                throw "Please go to our official website to download!!"
            }
        return provider;
    }
```

## Connecting to BitKeep Wallet

After confirming that the web app has the `bitkeep.aptos` object, we can connect to BitKeep Wallet by calling `wallet.connect()`.

When you call `wallet.connect()`, it prompts the user to allow your web app to make additional calls to Petra Wallet, and obtains from the user basic information such as the address and public key.

::: tip
 After the user has approved the connnection for the first time, the web app's domain will be remembered for the future sessions.
:::

See the example code below:
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
