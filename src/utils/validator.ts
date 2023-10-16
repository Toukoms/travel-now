export function isEmailValid(email: string) {
  // Regular expression for basic email validation
  const emailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return emailPattern.test(email);
}

export function isPasswordValid(password: string) {
  const state = { valid: false, message: "" };

  // Minimum length of 8 characters
  if (password.length < 8) {
    state.message = "Le mot de passe doit avoir au moins 8 caractères.";
    return state;
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    state.message =
      'Le mot de passe doit avoir au moins une lettre "MAJUSCULE".';
    return state;
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    state.message =
      'Le mot de passe doit avoir au moins une lettre "miniscule".';
    return state;
  }

  // At least one number
  if (!/[0-9]/.test(password)) {
    state.message =
      "Le mot de passe doit avoir au moins un caractère numérique.";
    return state;
  }

  // At least one special character
  if (!/[!@#\$%\^&*\(\)_\+{}\[\]:;<>,.?~\\-]/.test(password)) {
    state.message = "Le mot de passe doit avoir au moins un caractère spécial.";
    return state;
  }

  // No spaces
  if (/\s/.test(password)) {
    state.message = "Le mot de passe ne doit pas avoir d'espace.";
    return state;
  }

  state.valid = true;
  return state;
}

export function isNameValid(name: string) {
  // Only letters (no numbers or special characters)
  if (name.length < 3) return false;

  const namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
}

export function isSignUpValid(
  email: string,
  password: string,
  name: string,
  firstName: string
) {
  if (!isNameValid(name) || !isNameValid(firstName)) {
    return "Nom et prénom devraient être au moins trois caractères et seulement des lettres.";
  }

  if (!isEmailValid(email)) {
    return "Votre email n'est pas valide.";
  }

  const isPwdValid = isPasswordValid(password);
  if (!isPwdValid.valid) {
    return isPwdValid.message;
  }

  return "";
}
