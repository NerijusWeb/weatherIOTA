"use strict";

const iota = new IOTA({
    'provider': "http://nodes.iota.fm:80"
});
const iotaAddress = "TROLMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERRR";
const iotaTag = "TROLOLOLOLOLOLOLOLOLOLOLLLL";

let insideTemp = document.querySelector(".vidaus_temp");
let outsideTemp = document.querySelector(".lauko_temp");
let timeStamp = document.querySelector(".time_stamp");

const timer = 10000;

setInterval(mainLoop, timer);

function mainLoop() {
    let addr = {
        addresses: [iotaAddress]
    };
    iota.api.findTransactionObjects(addr, function (error, success) {
        if (error) {
            console.error(error);
        } else {
            const lastTx = findLastTxByTag(success, iotaTag);
            const iotaData = decodeTrytes(lastTx)
            displayData(iotaData, lastTx.attachmentTimestamp);
        }
    });
}

function findLastTxByTag(iotaTx, iotaTag) {
    const filter = _.filter(iotaTx, {
        tag: iotaTag
    });
    const result = _.orderBy(filter, ["attachmentTimestamp"], ["desc"]);
    return result[0];
}

function decodeTrytes(iotaTx) {
    const dataToParse = iotaTx.signatureMessageFragment.replace(/9+$/, "");
    const dataFromTrytes = iota.utils.fromTrytes(dataToParse);
    const iotaObject = JSON.parse(dataFromTrytes);

    return iotaObject;
}

function displayData(iotaData, time) {
    insideTemp.innerHTML = `
        <h3>${iotaData.inside} laipsniai</h3>`
    outsideTemp.innerHTML = `
        <h3>${iotaData.outside} laipsniai</h3>`
    timeStamp.innerHTML = `
        <h4>${new Date(time).toLocaleString()}</h4>`
}
