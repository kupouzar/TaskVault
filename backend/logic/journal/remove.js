// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const journalDao = require("../../dao/journal");

// validator schema
const schema = {"type": "string"};

async function removeJournal(req, res){
    // error management
    try {
        const journalID = req.body.id;

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
        const message = journalDao.remove(journalID);
        console.log(message);
        res.send(message);
    }

    catch(error) {
        const errorMessage = {
            "message": error.message
        }
        console.error(errorMessage, 500);
        res.status(500).json(errorMessage);
    }
}

module.exports = removeJournal;
