import $ = require('jquery');

function index(person: string) {
    return "Hello, " + person;
}

$('body').append(index('alskjdlfkaj'));