"use strict"
const PersonParser = require('./personParser.js');
const FakePersonFactory = require('./fakePersonFactory.js');


let parser = new PersonParser('people.csv');

// parser read will pass the PersonParser's instance object (parser)
// as its callback argument
parser.read(() => {
    // log the number of people in the parser object
    console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);

    // create new fake person
    let fakePerson = FakePersonFactory.create();

    // add fake person to parser object;
    parser.addPerson(fakePerson);

    // write to file
    parser.save(() => {
        // log the number of people after the new person is saved
        console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
    });
})

