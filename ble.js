/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/
var myDevice;
var myService = 'a3c87500-8ed3-4bdf-';        // fill in a service you're looking for here
var myCharacteristic = 0xffb2;   // fill in a characteristic from the service here

// function connect(){
//   navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
//   .then(device => device.gatt.connect())
//   .then(server => {
//     // Getting Battery Service...
//     return server.getPrimaryService('heart_rate');
//   })
//   .then(service => {
//     // Getting Battery Level Characteristic...
//     return service.getCharacteristic('heart_rate_measurement');
//   })
//   .then(characteristic => {
//     // Reading Battery Level...
//     return characteristic.readValue();
//   })
//   .then(value => {
//     console.log('Battery percentage is ' + value.getUint8(0));
//   })
//   .catch(error => { console.log(error); });
// }


function connect() {
  navigator.bluetooth.requestLEScan({
    filters: [{manufacturerData: {0x004C: {dataPrefix: new Uint8Array([
      0x02, 0x15, // iBeacon identifier.
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15  // My beacon UUID.
    ])}}}],
    options: {
      keepRepeatedDevices: true,
    }
  }).then(() => {
    navigator.bluetooth.addEventListener('advertisementreceived', event => {
    let appleData = event.manufacturerData.get(0x004C);
  if (appleData.byteLength != 23) {
    // Isn’t an iBeacon.
    return;
  }
  let major = appleData.getUint16(18, false);
  let minor = appleData.getUint16(20, false);
  let txPowerAt1m = -appleData.getInt8(22);
  let pathLossVs1m = txPowerAt1m - event.rssi;

  console.log(txPowerAt1m)
  console.log(pathLossVs1m)

    });
  })
}