var express = require("express");
var app = express();
const port = 8080;
const connection = require("./database.js");
var Validator = require("jsonschema").Validator;
var v = new Validator();
var cors = require("cors");
app.use(cors());

app.use(express.static("frontend/build"));

app.use(express.json());

app.get("/words", async (req, res) => {
  let result = await connection.findAll();
  res.send(result);
});

app.get("/words/tag/:tag([0-9]+)", async (req, res) => {
  let id = parseInt(req.params.tag);
  try {
    let temp = await connection.findByTag(id);
    if (temp.length < 1) {
      res.statusCode = 404;
      res.end();
    } else {
      res.send(temp);
    }
  } catch {
    res.statusCode = 404;
    res.end();
  }
});

app.get("/words/:id([0-9]+)", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let temp = await connection.findById(id);
    if (temp.length < 1) {
      res.statusCode = 404;
      res.end();
    } else {
      var tmp = JSON.parse(temp);
      res.send(tmp);
    }
  } catch {
    res.statusCode = 404;
    res.end();
  }
});

app.post("/words", async (req, res) => {
  console.log(req.body);
  var wordsschema = {
    id: "words",
    type: "object",
    properties: {
      finnish: { type: "string", maxLength: 20 },
      english: { type: "string", maxLength: 20 },
    },
    required: ["finnish", "english"],
  };
  if (v.validate(req.body, wordsschema).valid) {
    let id = await connection.save(req.body);
    res.statusCode = 201;
    let words = {
      id: id,
      finnish: req.body.finnish,
      english: req.body.english,
    };
    res.send(words);
  } else {
    res.statusCode = 400;
    res.end();
  }
});

app.delete("/words/:id([0-9]+)", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let rows = await connection.deleteById(id);
    if (rows == 0) {
      res.statusCode = 404;
    } else {
      res.statusCode = 204;
    }
  } catch {
    res.statusCode = 404;
  } finally {
    res.end();
  }
});

app.get("/tags", async (req, res) => {
  let result = await connection.findTags();
  res.send(result);
});

app.delete("/tag/:id([0-9]+)", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let rows = await connection.deleteTag(id);
    if (rows == 0) {
      res.statusCode = 404;
    } else {
      res.statusCode = 204;
    }
  } catch {
    res.statusCode = 404;
  } finally {
    res.end();
  }
});

app.post("/tag", async (req, res) => {
  console.log(req.body);
  var tagschema = {
    id: "tag",
    type: "object",
    properties: {
      tag: { type: "string", maxLength: 20 },
    },
    required: ["tag"],
  };
  if (v.validate(req.body, tagschema).valid) {
    let id = await connection.save(req.body);
    res.statusCode = 201;
    let tag = {
      id: id,
      tag: req.body.tag,
    };
    res.send(tag);
  } else {
    res.statusCode = 400;
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
