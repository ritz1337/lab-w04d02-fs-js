var fs = require('fs');

fs.readFile('./census.csv', 'utf-8', function(err, data) {
  if (err) throw err;
  // console.log(data);
  var mainTable = data.split('\n');
  // console.log(mainTable);
  mainTable.pop();
  // console.log(tableHeader);
  // console.log(mainTable);
  for (var i =0; i < mainTable.length; i++) {
    mainTable[i] = mainTable[i].split(',');
  }
  var tableHeader = mainTable.shift();
  // console.log(tableHeader);
  // console.log(mainTable);

  var finalArr = [];
  for (var i = 0; i < mainTable.length; i ++) {
    var stObj = {};
    for (var j = 0; j < tableHeader.length; j++) {
      var key = tableHeader[j];
      stObj[key] = mainTable[i][j];
    }
    finalArr.push(stObj);
  }
  console.log(finalArr);

  var popData = JSON.stringify(finalArr);
  console.log(popData);
  fs.writeFile('census.json', popData, function(err) {
    if (err) throw err;
    console.log('saved the census data as JSON');
  })
})



// object looks like:
// state = {
//   name: Alabama,
//   Total_Population_2010: 4663920,
//   Population_in_Rented_Housing_2010 = main: 1352616,
//   Total_Population_2010: 4332380,
//   Population_in_Rented_Housing_2000: 1273652
// }


