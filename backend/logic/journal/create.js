// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const journalDao = require("../../dao/journal");

// validator schema
const schema = require("../../schema/journal.json");

async function createJournal(req, res){
    // error management
    try {
        const journalData = req.body;

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
        // pass data to the DAO and send response
        const message = journalDao.create(journalData.name);
        console.log(message);
        res.send(message);
    }

    // catch other errors
    catch(error) {
        res.status(500).json({
            "message": error.message
        });
        console.log(error.message);
        console.log(typeof(req.body));
    }
}

module.exports = createJournal;
