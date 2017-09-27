"use strict"

const fs = require('fs');

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

  constructor(fileName) {
    this._file = fileName
    this._people = []

  }


  getData(cb) {
    fs.readFile(this._file, 'utf8', (err, data) => {
      if (err)
        throw err;
      let arr = data.toString().split("\n")
      for (let r = 1; r < arr.length - 1; r++) {
        let arrRow = arr[r].split(',')
        let person = new Person(Number(arrRow[0]), arrRow[1], arrRow[2], arrRow[3], arrRow[4], arrRow[5])
        this._people.push(person)
      }
      cb()
    })
  }


  get people() {
    // let obj = {}
    // obj.size = this._size
    // return obj
    return this._people
  }

  get size() {
    return this._people.length
  }

  get file() {
    return this._file
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
  }

  save(newFile) {
    let dataRow = 'id,first_name,last_name,email,phone,created_at' //create header
    fs.writeFileSync(newFile, dataRow + '\n')

    for (let i = 0; i < this._people.length; i++) {
      let arrRow = []
      // let nDate = new Date(this.people[i]['created_at'])

      arrRow.push(this.people[i]['id'])
      arrRow.push(this.people[i]['first_name'])
      arrRow.push(this.people[i]['last_name'])
      arrRow.push(this.people[i]['email'])
      arrRow.push(this.people[i]['phone'])
      arrRow.push(this.people[i]['created_at']) //change date to string format
      dataRow = arrRow.join(',')
      let gantiBaris = (i == this._people.length - 1) ? '' : '\n' //every line change line except last one
      fs.appendFileSync(newFile, dataRow + gantiBaris)
    }
    this._file = newFile
  }

}

let parser = new PersonParser('people.csv')

parser.getData(() => {
  parser.addPerson(new Person(parser.size + 1, 'nur', 'ach', 'adaw@9.com', '1-633-389-7173', '2012-05-10T03:53:40-07:00'))
  parser.save('peopleNew.csv');
  console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
})
console.log('test');

// console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
//
// parser.addPerson(new Person(parser.size + 1, 'nur', 'ach', 'adaw@9.com', '1-633-389-7173', '2012-05-10T03:53:40-07:00'))
//
// parser.save('peopleNew.csv')
//
// console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
