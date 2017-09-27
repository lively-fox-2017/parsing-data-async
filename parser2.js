"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
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

  tes(nama) {
    console.log("Hallooo", nama)
  }

  parse(callback) {
    var fs = require("fs")
    fs.readFile(this._file, 'utf8', (err, data) => {
      var arrData = data.split('\n')

      var arrHasil = []
      var arrObj = []

      for(var i = 0; i < arrData.length; i++) {
        arrHasil.push(arrData[i].split(','))
      }

      for(var i = 0; i < arrHasil.length; i++) {
        arrObj.push(new Person(arrHasil[i][0], arrHasil[i][1], arrHasil[i][2], arrHasil[i][3], arrHasil[i][4], new Date(arrHasil[i][5])))
      }
      // console.log(arrObj);
      this._people = arrObj
      callback(this._people)
    })
  }

  get people() {
    return this._people
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  save() {
    var str = 'id,first_name,last_name,email,phone,created_at'

    for(var i = 0; i < this._people.length; i++) {
      str = str + '\n' + this._people[i].id + ','
      str = str + this._people[i].first_name + ','
      str = str + this._people[i].last_name + ','
      str = str + this._people[i].email + ','
      str = str + this._people[i].phone + ','
      str = str + this._people[i].created_at
    }


    var fs = require("fs")
    fs.writeFileSync(this._file, str) //menulis file
  }

}

let parser = new PersonParser('people.csv')

parser.parse(function() {
  console.log(parser.people);
})
