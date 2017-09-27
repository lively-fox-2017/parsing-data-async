"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id,first_name,last_name,email,phone,created_at
  constructor(id, fn, ln, email, phone, createdAt){
    this.id = id
    this.firstName = fn
    this.lastName = ln
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._arr = []
  }

  get people() {
    let obj = {
      people: this._people,
      size: this._people.length
    }
    return obj
  }

  readFile(cb){
    fs.readFile(this._file, function(err, data){
      data = data.toString()
      data = data.split('\n')
      if(data){
        callback(data)
      }
    })
  }

  getFile(){
    let self = this
    this.readFile(function(data){
      let dis
      for(let i = 0; i < data.length; i++){
        let conSplit = data[i].split(',')
        dis = new Person(conSplit[0], conSplit[1], conSplit[2], conSplit[3], conSplit[4], conSplit[5])
        self._people.push(dis)
      }
    })
  }

  addPerson(addPer) {
    let add = addPer
    this._arr = add
    this._people.push(add)
    return this._arr
  }

  save(){
    fs.appendFile('./people.csv', this._arr + '\n', function(err){
      if(!err){
        console.log('file is appended')
      }
    })
  }

}

class Dates {

  date(){
    let d = new Date()
    return d
  }

}

let date = new Dates()
let parser = new PersonParser('people.csv')
console.log(parser.addPerson(['203','Tadaaam','Brondongs','brondo@quam.com','1-666-999-7173',`${date.date()}`]))

parser.save()
console.log(`There are ${parser.people.size} people.`)
