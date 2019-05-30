/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/
var myDevice;
var myService = 'a3c87500-8ed3-4bdf-';        // fill in a service you're looking for here
var myCharacteristic = 0xffb2;   // fill in a characteristic from the service here

function connect(){
  navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
  .then(device => device.gatt.connect())
  .then(server => {
    // Getting Battery Service...
    return server.getPrimaryService('heart_rate');
  })
  .then(service => {
    // Getting Battery Level Characteristic...
    return service.getCharacteristic('heart_rate_measurement');
  })
  .then(characteristic => {
    // Reading Battery Level...
    return characteristic.readValue();
  })
  .then(value => {
    console.log('Battery percentage is ' + value.getUint8(0));
  })
  .catch(error => { console.log(error); });
}

// // subscribe to changes from the meter:
// function subscribeToChanges(characteristic) {
//   characteristic.oncharacteristicvaluechanged = handleData;
// }

// // handle incoming data:
// function handleData(event) {
//   // get the data buffer from the meter:
//   var buf = new Uint8Array(event.target.value);
//   console.log(buf);
// }

// // disconnect function:
// function disconnect() {
//   if (myDevice) {
//     // disconnect:
//     console.log(myDevice)
//     myDevice.gatt.disconnect();
//   }
// }
