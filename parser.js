"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, create_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.create_at = create_at;
  }
}

class PersonParser {

  constructor(file) {
    this.file = file;
    this._people = [];
  }

  get people() {
    return this._people;
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  parsingPeople(callback){
    let self = this;

    fs.readFile(this.file, 'utf-8', function(err, data) {
      // console.log(data);
      if(!err){
        let arrNew = data.split('\n')
          for (let i = 1; i < arrNew.length-1; i++){
            let parsingArr = arrNew[i].split(',');
            let person = new Person(parsingArr[0], parsingArr[1], parsingArr[2], parsingArr[3], parsingArr[4],parsingArr[5] );
            self._people.push(person)
          }
        }
        callback();
      });
    }

save(){
  let fs = require('fs')
  fs.appendFile('people.csv', this._people, function(err) {
    if(!err) {
      console.log('data berhasil disimpan');
    }
  })
}

}

let parser = new PersonParser('people.csv');

parser.addPerson(['201', 'Hacktiv8', 'Lively', 'lively@hactiv8.com', '0214526845', new Date()] +'\n')
parser.save()
parser.parsingPeople(function() {
  console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
});
