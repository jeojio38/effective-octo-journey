# WalletConnect

## EVM(WebApp)

WalletConnect 是一个连接钱包和 DApps（Web3 应用程序）的开放协议，它使用一个桥梁服务器在两个应用程序和/或设备之间建立远程连接，扫描 QR 码建立连接并开始通信。BitKeep 钱包应用程序现在支持 WalletConnect。

更详细的文件，请参考[https://docs.walletconnect.com](https://docs.walletconnect.com)

- [react-app.walletconnect.com/)](https://react-app.walletconnect.com/)
- [Web3 Provider](https://docs.walletconnect.com/quick-start/dapps/web3-provider)
- [Standalone Client](https://docs.walletconnect.com/quick-start/dapps/client)
- [example](https://github.com/WalletConnect/web-examples)

我们提供一个[简单演示](https://github.com/bitkeepwallet/download/tree/example/example/walletConnect)

```bash
npm install --save @walletconnect/client @walletconnect/qrcode-modal
```

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

## EVM(原生 App SDK)

::: tip  
 前置条件：开发者应用已集成 [Wallet Connect](https://docs.walletconnect.com/)。
:::

**说明**

- 此方案仅支持 EVM 链
- 如需判断 BitKeep 包名，可联系商务提供包名列表

### 连接钱包

通过 scheme 唤起 BitKeep 钱包， 将 Wallet Connect 数据传输过来。**scheme 值请填写`bitkeep`**。

#### 传递参数说明

| 参数        | 参数值说明                       | 备注              |
| ----------- | -------------------------------- | ----------------- |
| uriString   | 通过 wc 生成器生成相应的 wc 连接 | 接口获取 有时效性 |
| action      | 值为 `connect`                   |                   |
| connectType | 值为`wc`                         |                   |

> 项目方可以在 catch 中根据相应异常进行业务处理。

#### 请求代码示例

#### Android 请求示例

```Java
final String uriString = "wc:e3504282-91c5-4d8b-ae93-6a767532aa20@1?bridge=https%3A%2F%2Fw.bridge.walletconnect.org&key=437444a526c310620482604dd904db09d1f3ef840a7278c5c593a298b3604b22";
final String action = "connect";
final String connectType = "wc";
final Uri uri = new Uri.Builder()
        .scheme("bitkeep")
        .appendQueryParameter("action", action)
        .appendQueryParameter("connectType", connectType)
        .appendQueryParameter("value", uriString)
        .build();
try {
    Intent intent = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent);
}catch (Exception e){
    Log.e("startActivityFail",e.toString());
}
```

#### FLutter 请求示例

```Dart
final  uriString = "wc:xxx?bridge=xxx&key=xxx";
final  action = "connect";
final  connectType = "wc";

 final queryParameters = {
   'action': action,
   'connectType': connectType,
   'value': uriString,
 };
 Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
 if(await canLaunchUrl(scheme)){
   await wlaunchUrl(scheme);
 } else {
   KLog.e('launch app fail');
 }
```

#### iOS 请求示例

```Java
- (NSURL *)getDeepLinkUrl:(NSDictionary *)params {
  NSString *_paramsString = [self encodeParams:params];
  NSString *_deepLinkString = [NSString stringWithFormat:@"bitkeep:?%@",_paramsString];
  return [NSURL URLWithString:_deepLinkString];
}
- (NSString *)encodeParams:(NSDictionary *)params {
  NSMutableString *tmpString = @"".copy;

  for (int i = 0; i < params.allKeys.count; i++) {
    NSString *_tmpValue = [NSString stringWithFormat:@"%@=%@", params.allKeys[i], [params objectForKey:params.allKeys[i]]];
    [tmpString appendString:[NSString stringWithFormat:@"&%@", _tmpValue]];
  }
  return tmpString;
}
```

#### Js 请求示例

```JS
final String uriString = "wc:e3504282-91c5-4d8b-ae93-6a767532aa20@1?bridge=https%3A%2F%2Fw.bridge.walletconnect.org&key=437444a526c310620482604dd904db09d1f3ef840a7278c5c593a298b3604b22";
final String action = "connect";
final String connectType = "wc";

var linkUrl = 'bitkeep://?action=${action}&connectType=${connectType}&vale=${uriString}'
 <a href= linkUrl/>
```

### 签名

通过 scheme 唤起 BitKeep 钱包， 将 Wallet Connect 数据传输过来。**scheme 值请填写`bitkeep`**。

#### 传递参数说明

| 参数        | 参数值说明  |
| ----------- | ----------- | --- |
| action      | 值为 `sign` |     |
| connectType | 值为`wc`    |     |

#### 请求代码示例

#### Android 请求示例

```Java
final String action = "sign";
final String connectType = "wc";
final Uri uri = new Uri.Builder()
        .scheme("bitkeep")
        .appendQueryParameter("action", action)
        .appendQueryParameter("connectType", connectType)
        .build();
try {
    Intent intent = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent);
}catch (Exception e){
    Log.e("startActivityFail",e.toString());
}
```

#### FLutter 请求示例

```Dart
final  action = "sign";
final  connectType = "wc";

 final queryParameters = {
   'action': action,
   'connectType': connectType,
 };
 Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
 if(await canLaunchUrl(scheme)){
   await wlaunchUrl(scheme);
 } else {
   KLog.e('launch app fail');
 }
```

#### iOS 请求示例

```Java
- (NSURL *)getDeepLinkUrl:(NSDictionary *)params {
  NSString *_paramsString = [self encodeParams:params];
  NSString *_deepLinkString = [NSString stringWithFormat:@"bitkeep:?%@",_paramsString];
  return [NSURL URLWithString:_deepLinkString];
}
- (NSString *)encodeParams:(NSDictionary *)params {
  NSMutableString *tmpString = @"".copy;

  for (int i = 0; i < params.allKeys.count; i++) {
    NSString *_tmpValue = [NSString stringWithFormat:@"%@=%@", params.allKeys[i], [params objectForKey:params.allKeys[i]]];
    [tmpString appendString:[NSString stringWithFormat:@"&%@", _tmpValue]];
  }
  return tmpString;
}
```

#### Js 请求示例

```JS
final String action = "sign";
final String connectType = "wc";

var linkUrl = 'bitkeep://?action=${action}&connectType=${connectType}'
 <a href= linkUrl/>
```

### 转账

通过 scheme 唤起 BitKeep 钱包， 将 Wallet Connect 数据传输过来。**scheme 值请填写`bitkeep`**。

#### 传递参数说明

| 参数        | 参数值说明  |
| ----------- | ----------- | --- |
| action      | 值为 `send` |     |
| connectType | 值为`wc`    |     |

#### 请求代码示例

#### Android 请求示例

```Java
final String action = "send";
final String connectType = "wc";
final Uri uri = new Uri.Builder()
        .scheme("bitkeep")
        .appendQueryParameter("action", action)
        .appendQueryParameter("connectType", connectType)
        .build();
try {
    Intent intent = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent);
}catch (Exception e){
    Log.e("startActivityFail",e.toString());
}
```

#### FLutter 请求示例

```Dart
final  action = "send";
final  connectType = "wc";

 final queryParameters = {
   'action': action,
   'connectType': connectType,
 };
 Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
 if(await canLaunchUrl(scheme)){
   await wlaunchUrl(scheme);
 } else {
   KLog.e('launch app fail');
 }
```

#### iOS 请求示例

```Java
- (NSURL *)getDeepLinkUrl:(NSDictionary *)params {
  NSString *_paramsString = [self encodeParams:params];
  NSString *_deepLinkString = [NSString stringWithFormat:@"bitkeep:?%@",_paramsString];
  return [NSURL URLWithString:_deepLinkString];
}
- (NSString *)encodeParams:(NSDictionary *)params {
  NSMutableString *tmpString = @"".copy;

  for (int i = 0; i < params.allKeys.count; i++) {
    NSString *_tmpValue = [NSString stringWithFormat:@"%@=%@", params.allKeys[i], [params objectForKey:params.allKeys[i]]];
    [tmpString appendString:[NSString stringWithFormat:@"&%@", _tmpValue]];
  }
  return tmpString;
}
```

#### Js 请求示例

```JS
final String action = "send";
final String connectType = "wc";

var linkUrl = 'bitkeep://?action=${action}&connectType=${connectType}'
 <a href= linkUrl/>
```
