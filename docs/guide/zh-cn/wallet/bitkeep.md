# Bitkeep Swap

:::tip 提示
暂时只支持 BitKeep Chrome 插件， 注意：如果你发送一个不支持的主网，将提示错误。
:::

## window.bitkeep.navigateTo

调用 Swap，支持的主网可以参考[主网支持](/swapchainList.json)。

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

### 选项

| key      | 类型   | 必须 | 默认值                         | 描述          |
| -------- | ------ | ------- | ------------------------ | ---------------------------- |
| fromCoin | object | false   | 当前主网 Token           | 要调换的代币。详细情况请参考以下表格 |
| toCoin   | object | false   | 当前主网 Token usdt/usdc | 要转换的令牌。详细情况请参考以下表格 |

| fromCoin/toCoin | 类型   | 必须 | 值         | 描述                      |
| --------------- | ------ | ------- | -------- | --------------------------- |
| chain           | string | true    | eth           | "eth"=="Ethereum" 主网名[参考 JSON](/swapchainList.json) |
| chainName       | string | false   | Ethereum      | 主网名                                                          |
| contract        | string | false   | 合约地址       | token 合约地址                                        |
| icon            | string | true    | http://cdn.bitkeep.vip/u_b_81d12c10-146e-11ec-9c06-1d0c5ac6bcb6.jpeg | token 图标     |
| symbol          | string | true    | usdt                                                                 | token 名称     |
