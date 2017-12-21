const bcrypt = require('bcryptjs');

const hashPassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) reject(error);
    else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    }
  });
});
const comparePasswords = (password, hashedPassword) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) reject(err);
    else resolve(res);
  });
});
module.exports = { hashPassword, comparePasswords };
