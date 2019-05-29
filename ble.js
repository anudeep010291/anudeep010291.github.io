/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/
var myDevice;
var myService = 0xffb0;        // fill in a service you're looking for here
var myCharacteristic = 0xffb2;   // fill in a characteristic from the service here

function connect(){


    navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => service.getCharacteristic('heart_rate_measurement'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
      characteristic.addEventListener('characteristicvaluechanged',
                                      handleCharacteristicValueChanged);
      console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });

    function handleCharacteristicValueChanged(event) {
      var value = event.target.value;
      console.log('Received ' + value);
      // TODO: Parse Heart Rate Measurement value.
      // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
    }
}

// subscribe to changes from the meter:
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
