const ERRORS = {
  EMAIL_NOT_FOUND: "Wrong email address",
  INVALID_PASSWORD: "Wrong password",
  auth: "Sign In, please."
}

export function error(e) {
  return ERRORS[e] ? ERRORS[e] : 'Unknown error'
}