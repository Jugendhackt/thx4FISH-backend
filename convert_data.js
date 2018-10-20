const fs = require('fs');

fs.readFile(__dirname + '/random.txt', function (err, data) {
    if (err) {
        throw err;
    }
    // * Send raw website data
    // console.log(data.toString());

    // * Put every line in an Array
    var lines = data.toString().split("\n");
    var json_array = [];
    var json = {};

    for (i = 0; i < lines.length; i += 6) {

        lines = lines.filter(function (line) {
            return line.includes('(hex)');
        });

        var lineArray = lines[i].replace(/(\W\W+)/g, '#').split('#');
        // console.log(`MAC-Adress: ${output.split(0,6)}`);
        var mac_adress = lineArray[0];
        var company_name = lineArray.splice(2, 10).join().replace('\r', '');

        console.log(mac_adress + ' ' + company_name);

        json[mac_adress] = company_name;
    }

    fs.writeFile("mac-address.json", JSON.stringify(json), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});



