const console = require('./amazing_console.js');
var arp = require('node-arp');
 
arp.getMAC('192.168.1.164', function(err, mac) {
    if (!err) {
    }
    console.log(mac);
});