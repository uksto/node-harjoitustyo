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
      var sql = "insert into words (finnish, english, tag) values(?,?,?);";
      var inserts = [words.finnish, words.english, words.tag];
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
    function asynFunc(resolve, reject) {
      var sql = "select * from words where id=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        let out = [];
        let i = 0;
        result.map((result) => {
          out[i] = {
            id: result.id,
            finnish: result.finnish,
            english: result.english,
          };
          i++;
        });
        resolve(out);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  findByTag: (id) => {
    function asynFunc(resolve, reject) {
      var sql = "select * from words where tag=?;";
      var inserts = [id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        let out = [];
        let i = 0;
        result.map((result) => {
          out[i] = {
            id: result.id,
            finnish: result.finnish,
            english: result.english,
          };
          i++;
        });
        resolve(out);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  findTags: () => {
    function asynFunc(resolve, reject) {
      let arr = {};
      pool.query("select * from tags;", (err, words) => {
        if (err) {
          reject(err);
        }
        var i = 0;
        words.forEach(function (tags) {
          arr[i] = {
            id: `${tags.id}`,
            tag: `${tags.tag}`,
          };
          i++;
        });
        resolve(arr);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
  saveTag: (tag) => {
    function asynFunc(resolve, reject) {
      var sql = "insert into tags (tag) values(?);";
      var inserts = [tag.tag];
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
  deleteTag: (id) => {
    function asynFunc(resolve, reject) {
      var sql = "delete from tags where id=?;";
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
  editTag: (tag) => {
    function asynFunc(resolve, reject) {
      var sql = "update tags set tag=? where id=?;";
      var inserts = [tag.tag, tag.id];
      sql = mysql.format(sql, inserts);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }
    const p = new Promise(asynFunc);
    return p;
  },
};

module.exports = connectionFunctions;
