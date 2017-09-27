"use strict"
const fs=require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id=id,
    this.first_name=first_name,
    this.last_name=last_name,
    this.email=email,
    this.phone=phone,
    this.created_at=created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file,
    this._people,
    this._newPerson=[];
  }
  readData(cb){
    fs.readFile(this._file,'utf8',(err,data)=>{
      if (err) {
        throw err;
      }
      let arr=data.split(/\n/);
      let result=arr.map(data=>{
              let temp=data.split(','),person=new Person(temp[0],temp[1],temp[2],temp[3],temp[4],Date(temp[5]))
              return person;
            })
      // this._people=arr.map(data=>{
      //         let temp=data.split(','),person=new Person(temp[0],temp[1],temp[2],temp[3],temp[4],Date(temp[5]))
      //         return person;
      //       })

      cb(err,result);
    });
  }

  get people() {
    return {size:this._people.length,data:this._file};
  }
  get file(){
    return this._file;
  }
  addPerson(id,first_name,last_name,email,phone,created_at) {
    this._newPerson.push(id,first_name,last_name,email,phone,created_at);
  }

  savePerson(){
    // fs.appendFileSync(this._file,this._newPerson+'\n')
    fs.appendFile(this._file,this._newPerson+'\n',(err)=>{
      if (err) {
        throw err
      } else {
        console.log('data berhasil ditambahkan');
      }
    })
  }

}

let parser = new PersonParser('people.csv');
parser.readData((err,data)=>{
  if (!err) {
    // console.log(data);
    parser._people=data;
    console.log(parser._people);
    console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
  }
});
// parser.addPerson('210','Lani jos gandos','Rollins','blandit@quam.com','1-633-389-7173','28/08/2017');
// parser.savePerson();
