'use strict';
var PATH = require('path'),
    columns = require('./columns.js');

function buildRows(file) {
    var path = PATH.join(__dirname, file),
        next = file + '.0.json',
        obj = null,
        rows = [],
        rl = 0;

    while (next) {
        try {
            obj = require(PATH.join(path, next));
            console.log('captured and integrating file '+next);
        }
        catch (e) {
            break;
        }
        if (obj) {
            rows.push.apply(rows, obj.rows);
            next = obj.nextFile;
        }
    }

    return rows;

}

module.exports = {
    //filename: path.join(__dirname, 'cities.json'),
    //columns: require('./columns.js'),
    countryColumns: columns.countries,
    countries: buildRows('countries'),
    cityColumns: columns.cities,
    cities: buildRows('cities')

};
