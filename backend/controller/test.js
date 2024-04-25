const express = require("express");
const fs = require("fs");
const router = express.Router();
const testCreateJournalForm = fs.readFileSync("./test/createJournal.html", 'utf8');
const testRemoveJournalForm = fs.readFileSync("./test/removeJournal.html", 'utf8');
const testUpdateJournalForm = fs.readFileSync("./test/updateJournal.html", 'utf8');
const testCreateElementForm = fs.readFileSync("./test/createElement.html", 'utf8');
const testRemoveElementForm = fs.readFileSync("./test/removeElement.html", 'utf8');
const testUpdateElementForm = fs.readFileSync("./test/updateElement.html", 'utf8');

// test logics
function testCreateJournal(req, res){
    res.send(testCreateJournalForm);
}

function testRemoveJournal(req, res){
    res.send(testRemoveJournalForm);
}

function testUpdateJournal(req, res){
    res.send(testUpdateJournalForm);
}


function testCreateElement(req, res){
    res.send(testCreateElementForm);
}

function testRemoveElement(req, res){
    res.send(testRemoveElementForm);
}

function testUpdateElement(req, res){
    res.send(testUpdateElementForm);
}

// routing
router.get("/journal/create", testCreateJournal);
router.get("/journal/remove", testRemoveJournal);
router.get("/journal/update", testUpdateJournal);

router.get("/element/create", testCreateElement);
router.get("/element/remove", testRemoveElement);
router.get("/element/update", testUpdateElement);

module.exports = router;