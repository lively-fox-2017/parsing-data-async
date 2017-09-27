var fs = require('fs')
fs.writeFile('tes.txt', 'Hello Node.js', (err) => {
  console.log('The file has been saved!');
});
