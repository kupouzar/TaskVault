const fs = require("fs");
const uuid = require("uuid");
const db = require("./db");

let data = db.load();

function create(elementData) {
    // push the new element into data
    let newElement;
    if(elementData.type === "note") {
        newElement = {
            "name": elementData.name,
            "id": uuid.v1(),
            "parent": elementData.parent,
            "type": "note",
            "content": ""
        }
    } else {
        newElement = {
            "name": elementData.name,
            "id": uuid.v1(),
            "parent": elementData.parent,
            "type": "task",
            "due": "duedate",
            "content": ""
        }
    }
    // find parent and push the element into its contents
    let parentJournal = data.taskvault.journals.find(j => j.id === elementData.parent);
    parentJournal.content.push(newElement);
    db.save(data);
    return {
        code: "elementCreated",
        message: `Element \'${elementData.name}\' of journal id=\'${parentJournal.id}\' was created.`
    };
}

function update(journalData) {
    let journalToUpdate = data.taskvault.journals.find(j => j.id === journalData.id);
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
    let journalList = [];
    for(const journal of data.taskvault.journals) {
        const {content, ...journalEntry} = journal;
        journalList.push(journalEntry);
    }
    return journalList;
}

module.exports = {create, update, remove, get, list};
