"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this._id = id;
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  bacaFile (callback) {
    // Method untuk membaca file secara async
    fs.readFile(this._file, 'UTF-8', (err, data) => {
      if (err) {
        console.log('Data tidak terbaca')
      } else {
        let person = data.split(/\n/)
        for (let i = 1; i < person.length; i++) {
          var dataOrang = person[i].split(',');
          dataOrang[5] = new Date(dataOrang[5])
          var orang = new Person(dataOrang[0], dataOrang[1], dataOrang[2], dataOrang[3], dataOrang[4], dataOrang[5])
          this._people.push(orang)
        }
        callback()
      }
    })
  }

  get people() {
    return { size: this._people.length -1, file: this._file}
  }

  addPerson(person) {
    // Method untuk menambah data orang
    this.save(person)
  }

  save(person){
    // Method untuk menambah data orang ke dalam file csv
    fs.appendFile('people.csv', person+'\n', 'UTF-8', (err)=>{
      if (err){
        console.log(`Ada error di ${err}`)
      } else {
        console.log('Sudah updated')
      }
    })
  }

}

let parser = new PersonParser('people.csv')

// yang kedua beres
parser.bacaFile(()=> {
  console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)

})

// Pertama kali beres
parser.addPerson('202,Hari,Bernard,bustloop@aqua.com,1-878-234-7173,2012-05-10T03:53:40-08:00')



