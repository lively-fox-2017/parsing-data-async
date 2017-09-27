"use strict"
const faker = require('faker');
const Person = require('./person.js');

class FakePersonFactory {
    static create() {
        const randFirstName = faker.name.firstName();
        const randLastName = faker.name.lastName();
        const randEmail = faker.internet.email();
        const randPhone = faker.phone.phoneNumberFormat(2);
        return new Person(randFirstName, randLastName, randEmail, randPhone);
    }
}

module.exports = FakePersonFactory;