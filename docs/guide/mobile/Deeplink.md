# BKConnect（Deeplink）

## Introduction

BKConnect is a Deeplink-based solution that helps developers launch BitKeep app from a DApp and jump to a specified page (with parameters carried), so as to realize fast and stable interaction with BitKeep Wallet app.

**BKConnect APIs**

- [Access dapp](#access-dapp)
- [Get the specified address information](#authorize-get-the-specified-network-account-address)
- [Add the token](#add-the-token)
- [Send the transaction](#send-the-transaction)
- [Sign](#sign)

**Deeplink URL supported**

- `bitkeep://bkconnect?{params}`
- `https://bkcode.vip?{params} `

## Public parameter

### Common request parameters

- `version -string` protocol version 1.0
- `dappName -string` Dapp name
- `dappIcon -string ` Dapp icon
- `action-string-required` Action
- `actionID-string-required` The unique ID of the operation. It is recommended to set it to uuid
- `redirectUrl -string` Callback url, returned by post request or deeplink (no bitkeep key field must exist).

### Common return parameters

- `status-string` The status of request. 0 = success; 1 = fail
- `actionID-string` The unique ID of the operation.

## APIs

### Access dapp

> No return.

#### Request parameters

- `action-string-required` value is `dapp`
- `url-string-required` dapp address

#### Request sample code

##### iOS

```Java
//example  https://bkcode.vip?action=dapp&url=https://app.uniswap.org/#/swap
static NSString * kdappScheme = @"https://app.uniswap.org/#/swap";
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";

///jumping
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];

//// get the destination url
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

### Authorize / Get the specified network account address

#### Request parameters

- `action-string-required` value is `getAccount `
- `chain-string-required` The chain name, E.g: eth, btc, trx [ Click here for more info](#appendix-list-of-chain-values)

#### Return parameters

- `address-string` Address

#### Request sample code

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&action=getAccount
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///jumping
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// get the destination url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAccountParameterUrl]];

    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//Specify the chain, such as eth, btc, trx
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
//Specify the chain, such as eth, btc, trx
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

### Add the token

#### Request parameters

- `action-string-required` Value is `addAsset `
- `chain-string-required` The chain name, E.g: eth, btc, trx [ Click here for more info](#appendix-list-of-chain-values)
- `contract-string-required` The contract address; default = 0x
- `symbol-string-required` The contract‘s symbol

#### return parameters

- `status-string` The status of request. 0 = success; 1 = fail

#### Request sample code

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=addAsset
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///Jumping
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// get the destination url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAddAssetParameterUrl]];

    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//action     addAsset //required
//chain      String   //Specify the chain, such as eth, btc, trx
//contract   String   //Specify the Token contract address; default = 0x
//symbol     String   //Token name
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
//Specify the Token contract address; default = 0x
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

### Send the transaction

#### Request parameters

- `action-string-required` Value is `send `
- `chain-string-required` The chain name, E.g: eth, btc, trx [ Click here for more info](#appendix-list-of-chain-values)
- `contract-string-required` The contract address(mainnet'address is replaced by '0x0’)
- `to-string-required` payment address
- `amount-string-required` transfer amount
- `memo-string` transfer note

#### Return parameters

- `hash-string` The Hash of the transaction

#### Request sample code

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&contract=0x3hdh37xxxxxx&symbol=tokennamexxxxx&action=send
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///Jumping
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// get the destination url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getAddAssetParameterUrl]];
    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}

//action    send   ///required
//chain     String //Specify the chain, such as eth, btc, trx
//contract  String //Contract address, default = 0x
//to        String    // Payment address
//amount    String // Transfer amount, required
//memo      String // Transfer remarks, optional
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

### Sign

#### Request parameters

- `action-string-required` Value is `sign `
- `chain-string-required` The chain name, E.g: eth, btc, trx [ Click here for more info](#appendix-list-of-chain-values)
- `signType-string-required` Signature type, range of value: eth_sign, personal_sign, eth_signTypedData, eth_signTypedData_v3, eth_signTypedData_v4
- `msg-string-required` Signature information

#### Return parameters

- `sign-string` Signature information

#### Request sample code

##### iOS

```Java
/*
 example
//https://bkcode.vip?chain=eth&msg=[{"type":"string","name":"Message","value":"Hi, Alice!"},{"type":"uint32","name":"A number","value":"1337"}]&signType=personal_sign&action=sign

 ///https://bkcode.vip?chain=eth&msg=%5B%7B%22type%22:%22string%22,%22name%22:%22Message%22,%22value%22:%22Hi,%20Alice!%22%7D,%7B%22type%22:%22uint32%22,%22name%22:%22A%20number%22,%22value%22:%221337%22%7D%5D&signType=personal_sign&action=sign
*/
static NSString * kscheme = @"bitkeep://bkconnect?";
static NSString * khscheme = @"https://bkcode.vip?";
///Jumping
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:[self getUrl]] options:@{} completionHandler:nil];
/// get the destination url
/// Get the redirected url
- (NSString *)getUrl {
    NSMutableString *url = [NSMutableString string];
    [url appendString:khscheme];
    [url appendString:[self getSignParameterUrl]];
    NSString *urlScheme = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    return urlScheme;
}
//action   sign   //required
//chain    String //Specify the chain, such as eth, btc, trx
//signType String //Signature type eth_sign personal_sign eth_signTypedData eth_signTypedData_v3 eth_signTypedData_v4
//msg      String //Signature information
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
 //Signature type  personal_sign eth_signTypedData eth_sign eth_signTypedData_v3 eth_signTypedData_v4
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
//chain Specify the chain, such as eth, btc, trx
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

## Appendix - list of chain values

| Chain                  | Value    | chain                   | Value    |
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
