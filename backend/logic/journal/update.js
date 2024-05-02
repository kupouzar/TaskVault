// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const journalDao = require("../../dao/journal");

// validator schema
const schema = require("../../schema/journal.json");

async function updateJournal(req, res){
    // error management
    try {
        let journalData = req.body.journal;

        // validation
        const valid = ajv.validate(schema, journalData);
        if(!valid){
            res.status(400).json({
                "code": "dToInNotValid",
                "message": "Journal data is not valid!",
                "validationError": ajv.errors
            });
            return;
        }
        res.send(journalDao.update(journalData));
    }

    catch(error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

module.exports = updateJournal;
