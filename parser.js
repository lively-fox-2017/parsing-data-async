"use strict"
const fs = require('fs');
const faker = require('faker');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  parse(callback) {
    fs.readFile(this._file, (err, data) => {
      if (err)
        throw err;
      let fileParsed = data.toString().split('\r\n');
      fileParsed.forEach((value, key) => {
        if (key !== 0) {
          let person = new Person(...value.split(','));
          this._people.push(person);
        }
      });
      callback(this._people);
    });
  }

  people(people) {
    console.log(require('util').inspect(people, {
      maxArrayLength: null
    }));
  }

  addPerson(people, person) {
    person.id = parseInt(people[people.length - 1].id) + 1;
    people.push(person);
  }

  save(people) {
    let str = '';
    people.forEach((obj) => {
      for (var key in obj) {
        if (key == 'created_at')
          str += obj[key].toISOString();
        else
          str += obj[key];
        str += ',';
      }
      str = str.slice(0, -1);
      str += '\r\n';
    });
    str = str.slice(0, -4);
    fs.writeFile(this._file, str, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}

let parser = new PersonParser('./people.csv');
parser.parse((people) => {
  parser.people(people);
  parser.addPerson(people, new Person(faker.random.number(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumberFormat(), faker.date.recent()));
  parser.save(people);
  parser.people(people);
});
