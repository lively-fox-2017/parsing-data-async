class pecah {
  constructor(namafile) {
    this.teks = null
    this.namafile = namafile
  }

  parse(callback) {
    this.teks = []
    fs.readFile('tes.txt', 'utf8', (err, data) => {
      console.log(data);
      this.teks.push(data)
    })
  }
}

var fs = require("fs")
var a = new pecah('tes.txt')
console.log(a.parse());
