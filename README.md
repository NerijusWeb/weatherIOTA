## IOTA Tangle orietaisas, kuris siunčia dviejų temperatūrų duomenis į IOTA tinklą

**Hardwaras:**
- Raspberry
- DS18B20 termometrai
- SD kortelė
- Maitinimas
- Wifi / Ethernet / 3G

**Softwaras:**
- https://nodejs.org/en/download/package-manager/
- https://www.npmjs.com/package/ds18b20-raspi
- https://github.com/iotaledger/iota.lib.js
- https://www.npmjs.com/package/forever


**DS18B20 pajungimas:**
- https://www.modmypi.com/blog/ds18b20-one-wire-digital-temperature-sensor-and-the-raspberry-pi


**Raspberrio terminalas:**
`crontab -e`
@reboot sudo forever start /home/pi/troliai/index.js

**Linkai:**
- https://thetangle.org/tag/TROLOLOLOLOLOLOLOLOLOLOLLLL

**Lengvas tutorialas:**

**Hardwaras**
*Visi failai **backend** kataloge*

nusiskenuojam termometrų ID

`ds18b20 --list`

- 28-0000075fdc4a - vidinis
- 28-0415904a94ff - išorinis

Susikonfiginam IOTA
```
const iota = new IOTA({
   'provider': "http://nodes.iota.fm:80" //PoW
});
```
susideklaruojam reikalingus kintamuosius
```
const iotaAddress = "TROLMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERRR";
const iotatag = "TROLOLOLOLOLOLOLOLOLOLOLOLO";
const insideSensor = "28-0000075fdc4a";
const outsideSensor = "28-0415904a94ff";
```
Tiek hardware. Žiūrėti failus.

**Frontendas**
*Visi failai **frontend** kataloge*

Webinės bibliotekos
- https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js
- https://cdn.rawgit.com/iotaledger/iota.lib.js/v0.4.5/dist/iota.js

Konfigas:
servas gali būt tas pats arba kitas
iota adresai ir tagai turi sutapti su backendo
```
const iota = new IOTA({
    'provider': "http://nodes.iota.fm:80"
});
const iotaAddress = "TROLMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERMAKERRR";
const iotaTag = "TROLOLOLOLOLOLOLOLOLOLOLLLL";
```

su _findTransactionObjects_ gaunam visas transakcijas iš adreso.
su pora pagalbinių funkcijų susirandam paskutinę tx pagal tagą
Naudoju lodash, tiek node, tiek webe - patogu greit paprastus dalykus pasidaryti.
```
function findLastTxByTag(iotaTx, iotaTag) {
   const filter = _.filter(iotaTx, {
       tag: iotaTag
   });
   const result = _.orderBy(filter, ["attachmentTimestamp"], ["desc"]);
   return result[0];
}
```

su _fromTrytes_ išsiparsinam žinutę į normalų objektą ir tada galima atvaizduoti kaip elementarius kintamuosius
```
function decodeTrytes(iotaTx) {
   const dataToParse = iotaTx.signatureMessageFragment.replace(/9+$/, "");
   const dataFromTrytes = iota.utils.fromTrytes(dataToParse);
   const iotaObject = JSON.parse(dataFromTrytes);

   return iotaObject;
}
```

Maža pagalbinė funkcija sugeneruoja HTML su duomenimis.
```
function displayData(iotaData, time) {
    insideTemp.innerHTML = `
        <h3>${iotaData.inside} laipsniai</h3>`
    outsideTemp.innerHTML = `
        <h3>${iotaData.outside} laipsniai</h3>`
    timeStamp.innerHTML = `
        <h4>${new Date(time).toLocaleString()}</h4>`
}
```

Main funkcija pasiima visas transakcijas iš adreso, tada susiranda paskutinę pagal tagą ir išsiparsina duomenų objektą. Viską atvaizduoja per _displayData()_ funkciją.
```
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
```



Viskas.
