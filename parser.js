"use strict"
let fs = require('fs')

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(content) {
        this._id = content['id']
        this._first_name = content['first_name']
        this._last_name = content['last_name']
        this._email = content['email']
        this._phone = content['phone']
        this._created_at = content['created_at']
    }
}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = []
    }

    get people() {
        //console.log(this._people)
        return this._people
    }

    addPerson(add) {
        //console.log(add)
        this._people.push(add)
    }

    save() {
        let resultSave = []

        //console.log(this._people[200])

        for (let i = 0; i < this._people.length; i++) {
            //console.log('=======' + this._people[i]._first_name)
            resultSave += this._people[i]._id + ','
            resultSave += this._people[i]._first_name + ','
            resultSave += this._people[i]._last_name + ','
            resultSave += this._people[i]._email + ','
            resultSave += this._people[i]._phone + ','
            resultSave += this._people[i]._created_at + '\n'
        }

        console.log(resultSave)
        fs.writeFile('people.csv', resultSave, 'utf8', function(err, data) {
            if (err) console.log(err)
            console.log('The file has been saved!');
        });


        // fs.writeFile('testWrite.csv', resultSave, 'utf8', (err, data) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // })

    }

    parsing(callback) {
        fs.readFile(this._file, 'utf8', (err, data) => {
            if (err) {
                console.log('data e**o*')
                callback(err)
            } else {
                let pecahEnter = data.split('\n')

                //let dataObj = []
                //console.log(pecahEnter.length)
                for (let i = 1; i < pecahEnter.length; i++) {
                    let pecahLagiKoma = pecahEnter[i].split(',')
                        //console.log(pecahLagiKoma)
                    let pecahObj = new Person({
                        id: pecahLagiKoma[0],
                        first_name: pecahLagiKoma[1],
                        last_name: pecahLagiKoma[2],
                        email: pecahLagiKoma[3],
                        phone: pecahLagiKoma[4],
                        created_at: pecahLagiKoma[5],
                    })
                    this._people.push(pecahObj)
                }
                callback(null)
            }
            //console.log(this._people)
        })

    }


}

let parser = new PersonParser('people.csv')
let input = new Person({
    id: 201,
    first_name: 'gogon',
    last_name: 'asdf',
    email: 'gogon@gmail.com',
    phone: 987654321,
    created_at: new Date(),
})

parser.parsing((err) => {
    //     // if (!err) {
    //     //     //console.log(parser.people)
    //     // parser.people

    parser.addPerson(input)
    parser.save()
        //     console.log("----------------------")
        //         //         //console.log(parser.people[200])
        //         // }
})

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)