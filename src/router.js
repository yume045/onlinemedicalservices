import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./main/AppHeader";
import AppFooter from "./main/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./main/Login.vue";
import Register from "./main/Register.vue";
import Profile from "./views/Profile.vue";
import HomeAdmin from "./main/HomeAdmin.vue";
import EditProfile from "./main/EditProfile.vue";
import Home from "./main/Home.vue";
import Medicine from "./main/Medicine.vue";
import News from "./main/News.vue";
import Disease from "./main/Disease.vue";
import MedicNews from "./main/MedicNews.vue";
import DiseaseNews from "./main/DiseaseNews.vue";
import ManageOption from "./main/ManageOption.vue";
import Manage from "./main/Manage.vue";
import Redirect from "./main/Redirect.vue";
import Insert from "./main/Insert.vue";
import InsertMedic from "./main/InsertMedic.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/EditProfile",
      name: "EditProfile",
      components: {
        header: AppHeader,
        default: EditProfile,
        footer: AppFooter
      }
    },
    {
      path: "/Login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/Register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/Homeadmin",
      name: "Homeadmin",
      components: {
        header: AppHeader,
        default: HomeAdmin,
        footer: AppFooter
      }
    },
    {
      path: "/Medicine",
      name: "Medicine",
      components: {
        header: AppHeader,
        default: Medicine,
        footer: AppFooter
      }
    },
    {
      path: "/News",
      name: "News",
      components: {
        header: AppHeader,
        default: News,
        footer: AppFooter
      }
    },
    {
      path: "/MedicNews",
      name: "MedicNews",
      components: {
        header: AppHeader,
        default: MedicNews,
        footer: AppFooter
      }
    },
    {
      path: "/Disease",
      name: "Disease",
      components: {
        header: AppHeader,
        default: Disease,
        footer: AppFooter
      }
    },
    {
      path: "/DiseaseNews",
      name: "DiseaseNews",
      components: {
        header: AppHeader,
        default: DiseaseNews,
        footer: AppFooter
      }
    },
    {
      path: "/ManageOption",
      name: "ManageOption",
      components: {
        header: AppHeader,
        default: ManageOption,
        footer: AppFooter
      }
    },
    {
      path: "/Manage/:type",
      name: "Manage",
      components: {
        header: AppHeader,
        default: Manage,
        footer: AppFooter
      }
    },
    {
      path: "/Redirect/:path/:type",
      name: "Redirect",
      components: {
        header: null,
        default: Redirect,
        footer: null
      }
    },
    {
      path: "/Insert/:type",
      name: "Insert",
      components: {
        header: AppHeader,
        default: Insert,
        footer: AppFooter
      }
    },
    ,
    {
      path: "/InsertMedic",
      name: "InsertMedic",
      components: {
        header: AppHeader,
        default: InsertMedic,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
