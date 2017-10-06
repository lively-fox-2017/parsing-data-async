"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,fname,lname,email,phone,cd){

    this._id=id
    this.f_name=fname
    this.l_name=lname
    this.email=email
    this.phone=phone
    this.c_date=cd

  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  readFile(){

    let fs = require('fs')
    let temp = []
    let i = 0

    fs.readFile(this._file, (err, data) => {
      if (err) throw err;
      this._people  = data.toString().split('\n')
      // this.people
      // this.addPerson
      // this.save
      console.log(this._people);
    });

    //console.log(temp)

  }

  get people() {
    //console.log(this._people)
    return this._people
  }

  get addPerson() {
    let temp = new Person(1, 'Ahmad', 'Nizar', 'ahmadnizar.owl@gmail.com', '081279155548', 'today')
    this._people.push(temp)
    console.log(this._people)

    return this._people
  }

  get save(){

    let temp='\n'+this._people[this._people.length-1]._id+','+this._people[this._people.length-1].f_name+','+this._people[this._people.length-1].l_name+','+this._people[this._people.length-1].email+','+this._people[this._people.length-1].phone+','+this._people[this._people.length-1].c_date

    var fs = require('fs')
    fs.appendFile('people.csv', temp, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }

}

let parser = new PersonParser('people.csv')
parser.readFile()
//parser.addPerson
//console.log(parser.people)
//console.log(parser._people)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
