const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
});

let connectionFunctions = {
  /**
   * Save word to database
   */
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
  /**
   * Find all words from database
   */
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
  /**
   * Delete word by id from database
   */
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
  /**
   * Find word by id from database
   */
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
  /**
   * Find words by tag from database
   */
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
  /**
   * Find all tags from database
   */
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
  /**
   * Save tag to database
   */
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
  /**
   * Delete tag by id from database
   */
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
  /**
   * Edit tag by id in database
   */
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
