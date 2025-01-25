const HTTPS = "https://";

class AccountDetails {
    constructor(address, nonce, balance) {
        if (address.startsWith("0x") == false) {
            address = "0x" + address
        }
        this.address = address;
        this.nonce = nonce;
        this.balance = balance;
    }
}

class TransactionDetails {
    constructor(hash, createdAt, from, to, value, status) {
        this.hash = hash;
        this.createdAt = createdAt;
        this.from = from;
        this.to = to;
        this.value = value;
        this.status = status;
    }
}

async function getAccountDetails(scanApiDomain, address) {    
    var url = HTTPS + scanApiDomain + "/account/" + address;
    let nonce = 0;
    let balance = "0";

    const response = await fetch(url);
    const jsonObj = await response.json();
    const result = jsonObj.result;

    if (result !== null) {
        if (result.nonce != null) {
            let tempNonce = parseInt(result.nonce);
            if (Number.isInteger(tempNonce) == true) {
                nonce = tempNonce;
            } else {
                throw new Error(langJson.errors.invalidApiResponse);
            }
        }

        if (result.balance != null) {
            if (isLargeNumber(result.balance) == false) {
                throw new Error(langJson.errors.invalidApiResponse);
            } else {
                balance = result.balance;
            }
        }
    }

    let accountDetails = new AccountDetails(address, nonce, balance);
    return accountDetails;
}

async function getCompletedTransactionDetails(scanApiDomain, address, pageIndex) {
    let result = await getTransactionDetails(scanApiDomain, address, pageIndex, false);
    return result;
}

async function getPendingTransactionDetails(scanApiDomain, address, pageIndex) {
    let result = await getTransactionDetails(scanApiDomain, address, pageIndex, true);
    return result;
}

async function getTransactionDetails(scanApiDomain, address, pageIndex, isPending) {
    var url;
    
    if (isPending) {
        url = HTTPS + scanApiDomain + "/account/" + address + "/transactions/" + pageIndex;
    } else {
        url = HTTPS + scanApiDomain + "/account/" + address + "/transactions/" + pageIndex;
    }
    
    const response = await fetch(url);

    const jsonObj = await response.json();
    const result = jsonObj;
    const pageCountString = result.pageCount;

    if (result == null || pageCountString == null) {
        throw new Error("invalid result");
    }

    let pageCount = parseInt(pageCountString);
    if (isNumber(pageCount) == false || pageCount < 0) {
        throw new Error("invalid pageCount");
    }

    if (result.items == null || result.items.length == 0 || pageCount == 0) {
        return null;
    }

    if (pageIndex > pageCount) {
        return  {
            transactionList: null,
            pageCount: pageCount
        };
    }

    var transactionList = [];

    if (Array.isArray(result.items) === false) {
        return null;
    }

    for (var i = 0; i < result.items.length; i++) {
        let txn = result.items[i];

        if (txn.hash == null || txn.hash.length < 64 || IsValidAddress(txn.hash) == false) {
            throw new Error("invalid hash");
        }

        if (txn.from == null || txn.from.length < 64 || IsValidAddress(txn.from) == false) {
            throw new Error("invalid fromAddress");
        }

        if (txn.to !== null &&  (txn.to.length < 64 || IsValidAddress(txn.to) == false)) {
            throw new Error("invalid toAddress");
        }

        if (txn.createdAt == null || isValidDate(txn.createdAt) == false) {
            throw new Error("invalid date");
        }

        let txnDateString = (txn.createdAt.includes("UTC") || txn.createdAt.endsWith("Z")) ? txn.createdAt : txn.createdAt + 'Z';
        let txnDate = new Date(txnDateString);

        if (txn.value == null || isHex(txn.value) == false) {
            throw new Error("invalid value");
        }
        let status = false;
        if (txn.status !== null && txn.status == "0x1") {
            status = true;
        }

        let txnValue = await hexWeiToEthFormatted(txn.value);
        let transactionDetails = new TransactionDetails(txn.hash, txnDate, txn.from, txn.to, txnValue, status);
        transactionList.push(transactionDetails);
    }

    const transactionListDetails = {
        transactionList: transactionList,
        pageCount: pageCount
    }
    
    return transactionListDetails;
}

async function postTransaction(txnApiDomain, txnData) {
    var url = HTTPS + txnApiDomain + "/transactions";
    if (txnData == null) {
        throw new Error("invalid txnData");
    }

    let txnDataJson = JSON.stringify({ txnData: txnData });

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: txnDataJson
    });

    if (response == null) {
        throw new Error("server returned invalid response");
    }

    if (response.status == 200 || response.status == 204) {
        return true;
    }

    return false;
}

