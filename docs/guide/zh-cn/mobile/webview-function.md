# Webview 方法(只移动端)

BitKeep提供了一些公共方法让Dapp与钱包互动。你可以复制这个网址到BitKeep DApp搜索栏，并尝试一下。

## isBitKeep

```javascript
// check the UserAgent include "BitKeep"
var isBitKeep = navigator.userAgent.indexOf('BitKeep') > 0;
// check the var
var isBitKeep = window.isBitKeep;
```

## 获取钱包身份

```javascript
BitKeepInvoke.getIdentity(callback);
```

## 获取地址

```javascript
BitKeepInvoke.getAddress(callback);
```

## 选择住币

```javascript
BitKeepInvoke.selectCoin(callback);
```

## Toast

```javascript
BitKeepInvoke.toast("Hello World");
```

## Alert

```javascript
BitKeepInvoke.alert("Hello", callback);
```

## Confirm

```javascript
BitKeepInvoke.confirm("Hello?", callback);
```

## 关闭页面

```javascript
BitKeepInvoke.close();
```

## 显示/隐藏 Loading

```javascript
BitKeepInvoke.showLoading();
BitKeepInvoke.hideLoading();
```

## 打开 URL

```javascript
//In APP
BitKeepInvoke.openUrl("https://www.google.com");
//Our Of APP
BitKeepInvoke.openUrl2("https://www.google.com");
```

## 在右上角显示文本按钮

```javascript
BitKeepInvoke.setTextAction("Text", function(){
    //Click Callback
});
```

## 在右上角显示图片按钮

```javascript
BitKeepInvoke.setIconAction("http://xxx.png", function(){
    //Click Callback
});
```

## 分享文本

```javascript
BitKeepInvoke.shareText("message", callback);
```

## 分享图片

```javascript
BitKeepInvoke.shareImage("http://xxx.png", callback);
```

## 分享截图

```javascript
BitKeepInvoke.shareScreenshot(callback)
```

## 分享 URL

```javascript
BitKeepInvoke.shareUrl("title", "description", "url", "icon", callback);
```

## Transfer

```javascript
BitKeepInvoke.pay(ChainCoin, Params，Callback);

//Chain Coin Transfer
BitKeepInvoke.pay("eth", {
    "coin": "eth",
    "to": "0x.....",
    "amount": "0.1",
    "gas": "400000"
}, function(err, reply){

});

//Token Transfer
BitKeepInvoke.pay("eth", {
    "coin": "uni",
    "contract": "token contract",
    "to": "0x.....",
    "amount": "0.1",
    "gas": "400000"
}, function(err, reply){

});

//Call Contract
BitKeepInvoke.pay("eth", {
    "coin": "uni",
    "to": "token contract",
    "data": "abi data",
    "amount": "0.1",
    "gas": "400000"
}, function(err, reply){

});
```
