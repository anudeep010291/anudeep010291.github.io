/*
A minimal Web Bluetooth connection example

created 6 Aug 2018
by Tom Igoe
*/
var myDevice;
var myService = 0xffb0;        // fill in a service you're looking for here
var myCharacteristic = 0xffb2;   // fill in a characteristic from the service here

function connect(){
  console.log('Requesting any Bluetooth Device...');
  navigator.bluetooth.requestDevice({
   // filters: [...] <- Prefer filters to save energy & show relevant devices.
      acceptAllDevices: true,
      optionalServices: ['heart_rate']})
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    console.log('Getting heart_rate Service...');
    return server.getPrimaryService('heart_rate');
  })
  .then(service => {
    console.log('Getting Device Information Characteristics...');
    return service.getCharacteristics();
  })
  .then(characteristics => {
    let queue = Promise.resolve();
    let decoder = new TextDecoder('utf-8');
    characteristics.forEach(characteristic => {
      switch (characteristic.uuid) {

        case BluetoothUUID.getCharacteristic('heart_rate_measurement'):
          queue = queue.then(_ => characteristic.readValue()).then(value => {
            console.log('> heart_rate_measurement: ' + decoder.decode(value));
          });
          break;

        // case BluetoothUUID.getCharacteristic('model_number_string'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> Model Number String: ' + decoder.decode(value));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('hardware_revision_string'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> Hardware Revision String: ' + decoder.decode(value));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('firmware_revision_string'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> Firmware Revision String: ' + decoder.decode(value));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('software_revision_string'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> Software Revision String: ' + decoder.decode(value));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('system_id'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> System ID: ');
        //     console.log('  > Manufacturer Identifier: ' +
        //         padHex(value.getUint8(4)) + padHex(value.getUint8(3)) +
        //         padHex(value.getUint8(2)) + padHex(value.getUint8(1)) +
        //         padHex(value.getUint8(0)));
        //     console.log('  > Organizationally Unique Identifier: ' +
        //         padHex(value.getUint8(7)) + padHex(value.getUint8(6)) +
        //         padHex(value.getUint8(5)));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
        //         decoder.decode(value));
        //   });
        //   break;

        // case BluetoothUUID.getCharacteristic('pnp_id'):
        //   queue = queue.then(_ => characteristic.readValue()).then(value => {
        //     console.log('> PnP ID:');
        //     console.log('  > Vendor ID Source: ' +
        //         (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
        //     if (value.getUint8(0) === 1) {
        //       console.log('  > Vendor ID: ' +
        //           (value.getUint8(1) | value.getUint8(2) << 8));
        //     } else {
        //       console.log('  > Vendor ID: ' +
        //           getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
        //     }
        //     console.log('  > Product ID: ' +
        //         (value.getUint8(3) | value.getUint8(4) << 8));
        //     console.log('  > Product Version: ' +
        //         (value.getUint8(5) | value.getUint8(6) << 8));
        //   });
        //   break;

        // default: console.log('> Unknown Characteristic: ' + characteristic.uuid);
      }
    });
    return queue;
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

// subscribe to changes from the meter:
function subscribeToChanges(characteristic) {
  characteristic.oncharacteristicvaluechanged = handleData;
}

/* Utils */

function padHex(value) {
  return ('00' + value.toString(16).toUpperCase()).slice(-2);
}

function getUsbVendorName(value) {
  // Check out page source to see what valueToUsbVendorName object is.
  return value +
      (value in valueToUsbVendorName ? ' (' + valueToUsbVendorName[value] + ')' : '');
}





