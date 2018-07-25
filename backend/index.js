"use strict";

const sensor = require('ds18b20-raspi');
const IOTA = require("iota.lib.js");

const iota = new IOTA({
    'provider': "http://nodes.iota.fm:80" //PoW
});

const iotaAddress = "TROLMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERRR";
const iotaTag = "TROLOLOLOLOLOLOLOLOLOLOLLLL";
const insideSensor = "28-0000075fdc4a";
const outsideSensor = "28-0415904a94ff";
const timer = 6000;

setTimeout(logTempIOTA, timer);

function logTempIOTA() {

    const sensorsData = {
        inside: sensor.readC(insideSensor, 2),
        outside: sensor.readC(outsideSensor, 2)
    }

    const message = iota.utils.toTrytes(JSON.stringify(sensorsData));

    const transfer = [{
        value: 0,
        tag: iotaTag,
        address: iotaAddress,
        message: message
    }];

    iota.api.sendTransfer(iotaAddress, 9, 14, transfer, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
        }
    });
}
