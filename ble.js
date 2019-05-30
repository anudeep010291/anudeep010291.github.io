/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/


function connect() {
  let serviceUuid = 0x180D;
  // if (serviceUuid.startsWith('0x')) {
  //   serviceUuid = parseInt(serviceUuid);
  // }

  let characteristicUuid = 0x2A37;
  // if (characteristicUuid.startsWith('0x')) {
  //   characteristicUuid = parseInt(characteristicUuid);
  // }

  console.log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    console.log('Getting Service...');
    return server.getPrimaryService(serviceUuid);
  })
  .then(service => {
    console.log('Getting Characteristics...');
    if (characteristicUuid) {
      // Get all characteristics that match this UUID.
      return service.getCharacteristics(characteristicUuid);
    }
    // Get all characteristics.
    return service.getCharacteristics();
  })
  .then(characteristics => {
    // console.log('> Characteristics: ' +
    //   characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
    characteristic.addEventListener('characteristicvaluechanged',
                                  handleCharacteristicValueChanged);
  console.log('Notifications have been started.');
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}


function handleCharacteristicValueChanged(event) {
  var value = event.target.value;
  console.log('Received ' + value);
  // TODO: Parse Heart Rate Measurement value.
  // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
}
// subscribe to changes from the meter:
// function subscribeToChanges(characteristic) {
//   characteristic.oncharacteristicvaluechanged = handleData;
// }

// // handle incoming data:
// function handleData(event) {
//   // get the data buffer from the meter:
//   var buf = new Uint8Array(event.target.value);
//   console.console.log(buf);
// }

// // disconnect function:
// function disconnect() {
//   if (myDevice) {
//     // disconnect:
//     console.console.log(myDevice)
//     myDevice.gatt.disconnect();
//   }
// }



// Characteristics: 00002a37-0000-1000-8000-00805f9b34fb