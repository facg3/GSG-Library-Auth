const connection = require('../database/dbconnection');

const insertData =(title,author,edition,publisher,cb)=>{
  const sql = {
    text: `INSERT INTO books (title,author,edition,publisher) VALUES ($1,$2,$3,$4)`,
    values: [title,author,edition,publisher]
  }
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else   cb(null,data.rows);
});
}
module.exports = insertData;
