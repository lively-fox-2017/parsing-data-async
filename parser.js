'use strict'
var fs = require('fs')
class Person {
  constructor(data) {
    this.data = data
    this.hasil = {};
  }

 converter(data) {
    // var arr = []
  let colName = ['id', 'first_name', 'last_name', 'email', 'phone', 'created_at']
  var temp = []
  // console.log(data)
  var object = {};
  for (var i = 0; i < this.data.length-1; i++) {
    object[colName[i]] = this.data[i]
  }
  var newDate = new Date(this.data[5])
  object[colName[5]] = newDate
  this.hasil = object;
  return this.hasil
  }
}

class PersonParser {

 constructor(file) {
    this._file = file
    this._people = [];
    this.nambah = []
  }

 get people() {
    return {size:this._people.length, data: this._people
    }
  }

 addPerson(personArr) {
  let tambah = personArr
  this.save(personArr)
  }
  
 person(cb) {
   fs.readFile('people.csv', 'utf8', (err,data) => {
    let arr = []
    let temp = []
    if (err) {
        throw err;
   }
    arr.push(data.split(/\n/).map(function(a){return a.split(',')})) 
    let manusia = []
    for (var i=1; i<arr[0].length; i++) {
      let initPerson = new Person(arr[0][i]);
      manusia.push(initPerson);
    } 
    this._people = manusia
    cb(manusia)
  })
 }

 save(param) {
  fs.appendFile('./people.csv', param + "\n", 'utf8', (err) => {
    if (err) throw err
      console.log('success')
  })
 }

}
let parser = new PersonParser('people.csv');
parser.person(() => {
  // for (var i=0; i<parser._people.length; i++) {
  //   console.log(parser._people[i])
  // }
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
}) 
// parser.person()
console.log("halo")
// parser.addPerson(['201','Bani','Brondongs','brondo@quam.com','1-666-999-7173','2013-02-9T03:53:40-07:00'])