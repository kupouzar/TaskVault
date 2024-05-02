// ajv validator
const Ajv = require("ajv");
const ajv = new Ajv();

// bodyParser
const bodyParser = require("body-parser");

// data access object
const elementDao = require("../../dao/element");

// validator schema
const schema = require("../../schema/element.json");

async function updateElement(req, res){
    // error management
    try {
        let elementData = req.body;

        // validation
        const valid = ajv.validate(schema, elementData);
        console.log(elementData);
        if(!valid){
            res.status(400).json({
                "code": "dToInNotValid",
                "message": "Element data is not valid!",
                "validationError": ajv.errors
            });
            return;
        }
        const message = elementDao.update(elementData);
        console.log(message);
        res.send(message);
    }

    catch(error) {
        res.status(500).json({
            "message": error.message
        });
    }
}

module.exports = updateElement;
