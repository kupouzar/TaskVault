const fs = require("fs");
const uuid = require("uuid");
const db = require("./db");

let data = db.load();

function create(journalName) {
    // push the new journal into data
    const newJournal = {
        "name": journalName,
        "id": uuid.v1(),
        "content": []
      }
    data.taskvault.journals.push(newJournal);
    db.save(data);
    return {
        code: "journalCreated",
        message: `Journal \'${journalName}\' was created.`
    };
}

function update(journalData) {
    data = db.load();
    var journalToUpdate = data.taskvault.journals.find(j => j.id === journalData.id);
    // if not found
    if(journalToUpdate === undefined) {
        const message = json({
            code: "journalNotFound",
            message: `Journal id=\'${journalData.id}\' not found, journal not updated.`
        });
        return message;
    } else {
        // update the journal with the newly received journal data
        journalToUpdate = journalData;
        const message = json({
            code: "journalUpdated",
            message: `Journal id=\'${id}\' updated.`
        });
        db.save();
        return message;
    }
}

function remove(journalID){
    data = db.load();
    const id = journalID;
    const indexToSplice = data.taskvault.journals.findIndex(j => j.id === id);
    if(indexToSplice > -1) {
        data.taskvault.journals.splice(indexToSplice, 1);
        const message = JSON.stringify({
            code: "journalDeleted",
            message: `Journal id=\'${id}\' removed.`
        });
        db.save(data);
        return message;
    } else {
        const message = JSON.stringify({
            code: "journalNotFound",
            message: `Journal id=\'${id}\' not found.`
        });
        return message;
    }
}

function get(journalID) {
    data = db.load();
    console.log(data);
    const id = journalID;
    var journal = data.taskvault.journals.find(j => j.id === id);
    if(journal === undefined) {
        const message = json({
            code: "journalNotFound",
            message: `Journal id=\'${journalData.id}\' not found.`
        });
        return message;
    } else {
        return journal;
    }
}

function list(){
    data = db.load();
    let journalList = [];
    for(const journal of data.taskvault.journals) {
        const {content, ...journalEntry} = journal;
        journalList.push(journalEntry);
    }
    return journalList;
}

module.exports = {create, update, remove, get, list};
