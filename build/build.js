'use strict';

var FILE = require('fs'),
    TAB_MAP = require('./columns.js'),
    JSON_FILENAME = __dirname + '/data/cities1000.json',
    DB_FILENAME = __dirname + '/data/cities1000.txt';

function readFile(name) {
    return FILE.readFileSync(name, 'utf8');
}

function createJson(name, data) {
    var anchor = 0,
        line = '',
        list = [],
        ll = 0;
    var c, l, chr, item;
    for (c = -1, l = data.length; l--;) {
        chr = data.charAt(++c);
        switch (chr) {
        case "\r":
        case "\n":
            line = data.substring(anchor, c);
            anchor = c + 1;
            if (line) {
                list[ll++] = createObject(line.split(/\t/));
            }
            break;
        }
    }

    FILE.writeFileSync(name, JSON.stringify(list), 'utf8');

}

function createObject(properties) {
    var keyList = TAB_MAP,
        l = keyList.length,
        newObject = {};
    var c, name, value;

    for (c = -1, l = keyList.length; l--;) {
        name = keyList[++c];
        newObject[name] = c in properties ? properties[c] : void(0);
    }
    return newObject;
}


createJson(
    JSON_FILENAME,
    readFile(DB_FILENAME)
);


