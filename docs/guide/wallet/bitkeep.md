# BitKeep Swap

::: tip Note
Only BitKeep Chrome extension is supported for the time being
If you send an unsupported mainnet, an error will be prompted
:::


- ### window.bitkeep.navigateTo

  invoke swap， Support Mainnet can refer to [support mainnet](/swapchainList.json).

  ```javascript
  window.bitkeep.navigateTo('swap', {
      chain: "eth",
      fromCoin: {
          chain: 'eth',
          chainName: 'Ethereum',
          contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          icon: 'https://cdn.bitkeep.vip/coins/u/usdt_eth.png',
          symbol: 'USDT',
      },
      toCoin: {
          chain: 'eth',
          chainName: 'Ethereum',
          icon: 'https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png',
          symbol: 'ETH',
      }
  });

  ```

  ### params

  | key      | type   | require | default                         | description                                                     |
  | -------- | ------ | ------- | ------------------------------- | --------------------------------------------------------------- |
  | fromCoin | object | false   | Current Mainnet Token           | Token to be swap. Refer to the following table for details      |
  | toCoin   | object | false   | Current Mainnet Token usdt/usdc | Token to be converted. Refer to the following table for details |

  | fromCoin/toCoin | type   | require | value                                                                | description                                                           |
  | --------------- | ------ | ------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
  | chain           | string | true    | eth                                                                  | "eth" =="Ethereum" Mainnet name [reference json](/swapchainList.json) |
  | chainName       | string | false   | Ethereum                                                             | Mainnet name                                                          |
  | contract        | string | false   | contract address                                                     | token contract address                                                |
  | icon            | string | true    | http://cdn.bitkeep.vip/u_b_81d12c10-146e-11ec-9c06-1d0c5ac6bcb6.jpeg | token icon                                                            |
  | symbol          | string | true    | usdt                                                                 | token name                                                            |
