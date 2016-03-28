'use strict';
var path = require('path');

module.exports = {
    filename: path.join(__dirname, 'cities.json'),
    columns: require('./columns.js'),
    data: require('./cities.json')
};
