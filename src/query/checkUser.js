const connection = require('../database/dbconnection');

const checkUser =(username,cb)=>{
  const sql = {
    text: `select * from users where username =$1`,
    values: [username]
  }
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else   cb(null,data.rows);
});
}
module.exports = checkUser;
