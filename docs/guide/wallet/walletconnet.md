# WalletConnect

## EVM(WebApp)

WalletConnect is an open protocol for connecting wallets and DApps (Web3 applications), which uses a bridge server to establish a remote connection between two applications and/or devices, scan a QR code to establish a connection and start communication. BitKeep Wallet App now supports WalletConnect。

For more detailed document, please refer to the [https://docs.walletconnect.com](https://docs.walletconnect.com)

- [react-app.walletconnect.com/)](https://react-app.walletconnect.com/)
- [Web3 Provider](https://docs.walletconnect.com/quick-start/dapps/web3-provider)
- [Standalone Client](https://docs.walletconnect.com/quick-start/dapps/client)
- [example](https://github.com/WalletConnect/web-examples)

we provide a [simple demo](https://github.com/bitkeepwallet/download/tree/example/example/walletConnect)

    npm install --save @walletconnect/client @walletconnect/qrcode-modal

```js
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

// Create a connector
const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org', // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe to connection events
connector.on('connect', (error, payload) => {
  if (error) {
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on('session_update', (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on('disconnect', (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});
```

## EVM(Native App SDK)

Please refer to the [WalletConnect Doc](https://docs.walletconnect.com/quick-start) and follow to find the docking documentation of your current program
