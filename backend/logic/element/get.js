// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const elementDao = require("../../dao/element");

// validator schema
const schema = {"type": "string"};

async function getJournal(req, res){
    // error management
    try {
        const journalID = req.query.pid;
        const elementID = req.query.eid;

        // validation
        const valid = ajv.validate(schema, journalID) && ajv.validate(schema, elementID);
        if(!valid){
            res.status(400).json({
                "code": "dToInNotValid",
                "message": "Journal ID is not valid!",
                "validationError": ajv.errors
            });
            return;
        }
        res.send(elementDao.get(journalID, elementID));
    }

    catch(error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

module.exports = getJournal;
