"use strict"
let fs = require('fs');

class Person {
  constructor(id, fName, lName, email, phone, createdAt){
    this.id = id
    this.first_name = fName
    this.last_name = lName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._newData = ''
  }

  get people() {
    return this._people
  }

  addPerson(data) {
    this._people.push(data)
    this._newData += data.id+','+
                    data.first_name+','+
                    data.last_name+','+
                    data.email+','+
                    data.phone+','+
                    data.created_at+'\n'
  }

  getData(callback) {
    fs.readFile(this._file, 'utf8', function (err, data) {
      if(err){
        console.log('Error data file');
      } else {
        let people = data.split('\n')
        for (let i = 1; i < people.length-1; i++) {
          let dataSplit = people[i].split(',')
          let person = new Person(dataSplit[0],dataSplit[1],dataSplit[2],dataSplit[3],dataSplit[4],new Date());
          parser.people.push(person);
        }
      }
      callback()
    });
  }

  save() {
    fs.appendFileSync('people.csv', this._newData, 'utf8')
  }
}

let parser = new PersonParser('people.csv')
parser.getData(function(){

  // -- add new people data --
  // parser.addPerson(new Person(parser.people.length+1, 'Patur', 'Rohman', 'Patur@aawa.edu', '1-928-384-992', '2017-10-11T04:22:20-07:00'));
  // parser.save();

  console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
});
