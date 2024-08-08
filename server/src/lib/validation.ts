function isEmpty(value: String) {
  return !value || value.trim() === '';
}

function userCredentialsAreValid(email: String, password: String) {
  return (
    email && email.includes('@') && email.includes('.') && password && password.trim().length >= 6
  );
}

export function validateUser(username: String, email: String, password: String) {
  return userCredentialsAreValid(email, password) && !isEmpty(username);
}

export function passwordIsConfirmed(password: String, confirmPassword: String) {
  return password === confirmPassword;
}