const fs = require("fs");
const express = require("express");
const util = require("util");
const app = express();

const readFile = util.promisify(fs.readFile);

app.get("/", (req, res) => {
    readFile("./blogData.json").then((data) => {
        res.json(JSON.parse(data));
    });
});

app.get("/blog/:id", (req, res) => {
    const id = Number(req.params.id);
    readFile("./blogData.json").then((data) => {
        const dataBlog = JSON.parse(data);
        dataBlog[id] ? res.json(dataBlog[id]) : res.json({});
    });
});

app.listen("3000", () =>{
    console.log("listening on port 3000");
});
