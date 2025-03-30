const RESUME_VALIDATION_GAS = 50000;

async function resumeValidation() {
    var password = document.getElementById("pwdValidator").value;

    if (password == null || password.length < 2) {
        showWarnAlert(langJson.errors.enterQuantumPassword);
        return false;
    }

    let msg = langJson.langValues.validatorResumeValidationConfirm;
    showConfirmAndExecuteOnConfirm(msg, onResumeValidation);
}

async function onResumeValidation() {
    showLoadingAndExecuteAsync(langJson.langValues.waitWalletOpen, decryptAndUnlockWalletResumeValidation);
}

async function decryptAndUnlockWalletResumeValidation() {
    var password = document.getElementById("pwdValidator").value;
    try {
        let quantumWallet = await walletGetByAddress(password, currentWalletAddress);
        if (quantumWallet == null) {
            hideWaitingBox();
            showWarnAlert(getGenericError());
            return;
        }
        resumeValidationSubmit(quantumWallet);
    }
    catch (error) {
        hideWaitingBox();
        showWarnAlert(langJson.errors.walletOpenError.replace(STORAGE_PATH_TEMPLATE, STORAGE_PATH) + " " + error)
        return;
    }
    return false;
}

async function resumeValidationSubmit(quantumWallet) {
    updateWaitingBox(langJson.langValues.pleaseWaitSubmit);

    try {
        //get account balance
        currentAccountDetails = null;
        let accountDetails = await getAccountDetails(currentBlockchainNetwork.scanApiDomain, currentWalletAddress);
        currentAccountDetails = accountDetails;

        const gas = RESUME_VALIDATION_GAS;
        const chainId = currentBlockchainNetwork.networkId;
        const nonce = accountDetails.nonce;
        const contractData = getResumeValidationContractData();
        const value = "0.0";

        var txSigningHash = transactionGetSigningHash(quantumWallet.address, nonce, STAKING_CONTRACT_ADDRESS, value, gas, chainId, contractData)
        if (txSigningHash == null) {
            hideWaitingBox();
            showWarnAlert(langJson.errors.unexpectedError);
            return;
        }

        var quantumSig = walletSign(quantumWallet, txSigningHash);

        var verifyResult = cryptoVerify(txSigningHash, quantumSig, base64ToBytes(quantumWallet.getPublicKey()));
        if (verifyResult == false) {
            return;
        }

        var txHashHex = transactionGetTransactionHash(quantumWallet.address, nonce, STAKING_CONTRACT_ADDRESS, value, gas, chainId, contractData,
            base64ToBytes(quantumWallet.getPublicKey()), quantumSig);
        if (txHashHex == null) {
            hideWaitingBox();
            showWarnAlert(langJson.errors.unexpectedError);
            return;
        }

        //account txn data
        let currentDate = new Date();
        var txData = transactionGetData(quantumWallet.address, nonce, STAKING_CONTRACT_ADDRESS, value, gas, chainId, contractData, base64ToBytes(quantumWallet.getPublicKey()), quantumSig);
        if (txData == null) {
            hideWaitingBox();
            showWarnAlert(langJson.errors.unexpectedError);
            return;
        }

        let result = await postTransaction(currentBlockchainNetwork.txnApiDomain, txData);
        if (result == true) {
            let pendingTxn = new TransactionDetails(txHashHex, currentDate, quantumWallet.address, STAKING_CONTRACT_ADDRESS, value, true);
            pendingTransactionsMap.set(quantumWallet.address.toLowerCase() + currentBlockchainNetwork.index.toString(), pendingTxn);

            setTimeout(() => {
                hideWaitingBox();
                showAlertAndExecuteOnClose(langJson.langValues.sendRequest.replace(TRANSACTION_HASH_TEMPLATE, txHashHex), showWalletScreen);
            }, 1000);
        } else {
            hideWaitingBox();
            showWarnAlert(langJson.errors.invalidApiResponse);
        }
    }
    catch (error) {
        hideWaitingBox();

        if (isNetworkError(error)) {
            showWarnAlert(langJson.errors.internetDisconnected);
        } else {
            showWarnAlert(langJson.errors.invalidApiResponse + ' ' + error);
        }
    }
}
