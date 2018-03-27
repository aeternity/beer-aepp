# Beer Æpp

## Overview

This is a simple Web Application that will be used during [re:publica 2018](https://re-publica.com/en) using VueJS and [Aeternity's JS SDK](https://github.com/aeternity/aepp-sdk-js).

It allows conference participants to order beers using Æ tokens.

*This repository is a work in progress* and it has the precise scope of only being used during re:publica 2018 to gamify the process of ordering a beer offered by Aeternity.

## Usage

### Preliminaries

Make sure you have at least 2 keypairs for the minimum 2 wallets to test:
1. Conference "Person Wallet"
2. Conference "Bar Wallet"


### How it works

The "Person Wallet" (the app itself) is accessed via a URL shortner service (https://aet.li/shortName) or through the scan of a QR code.

This action will send the user to the app via a URL
http://URL/#/?p=PUB_KEY&k=PRIV_KEY&n=fake%20name%20here


Once the app is open, the user can:

1. Check its balance
2. Order a beer
3. Send & Receive tokens to/from other users


## Installation

```
git clone https://github.com/aeternity/beer-aepp
cd beer-aepp
yarn install
```


## Start the application

```
yarn run start:dev
```

The current form should be self explainatory.

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run start:dev

# build for production with minification
yarn run build

# TODO: runs tests
yarn run test

```
