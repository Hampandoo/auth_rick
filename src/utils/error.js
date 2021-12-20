const ERRORS = {
  EMAIL_NOT_FOUND: "Wrong email address",
  INVALID_PASSWORD: "Wrong password",
  auth: "Sign In, please.",
  EMAIL_EXISTS: "This email is already in use",
  TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try later",
}

export function error(e) {
  return ERRORS[e] ? ERRORS[e] : 'Unknown error'
}