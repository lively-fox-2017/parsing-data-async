"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = this._stringToDate(created_at);
  }

  _stringToDate (dateString) {
    //2012-04-21T01:57:17-07:00
    //console.log(dateString);
    let date = new Date(dateString);
    //console.log(Date.parse(dateString));
    return date;
    console.log(date.toISOString());
  }

  toString(){
    //1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00
    let result = '';
    result += `${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`;
    return result;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    //this._people = this._readFileSync();
    this._UpdatePeopleAsync()
  }

  _UpdatePeopleAsync() {
    fs.readFile(this._file, 'utf8', (function(err, data){
      let arrOfStr = this._strToArray(data);
      let obj = this._arrayOfStringToArrOfObj(arrOfStr);
      this._people = obj;
      //console.log(this._people);
    }).bind(this));
  }

  _readFileSync(){
    return fs.readFileSync(this._file, 'utf8')
  }

  _strToArray (str) {
    let tampunganExistingData = str;
    let arr = tampunganExistingData.split('\n')
    arr.shift();
    return arr;
  }

  _arrayOfStringToArrOfObj (arrIn){
    let arr = arrIn;
    let tempArr = [];
    let result = [];
    let person = new Person();
    let id, first_name, last_name, email, phone, created_at;
    for (let str of arr) {
      //dari string , split per ','
      tempArr = str.split(',');
      id = tempArr[0];
      first_name = tempArr[1];
      last_name = tempArr[2];
      email = tempArr[3];
      phone = tempArr[4];
      created_at = tempArr[5];
      person = new Person(id, first_name, last_name, email, phone, created_at)
      result.push(person);

    }
    result.pop();
    return result;
  }

  get people() {
    return this._people
  }

  addPerson(person) {
    person.id = this._people.length;
    this._people.push(person);
  }

  save(){
    let result = 'id,first_name,last_name,email,phone,created_at\n'
    for (let person in this._people) {
      result+=this._people[person].id+',';
      result+=this._people[person].first_name+',';
      result+=this._people[person].last_name+',';
      result+=this._people[person].email+',';
      result+=this._people[person].phone+',';
      result+=this._people[person].created_at.toISOString()+'\n';
    }
    //result +=  this._people.join('\n')
    fs.writeFileSync(this._file, result);
  }

}

let parser = new PersonParser('people.csv')
//let asd = new Date();

//parser.save()
//parser.addPerson(new Person(1, 'rasyid', 'hakim', 'rasyid.xyz@gmail.com', '0123123', 'datestring'));
//console.log(parser.people);

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
//
// const fs = require('fs');
//
// fs.readFile('people.csv', 'utf8', function(err,res){
//   //console.log(res);
//   testChObj()
// })
//
// //pass the data outside
//
// function testChObj(obj){
//   obj.name = 'sesudah';
// }
// obj={};
// obj.name='sebelum';
// testChObj(obj)
// console.log(obj);
// //buat parser kosong
// //run read file
// //read file beres modify
