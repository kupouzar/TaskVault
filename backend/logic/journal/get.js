// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const journalDao = require("../../dao/journal");

// validator schema
const schema = {"type": "string"};

async function getJournal(req, res){
    // error management
    try {
        const journalID = req.query.id;

        // validation
        const valid = ajv.validate(schema, journalID);
        if(!valid){
            res.status(400).json({
                "code": "dToInNotValid",
                "message": "Journal ID is not valid!",
                "validationError": ajv.errors
            });
            return;
        }
        res.send(journalDao.get(journalID));
    }

    catch(error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

module.exports = getJournal;
