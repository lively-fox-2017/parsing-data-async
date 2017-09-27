"use strict"

let fs = require("fs");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._people = [];
  }

  readInput(callback){
    fs.readFile("people2.csv","utf8",function(err,data){
      if(err){
        console.log("data gagal diambil")
      }
      else{
        let result = data.split("\n");
        let arr = [];
        for(var i = 0; i < result.length-1; i++){
          arr.push(result[i].split(","))
        }
        for(var i = 1; i < arr.length; i++){
          let obj = new Person(arr[i][0],arr[i][1],arr[i][2],arr[i][3],arr[i][4],new Date(arr[i][5]));
          this._people.push(obj);
        }
      }
      callback()
    }.bind(this));
  }

  get people() {
    return this._people
  }

  addPerson(newObj) {
    this._people.push(newObj);
  }

  save(){
    let str = "id,first_name,last_name,email,phone,created_at" + "\n";
    for(var i = 0; i < this.people.length; i++){
      str += this.people[i].id + ","
      str += this.people[i].first_name + ","
      str += this.people[i].last_name + ","
      str += this.people[i].email + ","
      str += this.people[i].phone + ","
      str += this.people[i].created_at.toISOString() + "\n";
    }
    fs.writeFile("people2.csv",str,function(err){
      if(err){
        console.log("file save error");
      }
      else{
        console.log("this file has been save")
      }
    });
  }
}

let parser = new PersonParser('people.csv')
parser.readInput(function (){
  var today = new Date();
  parser.addPerson(new Person(201,"albert","agung","abc@abc.com","01823124",today));
  console.log(parser._people);
  parser.save()
  console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
})
