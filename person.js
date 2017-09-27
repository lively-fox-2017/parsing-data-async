"use strict"

class Person {
    constructor(firstName, lastName, email, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.dateCreated = new Date().toUTCString();
    }
}

module.exports = Person;