// "use strict"
const fs=require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id=id;
    this.first_name=first_name;
    this.last_name=last_name;
    this.email=email;
    this.phone=phone;
    this.created_at=created_at

  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }
  bacaFile(callback){
    let self=this
    fs.readFile(this._file,"utf-8",function(err,data){
      // return data;
      // console.log(data)
      if(!err){
        let pisah= data.split('\n')
        // console.log(pisah)
        for (let i = 1; i < pisah.length;i++){
          let value = pisah[i].split(',');
          let obj = new Person(value[0],value[1],value[2],value[3],value[4],value[5]);
          self._people.push(obj)
        }
        callback()
      }
    })
  }
  addPerson(id,first_name,last_name,email,phone,created_at) {
    let people=  new Person(id,first_name,last_name,email,phone,created_at)
    this._people.push(people)
  }
  //-------------------tambah data--------------------

  tambah(){
    let dataBaru=['id,first_name,last_name,email,phone,created_at']
    //menampung apapun yg akan dipanggil yg akan diisinya sesuaikan
    for (var i = 0; i < this._people.length; i++) {
      // console.log(dataBaru);
      let masukData=`${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
      dataBaru.push(masukData)
    }
    fs.writeFile('people.csv',dataBaru.join('\n'),function(err,data){
      if(!err){
        console.log('Data Masuk!');
      }
    })
  }
}

let parser = new PersonParser('people.csv')
parser.bacaFile(function(){
  parser.addPerson('208','Muhammad','Chandra','cbuwana@gmail.com','32156+49873216', new Date())
  parser.tambah()
  console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
})
