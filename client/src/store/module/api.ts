import axios from "axios";
import * as model from "../model";
export const api = axios.create({
  baseURL: "http://localhost:5000/api/"
});

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
  return response.data;
}

export async function GenerateUrl(url: model.Generate) {
  const response = await api.post("generate", {
    url: url
  });
  return response.data;
}