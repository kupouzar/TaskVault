const fs = require("fs");
const uuid = require("uuid");
const db = require("./db");

let data = db.load();

function create(elementData) {
    data = db.load();
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
        message: `Element \'${elementData.name}\' of journal id=\'${parentJournal.id}\' has been created.`
    };
}

function update(elementData) {
    data = db.load();
    let parentJournalIndex = data.taskvault.journals.findIndex(j => j.id === elementData.parent);
    // if not found
    if(parentJournalIndex === -1) {
        const message = JSON.stringify({
            code: "journalNotFound",
            message: `Journal id=\'${parentJournal.id}\' not found.`
        });
        return message;
    } else {
        // locate the element inside its parent journal
        let elementIndex = data.taskvault.journals[parentJournalIndex].content.findIndex(e => e.id === elementData.id);
        if(elementIndex === -1) {
            const message = JSON.stringify({
                code: "elementNotFound",
                message: `Element id=\'${elementData.id}\' of journal id= \'${elementData.parent}\'not found.`
            });
            return message;
        }
        // update the element with the newly received data
        data.taskvault.journals[parentJournalIndex].content[elementIndex] = elementData;
        const message = JSON.stringify({
            code: "elementUpdated",
            message: `Element \'${elementData.name}\' of journal id=\'${elementData.parent}\' has been updated.`
        });
        db.save(data);
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

function get(journalID, elementID) {
    data = db.load();
    const id = journalID;
    const eid = elementID;
    let journal = data.taskvault.journals.find(j => j.id === id);
    console.log(journal);
    let element = journal.content.find(e => e.id === eid);
    if(journal === undefined || element === undefined) {
        const message = JSON.stringify({
            code: "elementNotFound",
            message: `Element id=\'${elementID}\' of journal id=\'${journalData.id}\' not found.`
        });
        return message;
    } else {
        return element;
    }
}

function list(parentJournalID){
    parentJournal = data.taskvault.journals.find(j => j.id === parentJournalID);
    if(parentJournal === undefined) {
        const message = JSON.stringify({
            code: "parentJournalNotFound",
            message: `Parent journal id=\'${parentJournalID}\' not found.`
        });
        console.log(message);
        return message;
    }
    let elementList = [];
    for(const element of parentJournal.content) {
        elementList.push(element);
    }
    return elementList;
}

module.exports = {create, update, remove, get, list};
