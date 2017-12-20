
const login = document.getElementById('sign_in_button');

login.addEventListener('click', () => {
  const username = document.getElementById('username');
  const Password = document.getElementById('Password');
  const user = {username: username.value,Password:Password.value}
  fetchPost('POST', '/checkUser', (err, res) => {
    if (err) {
      alert("UserName Or Password Err");
    } else {
      if(res === '/') window.location.pathname = '/';
    }
  }, JSON.stringify(user));

});
