'use strict';

var FILE = require('fs'),
    PATH = require('path'),
    DATA_PATH = PATH.join(__dirname, 'data'),
    TAB_MAP = require('./columns.js'),
    DB_CITIES_FILENAME = __dirname + '/data/cities1000.txt',
    DB_COUNTRIES_FILENAME = __dirname + '/data/countryInfo.txt',
    COMMENT_RE = /^\#/;

function readFile(name) {
    return FILE.readFileSync(name, 'utf8');
}

function createJson(path, name, tab_map, data) {
    var commentRe = COMMENT_RE,
        anchor = 0,
        line = '',
        list = [],
        ll = 0,
        limit = 1000,
        cl = 0,
        nextFileCount = 0;
    var c, l, chr, item, filename;
    console.log('Creating Batch Rows: ' + name + ' in ' + path);
    for (c = -1, l = data.length; l--;) {
        chr = data.charAt(++c);
        switch (chr) {
        case "\r":
        case "\n":
            line = data.substring(anchor, c);
            anchor = c + 1;
            if (line && !commentRe.test(line)) {
                // create next
                if (++cl > limit) {
                    filename = PATH.join(
                            path,
                            name + '.' + (nextFileCount++) + '.json'
                        );
                    console.log('Creating ' + name + ' to file: ' + filename);
                    FILE.writeFileSync(
                        filename,
                        JSON.stringify({
                            nextFile: name + '.' + (nextFileCount) + '.json',
                            rows: list
                        }),
                        'utf8'
                    );
                    list.splice(0, ll);
                    ll = 0;
                    cl = 0;
                }
                list[ll++] = createObject(line.split(/\t/), tab_map);

            }
            break;
        }
    }

    if (ll) {
        filename = PATH.join(
                path,
                name + '.' + (nextFileCount++) + '.json'
            );
        console.log('Creating ' + name + ' to file: ' + filename);
        FILE.writeFileSync(
            filename,
            JSON.stringify({
                nextFile: null,
                rows: list
            }),
            'utf8'
        );
    }

}

function createObject(properties, keyList) {
    var l = keyList.length,
        newObject = {};
    var c, name, value;

    for (c = -1, l = keyList.length; l--;) {
        name = keyList[++c];
        newObject[name] = c in properties ? properties[c] : void(0);
    }
    return newObject;
}

createJson(
    PATH.join(DATA_PATH, 'countries'),
    'countries',
    TAB_MAP.countries,
    readFile(DB_COUNTRIES_FILENAME)
);

createJson(
    PATH.join(DATA_PATH, 'cities'),
    'cities',
    TAB_MAP.cities,
    readFile(DB_CITIES_FILENAME)
);



