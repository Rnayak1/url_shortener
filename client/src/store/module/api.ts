import axios from "axios";
import * as model from "../model";
export const api = axios.create({
  baseURL: "http://localhost:5000/api/"
});

export function setJWT(JWT: string) {
  api.defaults.headers['token'] = `${JWT}`;
}

export function clearJWT() {
  delete api.defaults.headers['token'];
}
export async function RegisterUser(user: model.User) {
  const response = await api.post("register", {
    user: user
  });
  return response.data;
}

export async function LoginUser(user: model.Login) {
  const response = await api.post("login", {
    user: user
  });
  if (response.data.status == "success") {
    localStorage.setItem('t', response.data.message);
  }
  return response.data.status;
}

export async function GenerateUrl(url: model.Generate) {
  if (localStorage.t && localStorage.t != '') {
    api.defaults.headers['token'] = localStorage.getItem('t');
    const response = await api.post("generate", {
      url: url
    });
    delete api.defaults.headers['token'];
    return response.data;
  }

}