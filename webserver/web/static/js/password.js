'use strict';

/* global zxcvbn */

(function () {
  var _this = this;

  function checkMatch(pw, verify) {
    if (pw.value === verify.value && pw.value.length !== 0) {
      verify.classList.add('is-success');
    } else {
      verify.classList.remove('is-success');
    }
  }

  document.getElementById('password_verify').addEventListener('input', function () {
    return checkMatch(document.getElementById('password'), _this);
  });

  function doHides(pw, strength) {
    if (pw.value.length === 0) {
      strength.classList.add('is-not-displayed');
    } else {
      strength.classList.remove('is-not-displayed');
    }
  }

  function passwordStrength(pw) {
    checkMatch(pw, document.getElementById('password_verify'));

    var values = [];
    {
      var name = document.getElementById('name');
      if (name) {
        values.push(name.value);
      }
      var username = document.getElementById('username');
      if (username) {
        values.push(username.value);
      }
      var email = document.getElementById('email');
      if (email) {
        values.push(email.value);
      }
    }

    var password = pw.value;
    var strength = document.getElementById('strength');
    var progress = document.getElementById('strength_progress');
    var warning = document.getElementById('strength_warning');

    if (pw.getAttribute('data-bar') === 'hidden') {
      doHides(pw, progress);
    }

    if (password.length === 0) {
      strength.innerHTML = '';
      warning.innerHTML = '';
      progress.classList.add('is-danger');
      progress.classList.remove('is-warning');
      progress.classList.remove('is-success');
      return;
    }

    var z = zxcvbn(password, values);

    var message = 'Time to crack your password: ' + z.crack_times_display.offline_slow_hashing_1e4_per_second;
    message += ' <small><span class="has-text-grey-light tooltip is-tooltip-multiline is-dotted-underlined" data-tooltip="This is the time it would take an attacker to successfully guess your password. Increase your password complexity until you\'re comfortable with the amount of time.">What is this?</i></small>';
    strength.innerHTML = message;

    warning.innerHTML = '<br/>' + z.feedback.warning;

    var color = void 0;
    switch (z.score) {
      case 0:
        color = 'is-danger';
        break;
      case 1:
        color = 'is-danger';
        break;
      case 2:
        color = 'is-warning';
        break;
      case 3:
        color = 'is-warning';
        break;
      case 4:
        color = 'is-success';
        break;
    }

    progress.classList.remove('is-danger');
    progress.classList.remove('is-warning');
    progress.classList.remove('is-success');
    progress.classList.add(color);
  }

  document.getElementById('password').addEventListener('input', function () {
    return passwordStrength(_this);
  });
})();
//# sourceMappingURL=password.js.map