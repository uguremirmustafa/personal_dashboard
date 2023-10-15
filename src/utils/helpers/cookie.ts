import Cookies from 'js-cookie';

// Function to set a cookie
export function setCookie(key: string, value: string, options = {}) {
  Cookies.set(key, value, options);
}

// Function to get a cookie
export function getCookie(key: string) {
  return Cookies.get(key);
}

// Function to remove a cookie
export function removeCookie(key: string) {
  Cookies.remove(key);
}
