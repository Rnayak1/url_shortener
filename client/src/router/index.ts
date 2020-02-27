import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// Path to load components
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue")
  },
  {
    path : "/dashboard",
    name : "DashBoard",
    component : () => import("@/views/Dashboard.vue")
  },
  {
    path : "/profile",
    name : "Profile",
    component : () => import('@/views/profile.vue')
  },
  {
    path : "/logout",
    name : "LogOut",
    component : () => import('@/views/Logout.vue')
  },
  {
    path : "/:customUrl",
    name : "CustomUrl",
    component : () => import("@/views/Redirect.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
