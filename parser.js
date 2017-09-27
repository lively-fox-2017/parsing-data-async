"use strict"

class Person {
  ///Buat Object Person
  constructor(id,first_name,last_name,email,phone,created_at){
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

  addPerson(newData) {
    this._people.push(newData)
  }
  // untuk Membaca File dengan CallBack
  bacaFileAsync(callback){
    var fs = require('fs')
    let self = this;
    fs.readFile('people.csv','utf-8', function(err,data) {
      if(!err){
        let olahData = data.split('\n')
        for (var i = 1; i < olahData.length; i++) {
          let hasilData = olahData[i].split(',')
          let dataFinal = new Person(hasilData[0],hasilData[1],hasilData[2],hasilData[3],hasilData[4],hasilData[5])
            self._people.push(dataFinal)
        }
      } else {
        console.log('Gagal Baca File !');
      }
      callback()
    })
  }
  //Save Data Async
  saveFileAsync(){
    var fs = require('fs')
    fs.appendFile('people.csv', this._people,'utf8', function(err){
      if(!err){
        console.log('Data Has Been Save');
      } else {
        console.log('Data Rejected');
      }
    });
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson([201,'Hary','Nugraha Putra','harynugrahaputra.com','082112831235',new Date()]+'\n');
parser.saveFileAsync()
//karena di bacaFileAsync membutuhkan callback maka kita juga harus mendrive code dengan callback
parser.bacaFileAsync(() => {
  console.log(parser.people);
});
