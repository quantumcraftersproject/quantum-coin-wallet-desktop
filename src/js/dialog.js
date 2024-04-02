var modalOkDialog = document.getElementById("modalOkDialog");
var divSuccess = document.getElementById("divSuccess");
var divWarn = document.getElementById("divWarn");
var pDetails = document.getElementById("pDetails");
var span = document.getElementsByClassName("close")[0];
var onCloseFunc = null;

var modalConfirm = document.getElementById("modalConfirmDialog");
var pDetailsConfirm = document.getElementById("pDetailsConfirm");
var txtConfirm = document.getElementById("txtConfirm");
var spanConfirm = document.getElementsByClassName("proceed")[0];
var spanCancel = document.getElementsByClassName("cancel")[0];

var onConfirmFunc = null;

var modalNetwork = document.getElementById("modalNetworkDialog");

var spanNetwork = document.getElementsByClassName("oknetwork")[0];
var spanCancelNetwork = document.getElementById("divCancelNetwork");

var onCloseFuncNetwork = null;

function showAlert(txt) {
    modalOkDialog.style.display = "block";
    modalOkDialog.showModal();
    divSuccess.style.display = "block";
    divWarn.style.display = "none";
    pDetails.innerText = htmlEncode(txt);
}

function showWarnAlert(txt) {
    modalOkDialog.style.display = "block";
    modalOkDialog.showModal();
    divSuccess.style.display = "none";
    divWarn.style.display = "block";
    if (txt == null) {
        pDetails.innerText = "";
    } else {
        pDetails.innerText = htmlEncode(txt.toString());
    }
}

function showAlertAndExecuteOnClose(txt, f) {
    modalOkDialog.style.display = "block";
    modalOkDialog.showModal();
    divSuccess.style.display = "block";
    divWarn.style.display = "none";
    pDetails.innerText = htmlEncode(txt);
    onCloseFunc = f;
}

function showWarnAlertAndExecuteOnClose(txt, f) {
    modalOkDialog.style.display = "block";
    modalOkDialog.showModal();
    divSuccess.style.display = "none";
    divWarn.style.display = "block";
    pDetails.innerText = htmlEncode(txt);
    onCloseFunc = f;
}

async function showNetworkDialog(f) {
    await showBlockchainNetworks();
    modalNetwork.style.display = "block";
    modalNetwork.showModal();
    onCloseFuncNetwork = f;
    return false;
}

span.onclick = function () {
    modalOkDialog.style.display = "none";
    modalOkDialog.close();
    if (onCloseFunc == null) {

    } else {
        onCloseFunc();
        onCloseFunc = null;
    }
}


spanConfirm.onclick = function () {
    if (!txtConfirm.value || txtConfirm.value != "i agree") {
        txtConfirm.value = "";
        return;
    }
    modalConfirm.style.display = "none";
    modalConfirm.close();
    document.getElementById("txtConfirm").value = "";
    if (onConfirmFunc == null) {

    } else {
        onConfirmFunc();
        onConfirmFunc = null;
    }
}

spanCancel.onclick = function () {
    modalConfirm.style.display = "none";
    modalConfirm.close();
    onConfirmFunc = null;
}

function showConfirmAndExecuteOnConfirm(txt, f) {
    document.getElementById("txtConfirm").value = "";
    modalConfirm.style.display = "block";
    modalConfirm.showModal();
    pDetailsConfirm.innerText = txt;
    onConfirmFunc = f;
    document.getElementById("txtConfirm").focus();
}

spanNetwork.onclick = function () {
    modalNetwork.style.display = "none";
    modalNetwork.close();
    var network = document.querySelector('input[name="network_option"]:checked')?.value;
    if (!network || network === "") {

    } else {
        saveSelectedBlockchainNetwork();
    }

    if (onCloseFuncNetwork == null) {

    } else {
        onCloseFuncNetwork();
        onCloseFuncNetwork = null;
    }
}

spanCancelNetwork.onclick = function () {
    modalNetwork.style.display = "none";
    modalNetwork.close();
    onCloseFuncNetwork = null;
}

window.onclick = function (event) {
    if (event.target == modalOkDialog || event.target == modalConfirm || event.target == modalNetwork) {
        if (modalOkDialog.style.display !== "none") {
            modalNetwork.style.display = "none";
            modalNetwork.close();
        }

        if (modalConfirm.style.display !== "none") {
            modalConfirm.style.display = "none";
            modalConfirm.close();
        }

        if (modalNetwork.style.display !== "none") {
            modalNetwork.style.display = "none";
            modalNetwork.close();
        }
    }
}

function showErrorAndLockup(err) {
    modalOkDialog.style.display = "block";
    divSuccess.style.display = "none";
    divWarn.style.display = "block";
    modalOkDialog.showModal();

    document.getElementById('login-content').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('settings-content').style.display = 'none';
    document.getElementById('wallets-content').style.display = 'none';
    document.getElementById('divNetworkDropdown').style.display = 'none';

    let msg = getGenericError(err);
    pDetails.innerText = htmlEncode(msg);
}

function showLoadingAndExecuteAsync(txt, f) {
    document.getElementById("modalWaitDialog").style.display = "block";
    document.getElementById("modalWaitDialog").showModal();
    pWaitDetails.innerText = txt;
    setTimeout(() => {
        f();
    }, 60);
}

function hideWaitingBox() {
    document.getElementById("modalWaitDialog").style.display = "none";
    document.getElementById("modalWaitDialog").close();
}

function updateWaitingBox(txt) {
    pWaitDetails.innerText = txt;
}