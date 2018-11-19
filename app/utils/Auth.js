
export function getAuthority(key = 'flair-auth') {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export function setAuthority(authority, key = 'flair-auth') {
  return localStorage.setItem(key, JSON.stringify(authority));
}
