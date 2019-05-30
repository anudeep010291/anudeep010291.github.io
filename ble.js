/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/
var myDevice;
var myService = 0xffb0;        // fill in a service you're looking for here
var myCharacteristic = 0xffb2;   // fill in a characteristic from the service here

function connect(){
 function onButtonClick() {
  let serviceUuid = '7f280001-8204-f393-e0a9-e50e24dcca9e';
  // if (serviceUuid.startsWith('0x')) {
  //   serviceUuid = parseInt(serviceUuid);
  // }

  let characteristicUuid = '7f280002-8204-f393-e0a9-e50e24dcca9e';
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
    console.log('> Characteristics: ' +
      characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

 }
