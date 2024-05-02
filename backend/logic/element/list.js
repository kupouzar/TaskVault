// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const elementDao = require("../../dao/element");

async function listElement(req, res){
    const parentJournalID = req.query.parentJournalID;
    res.send(elementDao.list(parentJournalID));
}

module.exports = listElement;
