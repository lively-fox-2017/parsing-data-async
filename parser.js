"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  readFile(callback) {
    // let tampung = this
    fs.readFile(this._file,'utf-8', (err,data) => {
      if (err) return callback(err)
      data = data.split('\n')
      for (let i = 1; i < data.length -1; i++) {
        let temp = data[i].split(',')
        let orang = new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5])
        this._people.push(orang)
      }
      callback()
    })
  }

  addPerson(tambahOrang) {
    let tambah = tambahOrang
    this.tambah = tambah

    return this.tambah
  }

  save() {
    fs.appendFile('people.csv', this.tambah, function(err) {
      if(err) throw err
      console.log('data saved!');
    })
  }

}

let parser = new PersonParser('people.csv')
parser.readFile((err) => {
  if(!err) {
      console.log(parser.people);
  } else {
    console.log("err");
  }

})
parser.addPerson(['123','Mamih','tes','tes@gmail.com','1-373-588-1689', new Date()])
parser.save()
// console.log(parser.people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
