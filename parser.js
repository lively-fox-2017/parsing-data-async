"use strict"

let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this.peopleStr = '';
  }

  panggilData(callback) {
    
    let data = '';

    fs.readFile(this._file, 'utf8', (err, data) => {
      if(!err) {
        let olahData = data.split('\n');
        let arrOfObj = [];
        for (let i = 1; i < olahData.length; i++) {
          let arr2Dimensi = olahData[i].split(',');
          let arr = new Person(arr2Dimensi[0], arr2Dimensi[1], arr2Dimensi[2], arr2Dimensi[3], arr2Dimensi[4], arr2Dimensi[5]);
          this._people.push(arr);
        }
      } else {
        console.log('File tidak terbaca');
      }
      callback();
    });
  }

  get people() {
    return this._people;
  }

  addPerson(obj) {
    this._people.push(obj);
    this.peopleStr = '\n' + obj.id + ',' + obj.first_name + ',' + obj.last_name + ',' + obj.email + ',' + obj.phone + ',' + obj.created_at;
  }

  save() {
    fs.appendFileSync('people.csv', this.peopleStr, 'utf8');
  }
}

let parser = new PersonParser('people.csv');

parser.panggilData(function() {
  parser.people;
  parser.addPerson(new Person(201, 'Zuhri', 'Nurhuda', 'zuhri.nurhuda@gmail.com', '085258588122', new Date()));
  console.log(parser.people[200]);
  console.log(parser.peopleStr);
  parser.save();
});

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
