// ! const pool = require('./database')();
const x = 'app.js';
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');


const port = 3002;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    if (request.query.mac_address_key != null && request.query.mac_address_value != null) {
        addMacAddress(request.query.mac_address_key, request.query.mac_address_value, request, response);
    } else if (request.query.mac_address_key != null) {
        handelMacAddress(request.query.mac_address_key, request, response);
    } else {
        fs.readFile('./mac-address.json', (err, data) => {
            if (err) throw err;
            const json = JSON.parse(data);

            response.send(json);
        });
    }

});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

function handelMacAddress(mac_address_key, request, response) {
    mac_address_key = keyConverter(mac_address_key);
    console.log(`${request.method} by ${request.ip} with parameter '${request.query.mac_address_key}'`);
    fs.readFile('./mac-address.json', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);


        
        let mac_address_value = json[mac_address_key];

        if(mac_address_value == null)
            mac_address_value = "unknown";

        console.log(`RESPONSE with ${JSON.stringify({ key: mac_address_key, value: mac_address_value })}`);
        response.send({ key: mac_address_key, value: mac_address_value });
    });
}

function addMacAddress(mac_address_key, mac_address_value, request, response) {
    mac_address_key = keyConverter(mac_address_key);
    console.log(`${request.method} by ${request.ip} with parameter '${mac_address_key}, ${mac_address_value}'`);
    fs.readFile('./mac-address.json', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);

        json[mac_address_key] = mac_address_value;

        fs.writeFile("./mac-address.json", JSON.stringify(json), function (err) {
            if (err) {
                return console.log(err);
            }

            response.send({ key: mac_address_key, value: mac_address_value });
            console.log('UPDATE successfully updated');
        });
    });
}

function keyConverter(key){
    key = key.replace(/(\W+)/g, '');
    key = key.toUpperCase();
    key = key.slice(0,6);
    key = key.match(/.{1,2}/g).join('-');
    return key;
}