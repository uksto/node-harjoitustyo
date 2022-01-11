const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  save: (location) => {
    function asynFunc(resolve, reject) {
      var sql = "insert into locations (latitude, longitude) values(?,?);";
      var inserts = [location.latitude, location.longitude];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.insertId);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  findAll: () => {
    function asynFunc(resolve, reject) {
      let arr = {};
      pool.query("select * from locations;", (err, locations) => {
        if (err) {
          reject(err);
        }
        var i = 0;
        locations.forEach(function (locations) {
          arr[i] = {
            id: `${locations.id}`,
            latitude: `${locations.latitude}`,
            longitude: `${locations.longitude}`,
          };
          i++;
        });
        resolve(arr);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  deleteById: (id) => {
    function asynFunc(resolve, reject) {
      var sql = "delete from locations where id=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.affectedRows);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  findById: (id) => {
    function asynFunc(resolve) {
      var sql = "select * from locations where id=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        resolve(result);
        result.map((result) => {
          resolve({
            id: result.id,
            latitude: result.latitude,
            longitude: result.longitude,
          });
        });
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
};

module.exports = connectionFunctions;
