/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/


function connect() {
  // let serviceUuid = 0x180D;
  // let serviceUuid = "a3c87500-8ed3-4bdf-8a39-a01bebede295";
  let serviceUuid = "96d1a1bb-1b81-47b5-88f1-4b5f77b37fee";

  // if (serviceUuid.startsWith('0x')) {
  //   serviceUuid = parseInt(serviceUuid);
  // }

  // let characteristicUuid = 0x2A37;
  // if (characteristicUuid.startsWith('0x')) {
  //   characteristicUuid = parseInt(characteristicUuid);
  // }

  console.log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
//   .then(server => {
//     console.log('Getting Service...');
//     return server.getPrimaryService(serviceUuid);
//   })
//   .then(service => {
//   // Getting Battery Level Characteristic...
//   return service.getCharacteristic(characteristicUuid);
// })
//   .then(characteristic => {
//   // Reading Battery Level...
//   return characteristic.readValue();
// })
// .then(value => {
//   console.log('Heart Rate is:: ' + value.getUint8(0));
// })


  .catch(error => {
    console.log('Argh! ' + error);
  });
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