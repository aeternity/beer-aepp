# Beer Æpp

## Overview

This is a simple Web Application that will be used during events to showcase aeternity's main features using VueJS and [Aeternity's JS SDK](https://github.com/aeternity/aepp-sdk-js).

It allows conference participants to order beers using tokens.

There will be a dedicated Aeternity-Blockchain running only for this project. Accounts for the participants will be generated on this chain beforehand. For every account a domain name will be registered and an initial token amount will be transfered.

*This repository is a work in progress* and it has the precise scope of only being used during events, to gamify the process of ordering a beer offered by Aeternity.

## Usage

### Preliminaries

Make sure you have at least 2 keypairs for the minimum 2 wallets to test:
1. Conference "Person Wallet"
2. Conference "Bar Wallet"


### How it works

The "Person Wallet" (the app itself) is accessed via a URL shortner service (https://aet.li/shortName) or through the scan of a QR code.

This action will send the user to the app via a URL
https://beer.aepps.com/?p=PUB_KEY&k=PRIV_KEY&n=DOMAIN_NAME

The acocunt data will then be stored on the users device in localStorage.

Once the app is open, the user can:

1. Check her token balance
2. Order a beer
3. Send & Receive tokens to/from other users

Beer orders are token transactions from the user to the bar with multiples of the price for one beer which currently is 1000 tokens. To collect the beer at the Bar the user presents a QR-Code. The Code contains the transaction hash and also the transaction hash signed with her private key.

The [Bar App (pos app)](https://github.com/aeternity/pos-aepp) then scans the code and forwards the Info to the [middleware (pos middleware)](https://github.com/aeternity/pos-middleware). The middleware keeps record of all beer transactions. On scan it validates the scanned transaction by checking the signature and returning to the bar how many beers to give out. It also keeps a record on which transactions were already scanned to prevent double spending.

The Beer Aepp also keeps a websocket conenction with the middleware. Over this connection the state of bar (open, closed, out of beer) is transmitted. Also the aepp can check whether a beer transaction has already been scanned.

To send tokens from one account to another the sending device can either enter the domain name of the receiver or scan a qr-code containing the public key of the receiver.

## Installation

```
git clone https://github.com/aeternity/beer-aepp
cd beer-aepp
yarn install
```


## Start the application

```
yarn start:dev
```

The current form should be self explainatory.

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn start:dev

# build for production with minification
yarn build
```

## License

ISC License (ISC)
Copyright © 2018 aeternity developers

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
