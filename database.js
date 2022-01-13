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
  save: (words) => {
    function asynFunc(resolve, reject) {
      var sql = "insert into words (finnish, english) values(?,?);";
      var inserts = [words.finnish, words.english];
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
      pool.query("select * from words;", (err, words) => {
        if (err) {
          reject(err);
        }
        var i = 0;
        words.forEach(function (words) {
          arr[i] = {
            id: `${words.id}`,
            finnish: `${words.finnish}`,
            english: `${words.english}`,
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
      var sql = "delete from words where id=?;";
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
      var sql = "select * from words where id=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        resolve(result);
        result.map((result) => {
          resolve({
            id: result.id,
            finnish: result.finnish,
            english: result.english,
          });
        });
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  findByTag: (id) => {
    function asynFunc(resolve) {
      var sql = "select * from words where tag=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        resolve(result);
        result.map((result) => {
          resolve({
            id: result.id,
            finnish: result.finnish,
            english: result.english,
          });
        });
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
};

module.exports = connectionFunctions;
