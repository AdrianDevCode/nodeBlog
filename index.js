const fs = require("fs");
const express = require("express");
const util = require("util");
const bodyParser = require('body-parser');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

app.post("/blog/new", urlencodedParser, (req, res) => {
    readFile("./blogData.json").then((data) => {

        let dataBlog = JSON.parse(data);
        let newId = Object.keys(dataBlog).length + 1;
        let newPost = {
            id: newId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date: req.body.date,
            title: req.body.title,
            content: req.body.content
        };
        dataBlog[newId] = newPost;
        fs.writeFile("./blogData.json", JSON.stringify(dataBlog, null, ' '),() => {res.send(newPost);
        });
    });
});

app.listen("3000", () =>{
    console.log("listening on port 3000");
});
