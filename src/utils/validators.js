export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isIndianMobile(value) {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ""));
}

export function validateLogin(values) {
  const errors = {};

  if (!isEmail(values.email || "")) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = validateLogin(values);

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }

  if (!isIndianMobile(values.mobile || "")) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function validateForgotPassword(values) {
  return isEmail(values.email || "") ? {} : { email: "Enter your registered email address." };
}
