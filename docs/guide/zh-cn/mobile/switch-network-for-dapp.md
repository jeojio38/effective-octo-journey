# 切换网络

因为BitKeep是一个多链钱包，所有主链都可以在一个钱包下管理，所以DApp也可以在当前钱包下连接到多个主链生态系统。有两种方法可以切换主网络。

## URL 参数切换

在URL中加入参数 `_needChain=主链币`，BitKeep浏览器会自动插入相应的主链生态代码，比如：

- ETH 网络：`https://bitkeep.com?_needChain=eth#/swap`
- BSC 网络：`https://bitkeep.com?_needChain=bnb#/swap`
- Heco 网络：`https://bitkeep.com?_needChain=ht#/swap`

要使用这个，需要刷新页面。

<!-- ## Function Call

use `wallet_switchEthereumChain/wallet_addEthereumChain`

BitKeep has integrated the above two methods of Metamask, and you can switch between ETH and EVM networks by calling this method;

::: tip
There are two ways to determine whether it is in the BitKeep browser: whether the userAgent contains BitKeep, or window.isBitKeep
::: -->