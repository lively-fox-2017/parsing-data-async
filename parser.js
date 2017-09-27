"use strict"

const fs = require('fs');

class Person {
	// Look at the above CSV file
	// What attributes should a Person object have?
	constructor(first_name, last_name, email, phone){
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.phone = phone;
		this.created_at = new Date();
	  }
	}

class PersonParser {
	constructor(file) {
		this._file = file;
		this._people = null;
		this._add = "";
	}
	
	bacadanTambahFile(personBaru){
		let that = this;
		fs.readFile(this._file, function (err, data){
			if (err) {
				console.log("Gagal Baca Data");
			} else {
				data = data.toString().split("\n");
				
				that.setPeople(data);
				that.addPerson(personBaru);
			}
		});
	}
		  
	setPeople(data) {
		let arrPeople = [];
		for (let i = 1; i < data.length; i++){
			let peoplePecah = data[i].split(",");
			arrPeople.push({id:peoplePecah[0], first_name:peoplePecah[1], last_name:peoplePecah[2], email:peoplePecah[3], phone:peoplePecah[4], created_at:peoplePecah[5]});
		}
			
		this._people = arrPeople;
	}

	get people() {
		return this._people
	}

	addPerson(personBaru) {
		let id = this._people.length-1 + 1;
		let sebaris = id + "," + personBaru.first_name + "," + personBaru.last_name + "," + personBaru.email + "," + personBaru.phone + "," + personBaru.created_at.toISOString()+";\n";
			
		this._add += sebaris;
			
		let kata = this._add.split(",");
		this._people.push({id:kata[0], first_name:kata[1], last_name:kata[2], email:kata[3], phone:kata[4], created_at:kata[5]});
			
		let addFile = fs.appendFile('people.csv', this._add, function (err){
			if(err){
				console.log("Gagal Tambah Data");
			}
		});
	}
}

let parser = new PersonParser("people.csv");
parser.bacadanTambahFile(new Person("redha", "putra", "putra.redha@gmail.com", "082123081949"));

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
