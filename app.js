// ! const pool = require('./database')();
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs'); 
const port = 3002;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('handle', function (request, response) {

    // ! var query1=request.body.var1;
    fs.readFile('./mac-address.json', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);

        let mac_address_value;
        let mac_address_key;

        mac_address_key = request.query.mac_address;
        mac_address_value = json[mac_address_key];
        console.log(`POST by ${request.ip} with parameter '${mac_address_key}'`); 
        response.send({ key: mac_address_key, value: mac_address_value });
    });

});

app.get('/', (request, response) => { 

    fs.readFile('./mac-address.json', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);

        let mac_address_value;
        let mac_address_key;

        mac_address_key = request.query.mac_address;
        mac_address_value = json[mac_address_key];
        console.log(`GET by ${request.ip} with parameter '${mac_address_key}'`); 
        response.send({ key: mac_address_key, value: mac_address_value });
    });
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});