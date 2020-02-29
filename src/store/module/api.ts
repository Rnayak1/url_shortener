import axios from "axios";
import * as model from "../model";

/*
Return Format of api endpoints

{
  status : "error/success",
  message : "response recieved from server"
}

*/

// api url 
export const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API || 'http://localhost:5000/api'
});
//Register User with Strict Type Match
export async function RegisterUser(user: model.User) {
  const response = await api.post("register", {
    user: user
  });
  return response.data;
}
//For Login
export async function LoginUser(user: model.Login) {
  const response = await api.post("login", {
    user: user
  });
  if (response.data.status == "success") {
    //console.log(response);
    localStorage.setItem('t', response.data.message);
    localStorage.setItem('u', response.data.username);
  }
  return response.data.status;
}

// For Verifying user
export async function VerifyUser(token: string) {
  const response = await api.post('verify', {
    token: token
  });
  return response.data;
}

//For generating short url
export async function GenerateUrl(url: model.Generate) {
  if (localStorage.t && localStorage.t != '') {
    const response = await api.post("generate", {
      url: url
    });
    delete api.defaults.headers['token'];
    return response.data;
  }
  else {
    const response = {
      status: "error",
      message: "Please Login to Use Your Account"
    }
    return response;
  }
}
//For Getting Orignal Url for given short url
export async function GetUrl(url: string) {
  const response = await api.post("getlink", {
    url: { hashLink: url }
  })
  return response.data;
}
//For Fetching all links for logged in user
export async function GetLinksForUser() {
  //console.log("api")
  if (localStorage.t && localStorage.t != '') {
    api.defaults.headers['token'] = localStorage.getItem('t');
    const response = await api.post("getalllink");
    delete api.defaults.headers['token'];
    //console.log(response.data);
    return response.data;
  }
  else {
    const response = {
      status: "error",
      message: "Please Login to Use Your Account"
    }
    return response;
  }
}