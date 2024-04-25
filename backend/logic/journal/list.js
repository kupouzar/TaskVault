// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const journalDao = require("../../dao/journal");

async function listJournal(req, res){
    res.send(journalDao.list());
}

module.exports = listJournal;
