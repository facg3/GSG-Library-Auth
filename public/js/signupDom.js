
const SignUp = document.getElementById('SignUp');

SignUp.addEventListener('click', () => {
  const username = document.getElementById('username');
  const Password = document.getElementById('Password');
  const confirmPassword = document.getElementById('confirmPassword');
if(Password.value === confirmPassword.value){
  const user = {username: username.value,Password:Password.value}
  fetchPost('POST', '/addUser', (err, res) => {
    if (err) {} else {
      // alert("Congrats U R User Now");
      if(res === '/') window.location.pathname = '/login';
    }
  }, JSON.stringify(user));
}
else {
  alert("Password dosent match");
}

});
