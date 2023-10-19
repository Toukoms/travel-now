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
  // Must be more than tree characters
  if (name.length < 3) return false;

  // Only letters (no numbers or special characters)
  const namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
}

export function isCINValid(cin: string) {
  // Number of characters in CIN must be equal to 12
  if (cin.length !== 12) return false;

  // Only numbers
  const cinPattern = /^[0-9]+$/;
  return cinPattern.test(cin);
}

export function isTelNumberValid(telNumber: string) {
  // Number of characters in telNumber must be equal to 10
  if (telNumber.length !== 10) return false;

  // Only numbers
  const telNumberPattern = /^[0-9]+$/;
  return telNumberPattern.test(telNumber);
}

export function isSignUpValid(
  email: string,
  password: string,
  name: string,
  firstName: string,
  cin: string,
  telNumber: string
) {
  if (!isNameValid(name) || !isNameValid(firstName)) {
    return "Nom et prénom devraient être au moins trois caractères et seulement des lettres.";
  }

  if (name.length === 0 && firstName.length === 0) {
    return "Veuillez mettre votre nom et/ou votre prénom.";
  }

  if (!isCINValid(cin)) {
    return "Veuillez mettre un nunméro d'identité nationale valide.";
  }

  if (!isTelNumberValid(telNumber)) {
    return "Veuillez mettre un nunméro de téléphone valide.";
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
