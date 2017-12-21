
const login = document.getElementById('login_form');

login.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username');
  const Password = document.getElementById('Password');
  const user = { username: username.value, Password: Password.value };
  fetchPost('POST', '/checkUser', (err, res) => {
    if (err) {
      alert('UserName Or Password Err');
    } else {
      console.log('this is res,', res);
      if (res === '/') window.location.pathname = '/';
      if (res === '<h1>You are not a user. Please sign up</h1>') alert('You are not a user. Please sign up');
    }
  }, JSON.stringify(user));
});
