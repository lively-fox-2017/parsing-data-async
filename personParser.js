"use strict"
const fs = require('fs');

class PersonParser {
    constructor(file) {
        this._file = file;
        this._people = null;
    }

    get people() {
        return this._people;
    }

    get file() {
        return this._file;
    }

    read(callback) {
        // retain the scope of this inside 'that' variable
        // so the callback could access it
        let that = this;
        const format = (err, data) => {
                if (err) throw err;

                const formatted = data
                                    .toString()
                                    .split('\n')
                                    .map(item => item.split(','));

                const header = formatted[0];
                const people = formatted
                                    .slice(1, formatted.length)
                                    .map(person => {
                                        person[5] = new Date(person[5]).toUTCString();
                                        return person;
                                    });

                that._header = header;
                that._people = people;
                console.log('Read done!');
                // passing the Class as the callback's argument
                callback(that);
        }

        const persons = fs.readFile(this._file, format);
    }

    addPerson(person) {
        const id = (Number(this._people.slice(-1)[0][0]) + 1).toString();
        const newPerson = [
                            id, 
                            person.firstName, 
                            person.lastName, 
                            person.email, 
                            person.phone, 
                            person.dateCreated
                        ];

        return this._people.push(newPerson);
    }

    save(callback) {
        let that = this;
        const formattedHeader = this._header.join(',') + '\n';
        const formattedPeople = this._people
                                            .map(person => {
                                                person[5] = new Date(person[5]).toISOString();
                                                return person.join(',');
                                            })
                                            .join('\n');
        const formatted = formattedHeader + formattedPeople;
        const showWriteMessage = err => {
            if (err) throw err;
            console.log('Save done!');
            // passing the Class as the callback's argument
            callback(that);
        }

        fs.writeFile(this._file, formatted, showWriteMessage);
    }
}

module.exports = PersonParser;
