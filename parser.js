"use strict"

class Person {
  constructor(first, last, email, phone, created_at) {
    // this.id = data.id
    this.first_name = first
    this.last_name = last
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    // this.size = 0;
    // this.file = 'people.csv'
  }
  readData(callback) {
    let dataSplit;
    let indexData;
    let dataSplitKoma;
    fs.readFile(this._file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      } else {
        dataSplit = data.split('\n');
        for (let i = 1; i < dataSplit.length; i++) {
          dataSplitKoma = dataSplit[i].split(',');
          this._people.push(new Person(dataSplitKoma[0], dataSplitKoma[1], dataSplitKoma[2], dataSplitKoma[3], dataSplitKoma[4], dataSplitKoma[5]));
        }
        callback(this._people);
      }
    })
  }

  get people() {
    this.size = this._people.length;
    return this;
  }

  addPerson(data) {

    let newData = '\n' + data.id + ',' + data.first_name + ',' + data.last_name + ',' + data.email + ',' + data.phone + ',' + data.created_at.toISOString();
    this._people.push(newData);
  }

  save() {
    fs.appendFile('people.csv', this._people[this._people.length - 1], (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Data ', this._people[this._people.length - 1], ' was appended to the the file');
      }
    })
  }

}



let dataPeople = {
  'id'  : '201',
  'first_name': 'Amelia',
  'last_name': 'Rahman',
  'email': 'amel.rahman5@gmail.com',
  'phone': '081318352537',
  'created_at': new Date()
}
let fs = require('fs')
let parser = new PersonParser('people.csv')

parser.addPerson(dataPeople)
parser.save()
parser.readData(function (data) {
  console.log(data)
})
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// people.csv



