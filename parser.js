"use strict"

const util = require('util');
const fs = require('fs');

class Person {

  constructor(firstName, lastName, email, phone, createdAt, id = null) {
    this.id        = null;
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this._peopleCSV = '';
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  get peopleCSV() {
    return this._peopleCSV.join('\n');
  }

  readFile(callback) {

    let fromCSV = '';
    let records = [];

    fs.readFile(this._file, 'utf8', function(err, data) {

      if (err) throw(err);

      fromCSV = data.toString().split('\n');

      this._peopleCSV = fromCSV;

      for (let i = 1; i < fromCSV.length; i++) {

        if (fromCSV[i])
          records.push(fromCSV[i].split(','));

      }

      this._people = records;

      callback();

    }.bind(this));

  }

  addPerson(person) {

    let newRecord = [

      // Auto increment if person.id = null
      person.id || parseInt(this._people[this._people.length - 1][0]) + 1,
      person.firstName,
      person.lastName,
      person.email,
      person.phone,
      person.createdAt,

    ];

    this._people.push(newRecord);

    this._peopleCSV.push(newRecord.toString());

  }

  save() {

    fs.writeFile(this._file, this.peopleCSV, function(err) {

      if (err) throw err;

      console.log('Saved!');

    });

  }

}

let parser = new PersonParser('people.csv')

let date = new Date;

let alexander = new Person(

  'Alexander',
  'Wahyudi',
  'alexander@gmail.com',
  '+6287702766658',
  date.toISOString()

);

parser.readFile(function() {
  parser.addPerson(alexander);
  parser.save();
});
