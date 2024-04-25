const express = require("express");
const router = express.Router();

// business logics
const listJournal = require("../logic/journal/list");
const createJournal = require("../logic/journal/create");
const getJournal = require("../logic/journal/get");
const removeJournal = require("../logic/journal/remove");
const updateJournal = require("../logic/journal/update");

// routing
router.get("/list", listJournal);
router.get("/get", getJournal);
router.post("/create", createJournal);
router.post("/remove", removeJournal);
router.post("/update", updateJournal);

module.exports = router;