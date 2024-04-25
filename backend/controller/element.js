const express = require("express");
const router = express.Router();

// business logics
const listElement = require("../logic/element/list");
const createElement = require("../logic/element/create");
const getElement = require("../logic/element/get");
const removeElement = require("../logic/element/remove");
const updateElement = require("../logic/element/update");

// routing
router.get("/list", listElement);
router.get("/get", getElement);
router.post("/create", createElement);
router.post("/delete", removeElement);
router.post("/update", updateElement);

module.exports = router;
