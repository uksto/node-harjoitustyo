var express = require("express");
var app = express();
const path = require("path");
const connection = require("./database.js");
var Validator = require("jsonschema").Validator;
var v = new Validator();
var cors = require("cors");

/**
 * Enable cors.
 */
app.use(cors());

/**
 * Sets frontend/build to use.
 */
app.use(express.static(path.join(__dirname, "frontend/build")));

/**
 * Enables json upload to api.
 */
app.use(express.json());

/**
 * Function to get all words
 */
app.get("/words", async (req, res) => {
  let result = await connection.findAll();
  res.send(result);
});

/**
 * Function to get all words with specific tag
 */
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

/**
 * Function to get a word with specific id
 */
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

/**
 * Function to post a word to database
 */
app.post("/words", async (req, res) => {
  req.body.tag = parseInt(req.body.tag);
  var wordsschema = {
    id: "words",
    type: "object",
    properties: {
      finnish: { type: "string", maxLength: 20 },
      english: { type: "string", maxLength: 20 },
      tag: { type: "integer", minimum: 1 },
    },
    required: ["finnish", "english", "tag"],
  };
  if (v.validate(req.body, wordsschema).valid) {
    let id = await connection.save(req.body);
    res.statusCode = 201;
    let words = {
      id: id,
      finnish: req.body.finnish,
      english: req.body.english,
      tag: req.body.tag,
    };
    res.send(words);
  } else {
    res.statusCode = 400;
    res.end();
  }
});

/**
 * Function to delete a word with specific id
 */
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

/**
 * Function to get all tags
 */
app.get("/tags", async (req, res) => {
  let result = await connection.findTags();
  res.send(result);
});

/**
 * Function to delete a tag with specific id
 */
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

/**
 * Function to post a tag to database
 */
app.post("/tag", async (req, res) => {
  var tagschema = {
    id: "tag",
    type: "object",
    properties: {
      tag: { type: "string", maxLength: 20 },
    },
    required: ["tag"],
  };
  if (v.validate(req.body, tagschema).valid) {
    let id = await connection.saveTag(req.body);
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

/**
 * Function to edit a tag
 */
app.patch("/tag", async (req, res) => {
  req.body.id = parseInt(req.body.id);
  var tagschema = {
    id: "tag",
    type: "object",
    properties: {
      id: { type: "integer", minimum: 1 },
      tag: { type: "string", maxLength: 20 },
    },
    required: ["id", "tag"],
  };
  if (v.validate(req.body, tagschema).valid) {
    let id = await connection.editTag(req.body);
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

const port = process.env.PORT || 5000;

/**
 * Function to start listening set port
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
