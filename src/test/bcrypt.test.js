
const test = require('tape');

const { hashed, comparePasswords } = require('../script/cryptp.js');

test('password is being hashed correctly', t =>
  hashed('wehey').then((res) => {
    t.equal(res.substring(0, 4), '$2a$');
    t.end();
  }).catch((err) => {
    t.equal(err, null, 'error should be null');
    t.end();
  }));

test('passwords are being validated correctly - correct password', t =>
  hashed('pa$$w0rd').then((hashedPw) => {
    comparePasswords('pa$$w0rd', hashedPw).then((correct) => {
      t.equal(correct, true);
      t.end();
    }).catch((err) => {
      t.equal(err, null, 'error should be null');
      t.end();
    });
  }).catch((err) => {
    t.equal(err, null, 'error should be null');
    t.end();
  }));
test('passwords are being validated correctly - incorrect password', t =>
  hashed('pa$$w0rd').then((hashedPw) => {
    comparePasswords('WRONG', hashedPw).then((correct) => {
      t.equal(correct, false);
      t.end();
    }).catch((err) => {
      t.equal(err, null, 'error should be null');
    });
  }).catch((err) => {
    t.equal(err, null, 'error should be null');
  }));
// test("passwords are being validated correctly - incorrect password", t =>
//   hashed("pa$$w0rd", (err, hashedPw) => {
//     t.equal(err, null, "error should be null");
//
//     comparePasswords("WRONG", hashedPw, (err, correct) => {
//       t.equal(err, null, "error should be null");
//       t.equal(correct, false);
//       t.end();
//     });
//   }));
