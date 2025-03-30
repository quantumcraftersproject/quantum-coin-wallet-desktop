function openValidatorPage() {
    OpenUrl(HTTPS + currentBlockchainNetwork.blockExplorerDomain+"/validator/page");
    return false;
}

async function showValidatorScreen() {
    document.getElementById('ahrefValidatorPage').textContent = currentBlockchainNetwork.blockExplorerDomain+"/validator/page";
    document.getElementById('main-content').style.display = "block";
    document.getElementById('settings-content').style.display = "none";
    document.getElementById('settingsScreen').style.display = "none";
    document.getElementById('networkListScreen').style.display = "none";
    document.getElementById('networkAddScreen').style.display = "none";

    document.getElementById('divNetworkDropdown').style.display = 'none';
    document.getElementById('HomeScreen').style.display = 'none';
    document.getElementById('SendScreen').style.display = 'none';
    document.getElementById('OfflineSignScreen').style.display = 'none';
    document.getElementById('ValidatorScreen').style.display = 'block';
    document.getElementById('gradient').style.height = '116px';

    let ddlValidatorOptions = document.getElementById("ddlValidatorOptions");
    ddlValidatorOptions.value = "none";

    await updateValidatorScreen();

    document.getElementById("ddlValidatorOptions").focus();

    return false;
}

async function updateValidatorScreen() {
    document.getElementById("txtValidatorAddress").value = "";
    document.getElementById("txtValidatorDepositCoins").value = "";
    document.getElementById("txtCurrentNonceValidator").value = "";
    document.getElementById("pwdValidator").value = "";

    document.getElementById("divValidatorAddress").style.display = "none";
    document.getElementById("divValidatorDepositCoins").style.display = "none";
    document.getElementById("divCurrentNonceValidator").style.display = "none";
    document.getElementById("divValidatorScreenPassword").style.display = "none";
    document.getElementById("divValidatorButton").style.display = "none";

    let ddlCoinTokenToSend = document.getElementById("ddlValidatorOptions");
    let selectedValue = ddlCoinTokenToSend.value;

    if(selectedValue === "none") {

    } else {
        document.getElementById("divValidatorButton").style.display  = "block";
        document.getElementById("divValidatorScreenPassword").style.display = "block";
        offlineSignEnabled = await offlineTxnSigningGetDefaultValue();

        if (offlineSignEnabled === true) {
            document.getElementById("btnValidation").style.display  = "none";
            document.getElementById("divCurrentNonceValidator").style.display  = "block";
            document.getElementById("btnOfflineValidation").style.display  = "block";
        } else {
            document.getElementById("btnValidation").style.display  = "block";
            document.getElementById("divCurrentNonceValidator").style.display  = "none";
            document.getElementById("btnOfflineValidation").style.display  = "none";
        }

        if(selectedValue === "newdeposit") {
            document.getElementById("divValidatorAddress").style.display = "block";
            document.getElementById("divValidatorDepositCoins").style.display = "block";
        } else if(selectedValue === "increasedeposit") {
            document.getElementById("divValidatorDepositCoins").style.display = "block";
        } else if(selectedValue === "initiatepartialwithdrawal") {
            document.getElementById("divValidatorDepositCoins").style.display = "block";
        } else if(selectedValue === "completepartialwithdrawal") {

        } else if(selectedValue === "pausevalidation") {

        } else if(selectedValue === "resumevalidation") {

        } else {

        }
    }
}

function validation() {

}

function signOfflineValidation() {

}

