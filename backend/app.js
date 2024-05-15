// modules
const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

const journalController = require("./controller/journal");
const testController = require("./controller/test");
const elementController = require("./controller/element");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("TaskVault Backend Server");
});

app.use("/journal", journalController);
app.use("/test", testController);
app.use("/element", elementController);

app.listen(port, () => {
    console.log(`TaskVault server listening at http://localhost:${port}`)
});