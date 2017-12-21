const fs = require('fs');
const path = require('path');
const bcrypt = require('./cryptp.js');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const insert = require('../query/insert');
const showData = require('../query/selectAll');
const deleteBook = require('../query/deleteBook');
const editBook = require('../query/update');
const insertUser = require('../query/insertUser');
const checkUserdb = require('../query/checkUser');


const homepageHandler = (req, res) => {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, file) => {
      if (err) {
        res.writeHead(500, {
          'content-type': 'text/html',
        });
        res.end('<h1>SERVER ERROR</h1>');
      } else {
        res.writeHead(200, {
          'content-type': 'text/html',
        });
        res.end(file);
      }
    });
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
};

const SignUp = (req, res) => {

  fs.readFile(path.join(__dirname, '..', '..', 'public', 'signup.html'), (err, file) => {
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/html',
      });
      res.end('<h1>SERVER ERROR</h1>');
    } else {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.end(file);
    }
  });
};
const login = (req, res) => {

  fs.readFile(path.join(__dirname, '..', '..', 'public', 'login.html'), (err, file) => {
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/html',
      });
      res.end('<h1>SERVER ERROR</h1>');
    } else {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.end(file);
    }
  });
};
const publicHandler = (req, res) => {
  const {
    url,
  } = req;
  const extension = url.split('.')[1];
  const filetype = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    img: 'image/png',
  };

  fs.readFile(path.join(__dirname, '..', '..', url), (err, file) => {
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/html',
      });
      res.end('<h1>SERVER ERROR</h1>');
    } else {
      res.writeHead(200, `Content-Type:${filetype[extension]}`);
      res.end(file);
    }
  });
};
const insertData = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });
  req.on('end', () => {
    const convertData = JSON.parse(allData);

    insert(
      convertData.title, convertData.author, convertData.edition, convertData.publisher,
      (err, book) => {
        if (err) {
          res.writeHead(500, {
            'content-Type': 'text/html',
          });
          return res.end('<h1>ERROR handling</h1>');
        }
        res.writeHead(200, {
          'Content-Type': ' text/html',
        });
        return res.end();
      },
    );
  });
};
const addUser = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });
  req.on('end', () => {
    const convertData = JSON.parse(allData);
    bcrypt.hashPassword(convertData.Password).then((hash) => {
      insertUser(convertData.username, hash, (err, response) => {
        if (err) {
          res.writeHead(500, {
            'content-Type': 'text/html',
          });
          return res.end('<h1>ERROR handling</h1>');
        }

        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        return res.end('/');
      });
    }).catch((error) => {
      console.log(error);
    });
  });
};

const checkUser = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });
  req.on('end', () => {
    const convertData = JSON.parse(allData);
    checkUserdb(convertData.username, (err, response) => {
      if (err) {
        res.writeHead(500, {
          'content-Type': 'text/html',
        });
        return res.end('<h1>ERROR handling</h1>');
      } else if (!response.length) {
        return res.end('<h1>You are not a user. Please sign up</h1>');
      }

      const userData = {
        userId: response[0].id,
        username: response[0].username,
      };

      const tokens = jwt.sign(userData, 'my secret');

      bcrypt.comparePasswords(convertData.Password, response[0].password).then((hash) => {
        res.writeHead(200, {
            'content-Type': 'text/html',
          'Set-Cookie': `token=${tokens}; httpOnly`
        });
        res.end('/');
      });
    });
  });
};

const viewData = (req, res) => {
  showData((err, books) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html',
      });
      return res.end('<h1>ERROR handling</h1>');
    }
    const data = JSON.stringify(books);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    return res.end(data);
  });
};
const deleteData = (req, res) => {
  let idBook = '';
  req.on('data', (chunkOfData) => {
    idBook += chunkOfData;
  });
  req.on('end', () => {
    deleteBook(idBook, (err, book) => {
      if (err) {
        res.writeHead(500, {
          'content-Type': 'text/html',
        });
        return res.end('<h1>ERROR handling</h1>');
      }
      res.writeHead(200, {
        'Content-Type': ' text/html',
      });
      return res.end();
    });
  });
};
const logout = (req, res) => {
  res.writeHead(200, {
    'content-Type': 'text/html',
    'Set-Cookie': 'token=0; Max-Age=0',
  });
  res.end('/');
};
const editData = (req, res) => {
  let Book = '';
  req.on('data', (chunkOfData) => {
    Book += chunkOfData;
  });
  req.on('end', () => {
    const converedtData = JSON.parse(Book);
    editBook(
      converedtData.title, converedtData.author, converedtData.edtion,
      converedtData.publisher, converedtData.id, (err, data) => {
        if (err) {
          res.writeHead(500, {
            'content-Type': 'text/html',
          });
          res.end('<h1>ERROR handling</h1>');
        }
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end();
      },
    );
  });
};

const checkAuth = (req, res , cb) => {
  const { token } = cookie.parse(req.headers.cookie || '')
  if(token){
    jwt.verify(token , 'my secret' , (err , decoded) => {
      if(err){
        cb(false , req.url);
      }else {
        req.user = decoded;
        cb(true, req.url);
      }
    });
  } else {
    cb(false, req.url);
  }
};

module.exports = {
  publicHandler,
  homepageHandler,
  insertData,
  viewData,
  deleteData,
  editData,
  SignUp,
  addUser,
  checkUser,
  login,
  logout,
  checkAuth,
};
