var fs = require('fs');
var fileName = './census.csv'

function parseCSV(file) {
  fs.readFile(fileName, 'utf-8', function(err, data) {
    if (err) throw err;
    var rows = data.split('\n').map(splitOnComma);
    rows.pop();
    var headers = rows.shift();
    keys = headers.map(toCamelCase);
    var objs = rows.map(function(row) {
      return rowToObj(row, keys);
    });
    saveAsJson('census.json', objs);
  });
}

function rowToObj(row, keys) {
  var obj = {};
  row.forEach(function(cell, i) {
    obj[keys[i]] = cell;
  });
  return obj;
}

function saveAsJson(name, objs) {
  var data = JSON.stringify(objs, '\n', 2);
  fs.writeFile(name, data, function(err) {
    if (err) throw err;
    console.log('saved file');
  });
}

function splitOnComma(str) {
  return str.split(',');
}

function toCamelCase(str) {
  str = str.trim().split(' ').map(function(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }).join('');
  str = str[0].toLowerCase() + str.substring(1);
  return str;
}

parseCSV(fileName);
