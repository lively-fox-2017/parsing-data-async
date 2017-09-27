"use strict"
let fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
    this._person = []
  }
  get people() {
    return this._people
  }
  get file(){
    return this._file
  }
  readPerson(data){
    let arr_person = data.split('\n')
    for(let i = 1;i < arr_person.length;i++){
      let col_person = arr_person[i].split(',')
      let objPerson = new Person(col_person[0], col_person[1], col_person[2], col_person[3], col_person[4], col_person[4])
      this._person.push(objPerson)
    }
    return this._people = {size:this._person.length}    
  }
  addPerson(first_name, last_name, email, phone) {
    let id = this._person.length+1
    let created_at = new Date(); 
    let str = `\n${id},${first_name},${last_name},${email},${phone},${created_at}`;
    let objPerson = new Person(id,first_name,last_name,email,phone,created_at)
    this._person.push(objPerson);
    this._people['size'] = parseInt(this._people['size'])+1
    fs.appendFile(this._file, str, (err) => {
      if (err) throw err;
      console.log(`Data ${this._file} berhasil ditambahkan!`);
    });
  }
}
let parser = new PersonParser('people.csv')
fs.readFile('people.csv', 'utf-8', (err, data) => {
  if (err) throw err;
  parser.readPerson(data)
  parser.addPerson('Nurkholis', 'Elbazar', 'cholis.elbazar@gmail.com', '081317452255')
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
});