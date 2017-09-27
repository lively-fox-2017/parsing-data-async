"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email ,phone ,created_at){

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
    this.fs = require('fs')
    this.data = this._people
  }

  get people() {
    return this._people
  }

  addPerson() {}



  readData(){
    this.fs.readFile(this._file, 'utf8', (err, contents) => {
    // console.log(contents);
    });
  }

  parsingData(callback){
    
    this.fs.readFile(this._file, 'utf8', (err, contents) =>{
      let konten = contents.split('\n')
      let split = []
      let arrayCal = [] 
      if(err){
        throw err
        callback(err)
      }


      for(var i = 1; i < konten.length; i++){
        split.push(konten[i].split(','))
      }
      
      let arrHasil = []
      for(var i = 0; i < split.length; i++){
        arrHasil.push(new Person(split[i][0], split[i][1], split[i][2], split[i][3], split[i][4], new Date(split[i][5])))
      }
      // console.log(arrHasil)
      arrayCal.push(arrHasil)
      // console.log(this)
      this._people = arrayCal
      callback()
    })
  }


  
  simpan() {
    // console.log(this.people[200]);
    var tampung = "id,first_name,last_name,email,phone,created_at,\n";
    this.people.forEach(function (element) {
      tampung += element.id + ',';
      tampung += element.first_name + ',';
      tampung += element.last_name + ',';
      tampung += element.email + ',';
      tampung += element.phone + ',';
      tampung += element.created_at.toISOString() + ',';
      tampung += '\n';
    }, this);
    // console.log(tampung);
    fs.writeFile('people.csv', tampung, (err, tersimpan) => {
      if (err) {
        console.log('Data gagal di simpan');
      } else {
        console.log('Data berhasil di simpan');
      }
    });
  }
}



let parser = new PersonParser('people.csv')
let people = new Person();


console.log(parser.parsingData(function(){
  console.log(parser.people)
}))

// console.log(parser.parsingData())
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
