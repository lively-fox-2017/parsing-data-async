"use strict"

const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  bacaFile(callback){
    let self = this;
    fs.readFile(this._file, 'utf8', (err, data)=>{
      let temp = []
      let data1 = data.split('\n')
      for (var i = 0; i < data1.length; i++) {
        let data2 = data1[i].split(',') // menghilangkan koma
        let person = new Person(data2[0],data2[1],data2[2],data2[3],data2[4],data2[5])
        temp.push(person)
      }
        self._people = temp
        // console.log(self._people);
        callback()
    })
  }

  get people() {
    return this._people
  }

  addPerson(people) {
    this.saveFile(people)
  }

  saveFile(people){
    fs.appendFile('people.csv', people+'\n', (err) => {
      if (!err){
        console.log('The file has been saved!');
      }
    });
  }

}

let parser = new PersonParser('people.csv')

// parser.bacaFile(()=>{
//   // console.log(parser.people);
// })
parser.addPerson(`201,Yonathan,Setiadi,kalibani.ka@gmail.com,1-314-890-5249,${new Date()}`)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
