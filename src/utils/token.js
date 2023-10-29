import Cookies from "js-cookie";
import { STORAGE } from "../constants/storage";

export const localToken = {
  get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
  set: (token) => {
    return localStorage.setItem(STORAGE.token, JSON.stringify(token));
  },
  remove: () => localStorage.removeItem(STORAGE.token),
};
export const cookieToken = {
  get: () => {
    JSON.parse(Cookies.get(STORAGE.token) !== undefined ? Cookies.get(STORAGE.token) : null);
  },
  set: (token) => {
    Cookies.set(STORAGE.token, JSON.stringify(token));
  },
  remove: () => {
    Cookies.remove(STORAGE.token);
  },
};
const tokenMethod = {
  get: () => {
    return localToken.get();
  },
  set: (token) => {
    return localToken.set(token);
  },
  remove: () => {
    return localToken.remove();
  },
};
export default tokenMethod;
