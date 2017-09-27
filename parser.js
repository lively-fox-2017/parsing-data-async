"use strict"
let fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(isi) {
    this.id = isi['id'],
      this.first_name = isi['f_name'],
      this.last_name = isi['l_name'],
      this.email = isi['email'],
      this.phone = isi['telepon'],
      this.created_at = isi['pembuatan']
    // id,first_name,last_name,email,phone,created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    return this._people
  }
  addPerson(dataInput) {
    console.log(dataInput);
    this._people.push(dataInput)
  }

  simpan() {
    // console.log(this.people[200]);
    var tampung = "id,first_name,last_name,email,phone,created_at,\n";

    this.people.forEach(function (element) {
      tampung += element.id + ',';
      tampung += element.first_name + ',';
      tampung += element.last_name + ',';
      tampung += element.email + ',';
      tampung += element.phone + ',';
      tampung += element.created_at + ',';
      tampung += '\n';
    }, this);
    // console.log(tampung);
    fs.writeFile('people.csv', tampung);
  }
  parsing(callback) {
    this._people = [];
    fs.readFile(this._file, "utf8", (err, data) => {
      if (err) {
        console.log('Data gagal di ambil');
        callback(err)
      } else {
        let pecah = data.split('\n');
        for (var parsing = 1; parsing < pecah.length; parsing++) {
          let obj = pecah[parsing].split(',');
          let hasilObj = new Person({
            id: obj[0],
            f_name: obj[1],
            l_name: obj[2],
            email: obj[3],
            telepon: obj[4],
            pembuatan: new Date(obj[5]).toISOString()
          });
          this._people.push(hasilObj)
        }
        callback();
      }
    });

  }
}

let parser = new PersonParser('people.csv')
let input = {
  id: 201,
  f_name: 'Agustinus',
  l_name: 'Saja',
  email: 'vbagustinus@gmail.com',
  telepon: '085700009776',
  pembuatan: new Date()
}
parser.parsing((err) => {
  if (!err) {
    parser.addPerson(new Person(input));
    console.log(parser.people[200]);
    parser.simpan();
    console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
  }
});
