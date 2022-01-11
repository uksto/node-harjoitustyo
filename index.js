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

app.get("/locations", async (req, res) => {
  let result = await connection.findAll();
  res.send(result);
});

app.get("/locations/:id([0-9]+)", async (req, res) => {
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

app.get(
  "/locations?sort=:foo(latitude+|latitude-|longitude+|longitude-)/i",
  async (req, res) => {
    console.log(req.params.foo);
    res.end();
    // let id = parseInt(req.params.id);
    // try {
    //   let temp = await connection.findById(id);
    //   if (temp.length < 1) {
    //     res.statusCode = 404;
    //     res.end();
    //   } else {
    //     res.send(temp);
    //   }
    // } catch {
    //   res.statusCode = 404;
    //   res.end();
    // }
  }
);

app.post("/locations", async (req, res) => {
  console.log(req.body);
  var locationschema = {
    id: "location",
    type: "object",
    properties: {
      latitude: { type: "number", required: true, minimum: -90, maximum: 90 },
      longitude: {
        type: "number",
        required: true,
        minimum: -180,
        maximum: 180,
      },
    },
  };
  if (v.validate(req.body, locationschema).valid) {
    let id = await connection.save(req.body);
    res.statusCode = 201;
    let location = {
      id: id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    res.send(location);
  } else {
    res.statusCode = 400;
    res.end();
  }
});

app.delete("/locations/:id([0-9]+)", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const main = async () => {
//   const connection = require("./database.js");
//   try {
//     console.log(await connection.connect());
//     console.log(await connection.findAll());
//     console.log(await connection.findById(1));
//     // let location = { latitude: -80, longitude: 180 };
//     // console.log(
//     //   await connection.save(location).catch((err) => {
//     //     return err;
//     //   })
//     // );
//     // console.log(await connection.deleteById(15));
//   } catch (err) {
//     console.log(err);
//   } finally {
//     try {
//       console.log(await connection.close());
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
