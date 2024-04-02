[![Build/release](https://github.com/DogeProtocol/desktop-wallet/actions/workflows/electron-forge-publish.yml/badge.svg)](https://github.com/DogeProtocol/desktop-wallet/actions/workflows/electron-forge-publish.yml)

# Doge Protocol Desktop Wallet
Doge Protocol Desktop Wallets for Windows, Mac and Linux (Ubuntu) are built using Electron. 

## Building

1) Install npm. For details see https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2) Install Electron. For details see https://www.electronjs.org/docs/latest/tutorial/installation
3) Install Dependencies:

		npm install

3) To run the app:

		npm start

4) To create the build package:

		npm run publish

### Hybrid PQC
The Web Assembly files found under the wasm folder can be generated following the instructions at https://github.com/DogeProtocol/hybrid-pqc

### Seed Library
The Seed Javascript Library can be obtained from https://github.com/DogeProtocol/seed-words/releases

### GO DP WASM Library
The libgodp WASM library can be obtained from https://github.com/DogeProtocol/go-dp/releases

### Snapshot CSV
The CSV file containing the list of Ethereum addresses for Mainnet Snapshot is obtained from https://github.com/DogeProtocol/mainnet-erc20-token-address-snapshot/blob/main/dp-snapshot.csv

### Warning
Linux (Ubuntu) wallet is not tested!

### Dependencies
The following dependent files are used:

1) https://github.com/DogeProtocol/go-dp/releases/download/v2.0.25/webassembly-wasm.tar.gz
2) https://github.com/DogeProtocol/hybrid-pqc/releases/download/v0.1.24/hybrid-pqc-wasm.tar.gz
3) https://github.com/DogeProtocol/seed-words/archive/refs/tags/v0.0.1.tar.gz
4) https://github.com/DogeProtocol/mainnet-erc20-token-address-snapshot/archive/refs/tags/v0.0.1.tar.gz

## License
The source code is released under MIT license.

This project uses Ionic icons that are released under MIT License https://github.com/ionic-team/ionicons?tab=MIT-1-ov-file#readme

This project uses jquery-qrcode that is released under MIT License https://github.com/jeromeetienne/jquery-qrcode

wasm_exec.js is released under BSD-style License https://github.com/golang/go/blob/master/LICENSE
