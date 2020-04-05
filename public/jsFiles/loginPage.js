function loginTab(value) {
  if (value == 1) {
    document.getElementById('login').style.display = 'block';
    document.getElementById('signUp').style.display = 'none';
    document.getElementById('trainerSignUp').style.display = 'none';
  }
  if (value == 2) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signUp').style.display = 'block';
    document.getElementById('trainerSignUp').style.display = 'none';
  }
  if (value == 3) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signUp').style.display = 'none';
    document.getElementById('trainerSignUp').style.display = 'block';
  }
}

function signUp() {
  var first = document.getElementById('inputFirstName').val();
  var last = document.getElementById('inputLastName').val();
  var email = document.getElementById('inputEmail').val();
  var password = document.getElementById('inputPassword').val();

  $.post('/signUp', params, function(result) {
    if (result && result.success) {
      document.getElementById('status').text('Successfully logged in.');
      // $('#status').text('Successfully logged in.');
    } else {
      document.getElementById('status').text('Error logging in.');
      // $('#status').text('Error logging in.');
    }
  });
}

function trainerSignUp() {
  var first = document.getElementById('inputFirstNameTsu').val();
  var last = document.getElementById('inputLastNameTsu').val();
  var email = document.getElementById('inputEmailTsu').val();
  var password = document.getElementById('inputPasswordTsu').val();

  $.post('/trainerSignUp', params, function(result) {
    if (result && result.success) {
      document.getElementById('status').text('Successfully logged in.');
      // $('#status').text('Successfully logged in.');
    } else {
      document.getElementById('status').text('Error logging in.');
      // $('#status').text('Error logging in.');
    }
  });
}

function login() {
  // var email = document.getElementById('inputEmail').val();
  var email = $('#inputEmailLog').val();
  // var password = document.getElementById('inputPassword').val();
  var password = $('#inputPasswordLog').val();

  var params = {
    email: email,
    password: password
  };

  $.post('/loggedIn', params, function(result) {
    if (result && result.success) {
      document.getElementById('status').text('Successfully logged in.');
      // $('#status').text('Successfully logged in.');
    } else {
      document.getElementById('status').text('Error logging in.');
      // $('#status').text('Error logging in.');
    }
  });
}
