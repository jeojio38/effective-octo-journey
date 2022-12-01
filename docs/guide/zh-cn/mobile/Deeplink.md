# BKConnect（Deeplink）

## 介绍

BKConnect 是一种基于 Deeplink，帮助开发者从 Dapp 打开 BitKeep 移动端钱包并可跳转到指定位置（可携带参数），实现与 BitKeep 移动端钱包快速稳定交互技术方案。

**BKConnect 支持接口方法**

- [打开 dapp](#打开-dapp)
- [获取指定地址信息](#授权-获取-指定网络账号地址)
- [添加 Token](#添加-token)
- [发送交易](#发送交易)
- [签名](#签名)

**BitKeep 移动端支持 Deeplink URL**

- `bitkeep://bkconnect?{params}`
- `https://bkcode.vip?{params} `

## 公共参数

### 通用请求参数

- `version -string` 接口版本
- `dappName -string` Dapp 名称
- `dappIcon -string ` Dapp 图标
- `action-string-必填` 方法名称，根据不同的接口值不同
- `actionID-string-必填` 操作的唯一 ID，建议设置为 UUID
- `redirectUrl -string` 回调 URL，以 post 请求或者 deeplink 方式返回 （不能存在 bitkeep 关键字段）

### 通用返回参数

- `status-string` 接口请求状态，0 表示成功，1 表示失败
- `actionID-string` 操作的唯一 ID，值同请求接口 actionID 传参

## 接口

### 打开 Dapp

> 接口无回调

#### 请求参数

- `action-string-必填` 值为`dapp`
- `url-string-必填` dapp 地址

#### 请求示例代码

##### iOS

```Java
//example  https://bkcode.vip?action=dapp&url=https://app.uniswap.org/#/swap
static NSString * kdappScheme = @"https://app.uniswap.org/#/swap";
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";

///跳转页面
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];

/// 获取跳转的url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getDappParameterUrl]];
    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

- (NSString *)getDappParameterUrl {
    NSDictionary *parameDict = @{@"action" : @"dapp",
                                 @"url" : kdappScheme,
    };

    NSMutableString *paramString = [NSMutableString string];
    [parameDict.allKeys enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *paramStr = [NSString stringWithFormat:@"%@=%@",obj,parameDict[obj] ? : @""];
        [paramString appendString:paramStr];
        if ((idx + 1) != parameDict.allKeys.count) {
            [paramString appendString:@"&"];
        }
    }];
    return paramString;
}
```

##### Android

```Java
Uri uri = new Uri.Builder()
                   .scheme("bitkeep")
                   .authority("bkconnect")
                   .appendQueryParameter("action", "dapp")
                   .appendQueryParameter("url", url)
                   .appendQueryParameter("version", "1") ///
                   .build();

try {
    Intent intent1 = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent1);
}catch (Exception e){

    Log.e("startActivityFail",e.toString());
}
```

##### Flutter

```Dart
//example  https://bkcode.vip?action=dapp&url=https://app.uniswap.org/#/swap
    final kdappScheme = "https://app.uniswap.org/#/swap";
    final queryParameters = {
      'action': 'dapp',
      'url': kdappScheme,
    };

    Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
    if(await canLaunchUrl(scheme)){
    await launchUrl(scheme);
    } else {
    KLog.e('launch app fail');
    }
```

### 授权 / 获取 指定网络账号地址

#### 请求参数

- `action-string-必填` 值为`getAccount `
- `chain-string-必填` 链名称，参考[附录-chain 值列表](#附录-chain-值列表)

#### 返回参数

- `address-string` 账号地址

#### 请求示例代码

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&action=getAccount
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///跳转页面
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// 获取跳转的url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAccountParameterUrl]];

    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//chain 指定链,例如 eth,btc,trx
- (NSString *)getAccountParameterUrl {
    NSDictionary *parameDict = @{@"action" : @"getAccount",
                                 @"chain" : @"eth",
    };

    NSMutableString *paramString = [NSMutableString string];
    [parameDict.allKeys enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *paramStr = [NSString stringWithFormat:@"%@=%@",obj,parameDict[obj] ? : @""];
        [paramString appendString:paramStr];
        if ((idx + 1) != parameDict.allKeys.count) {
            [paramString appendString:@"&"];
        }
    }];
    return paramString;
}
```

##### Android

```Java
 Uri uri = new Uri.Builder()
                 .scheme("bitkeep")
                 .authority("bkconnect")
                .appendQueryParameter("action", "getAccount")
                .appendQueryParameter("dappIcon", icon)
                .appendQueryParameter("actionId", actionId)
                .appendQueryParameter("redirectUrl", redirectUrl)
                .appendQueryParameter("dappName", name)
                .appendQueryParameter("chain", chain)
                .appendQueryParameter("version", "1")
                .build();

try {
    Intent intent1 = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent1);
}catch (Exception e){

    Log.e("startActivityFail",e.toString());
}
```

##### Flutter

```Dart
/*
 example
//https://bkcode.vip?chain=eth&action=getAccount
*/
//chain 指定链,例如 eth,btc,trx
    final queryParameters = {
      'action': 'getAccount',
      'chain' : 'eth',
    };

    Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
    if(await canLaunchUrl(scheme)){
      await launchUrl(scheme);
    } else {
      KLog.e('launch app fail');
    }

  }
```

### 添加 token

#### 请求参数

- `action-string-必填` 值为`addAsset `
- `chain-string-必填` 链名称，参考[附录-chain 值列表](#附录-chain-值列表)
- `contract-string-必填` token 的合约地址，主链币为 0x
- `symbol-string-必填` token 的 symbol

#### 返回参数

- `status-string` 接口请求状态，0 表示成功，1 表示失败

#### 请求示例代码

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=addAsset
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///跳转页面
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// 获取跳转的url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAddAssetParameterUrl]];

    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//action     addAsset //必填
//chain      String   //指定链,例如 eth,btc,trx
//contract   String   //指定Token合约地址,默认为0x
//symbol     String   //Token 名称
- (NSString *)getAddAssetParameterUrl {
    NSDictionary *parameDict = @{@"action" : @"addAsset",
                                 @"chain" : @"eth",
                                 @"contract" : @"0x3hdh37xxxxxx",
                                 @"symbol" : @"tokennamexxxxx",
    };

    NSMutableString *paramString = [NSMutableString string];
    [parameDict.allKeys enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *paramStr = [NSString stringWithFormat:@"%@=%@",obj,parameDict[obj] ? : @""];
        [paramString appendString:paramStr];
        if ((idx + 1) != parameDict.allKeys.count) {
            [paramString appendString:@"&"];
        }
    }];
    return paramString;
}

```

##### Android

```Java
 Uri uri = new Uri.Builder()
            .scheme("bitkeep")
            .authority("bkconnect")
            .appendQueryParameter("action", "addAsset")
            .appendQueryParameter("contract", contract)
            .appendQueryParameter("chain", chain)
            .appendQueryParameter("redirectUrl", redirectUrl)
            .appendQueryParameter("dappName", name)
            .appendQueryParameter("dappIcon", icon)
            .appendQueryParameter("symbol", symbol)
            .appendQueryParameter("actionId", actionId)
            .appendQueryParameter("version", "1")
            .build();

try {
    Intent intent1 = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent1);
}catch (Exception e){

    Log.e("startActivityFail",e.toString());
}
```

##### Flutter

```Dart
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=addAsset
*/
//chain 指定链,例如 eth,btc,trx
    final queryParameters = {
      'action': 'addAsset',
      'chain' : 'eth',
      'contract': '0x3hdh37xxxxxx',
      'symbol' : 'tokennamexxxxx',
    };

    Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
    if(await canLaunchUrl(scheme)){
      await launchUrl(scheme);
    } else {
      KLog.e('launch app fail');
    }
```

### 发送交易

#### 请求参数

- `action-string-必填` 值为`send `
- `chain-string-必填` 链名称，参考[附录-chain 值列表](#附录-chain-值列表)
- `contract-string-必填` 合约地址，主链币为 0x
- `to-string-必填` 收款账号地址
- `amount-string-必填` 转账数量
- `memo-string` 转账备注

#### 返回参数

- `hash-string` 转账 hash

#### 请求示例代码

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=send
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///跳转页面
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// 获取跳转的url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAddAssetParameterUrl]];
    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//action    send   //必填
//chain     String //指定链,例如 eth,btc,trx
//contract  String //合约地址,默认0x
//to        String    // 收款地址
//amount    String // 转账数量,必填
//memo      String // 转账备注,非必填
- (NSString *)getSendParameterUrl {
    NSDictionary *parameDict = @{@"action" : @"send",
                                 @"chain" : @"eth",
                                 @"contract" : @"0x3hdh37xxxxxx",
                                 @"to" : @"0x3hxxxxdh37xxxxxx",
                                 @"amount" : @"0.1",
                                 @"memo" : @"memoMesg",
    };

    NSMutableString *paramString = [NSMutableString string];
    [parameDict.allKeys enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *paramStr = [NSString stringWithFormat:@"%@=%@",obj,parameDict[obj] ? : @""];
        [paramString appendString:paramStr];
        if ((idx + 1) != parameDict.allKeys.count) {
            [paramString appendString:@"&"];
        }
    }];
    return paramString;
}

```

##### Android

```Java
Uri uri = new Uri.Builder()
            .scheme("bitkeep")
            .authority("bkconnect")
            .appendQueryParameter("action", "send")
            .appendQueryParameter("from", from)
            .appendQueryParameter("to", to)
            .appendQueryParameter("contract", contract)
            .appendQueryParameter("amount", amount)
            .appendQueryParameter("redirectUrl", redirectUrl)
            .appendQueryParameter("dappName", name)
            .appendQueryParameter("dappIcon", icon)
            .appendQueryParameter("chain", chain)
            .appendQueryParameter("memo", "xxxxxmemo")
            .appendQueryParameter("actionId", actionId)
            .appendQueryParameter("version", "1")
            .build();

try {
    Intent intent1 = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent1);
}catch (Exception e){

    Log.e("startActivityFail",e.toString());
}
```

##### Flutter

```Dart
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=addAsset
*/
    final queryParameters = {
      'action': 'send',
      'chain' : 'eth',
      'contract': '0x3hdh37xxxxxx',
      'to' : '0x3hxxxxdh37xxxxxx',
      'amount' : '0.1',
      'memo' : 'memoMesg',
    };

    Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
    if(await canLaunchUrl(scheme)){
      await launchUrl(scheme);
    } else {
      // KLog.e('launch app fail');
    }
```

### 签名

#### 请求参数

- `action-string-必填` 值为`sign `
- `chain-string-必填` 链名称，参考[附录-chain 值列表](#附录-chain-值列表)
- `signType-string-必填` 签名类型，支持值有 eth_sign, personal_sign, eth_signTypedData, eth_signTypedData_v3, eth_signTypedData_v4
- `msg-string-必填` 签名信息

#### 返回参数

- `sign-string` 签名信息

#### 请求示例代码

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&msg=[{"type":"string","name":"Message","value":"Hi, Alice!"},{"type":"uint32","name":"A number","value":"1337"}]&signType=personal_sign&action=sign

 ///https://bkcode.vip?chain=eth&msg=%5B%7B%22type%22:%22string%22,%22name%22:%22Message%22,%22value%22:%22Hi,%20Alice!%22%7D,%7B%22type%22:%22uint32%22,%22name%22:%22A%20number%22,%22value%22:%221337%22%7D%5D&signType=personal_sign&action=sign
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///跳转页面
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// 获取跳转的url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getSignParameterUrl]];
    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}
//action   sign   //必填
//chain    String //指定链,例如 eth,btc,trx
//signType String //签名类型 eth_sign personal_sign eth_signTypedData eth_signTypedData_v3 eth_signTypedData_v4
//msg      String //签名信息
- (NSString *)getSignParameterUrl {
    NSDictionary *parameDict = @{@"action" : @"sign",
                                 @"chain" : @"eth",
                                 @"signType" : @"personal_sign",
                                 @"msg" : @"[{\"type\":\"string\",\"name\":\"Message\",\"value\":\"Hi, Alice!\"},{\"type\":\"uint32\",\"name\":\"A number\",\"value\":\"13337\"}]",
    };

    NSMutableString *paramString = [NSMutableString string];
    [parameDict.allKeys enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSString *paramStr = [NSString stringWithFormat:@"%@=%@",obj,parameDict[obj] ? : @""];
        [paramString appendString:paramStr];
        if ((idx + 1) != parameDict.allKeys.count) {
            [paramString appendString:@"&"];
        }
    }];
    return paramString;
}
```

##### Android

```Java
 //签名类型  personal_sign eth_signTypedData eth_sign eth_signTypedData_v3 eth_signTypedData_v4
 String signType = 'personal_sign';
 Uri uri = new Uri.Builder()
            .scheme("bitkeep")
            .authority("bkconnect")
            .appendQueryParameter("action", "sign")
            .appendQueryParameter("redirectUrl", redirectUrl)
            .appendQueryParameter("dappName", name)
            .appendQueryParameter("dappIcon", icon)
            .appendQueryParameter("actionId", actionId)
            .appendQueryParameter("msg", signMsg)
            .appendQueryParameter("chain", chain) /// 没有可不传
            .appendQueryParameter("signType", signType)
            .appendQueryParameter("version", "1")
            .build();

try {
    Intent intent1 = new Intent(
            Intent.ACTION_VIEW,
            uri
    );
    startActivity(intent1);
}catch (Exception e){

    Log.e("startActivityFail",e.toString());
}
```

##### Flutter

```Dart
/*
 example
//https://bkcode.vip?chain=eth&msg=[{"type":"string","name":"Message","value":"Hi, Alice!"},{"type":"uint32","name":"A number","value":"1337"}]&signType=personal_sign&action=sign

 ///https://bkcode.vip?chain=eth&msg=%5B%7B%22type%22:%22string%22,%22name%22:%22Message%22,%22value%22:%22Hi,%20Alice!%22%7D,%7B%22type%22:%22uint32%22,%22name%22:%22A%20number%22,%22value%22:%221337%22%7D%5D&signType=personal_sign&action=sign
*/
//chain 指定链,例如 eth,btc,trx
    final queryParameters = {
      'action': 'sign',
      'chain' : 'eth',
      'signType': 'personal_sign',
      'msg' : '"[{\"type\":\"string\",\"name\":\"Message\",\"value\":\"Hi, Alice!\"},{\"type\":\"uint32\",\"name\":\"A number\",\"value\":\"1337\"}]',
    };

    Uri scheme = Uri(scheme: 'bitkeep', queryParameters: queryParameters);
    if(await canLaunchUrl(scheme)){
      await launchUrl(scheme);
    } else {
      KLog.e('launch app fail');
    }
```

## 附录-chain 值列表

| 链                     | chain 值 | 链                      | chain 值 |
| ---------------------- | -------- | ----------------------- | -------- |
| Bitcoin                | btc      | ClassZZ                 | czz      |
| Ethereum               | eth      | HBTC Mainnet            | hbc      |
| BNB Chain              | bnb      | KLAY                    | klay     |
| Heco                   | ht       | Yotta Mainnet           | yta      |
| TRON                   | trx      | ASM Mainnet             | asm      |
| Polkadot               | dot      | TrueChain Mainnet       | true     |
| DOGE                   | doge     | SCDO Mainnet            | scdo     |
| OKC Chain              | okt      | KoHO Chain Mainnet      | khc, kht |
| Polygon                | matic    | ZTB Mainnet             | ztb      |
| Filecoin               | fil      | Bitcoin Classic Mainnet | bgh      |
| Avalanche-C            | avax_c   | Solana                  | sol      |
| Avalanche-X            | avax_x   | Fantom                  | ftm      |
| EOS                    | eos      | WAX                     | wax      |
| IOST                   | iost     | ZkSync                  | zks      |
| Terra                  | luna     | Qtum Mainnet            | qtum     |
| Casper Mainnet         | cspr     | SubGame Mainnet         | sgb      |
| Arbitrum               | arbitrum | NEAR Protocol Mainnet   | near     |
| FIO Mainnet            | fio      | Optimism                | optimism |
| Nervos Network Mainnet | ckb      | Elrond Mainnet          | egld     |
| Cronos Chain           | cro      | Arweave                 | ar       |
| Dash Mainnet           | dash     | Velas Mainnet           | vlx      |
| Nervos EVM Mainnet     | ckbl2    | Fuse Network            | fuse     |
| Harmony                | one      | KCC Chain               | kcs      |
| Findora                | fra      | Boba Network            | boba     |
| GateChain              | gt       | Caduceus                | cmp      |
