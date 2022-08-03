import Cookie from 'js-cookie';

const AUTH_TOKEN = 'AUTHTOKEN';

export const getToken = () => {
  return Cookie.get(AUTH_TOKEN);
}

export const getCookie = (name) => {
  return Cookie.get(name);
}

export const setToken = (value, options = { expires: 7 }) => {
  return Cookie.set(AUTH_TOKEN, value, options)
}

export const setCookie = (name, value, options = { expires: 7 }) => {
  Cookie.set(name, value, options)
}
