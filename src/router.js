import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./main/components/AppHeader";
import AppFooter from "./main/components/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./main/Login.vue";
import Register from "./main/Register.vue";
import Profile from "./views/Profile.vue";
import EditProfile from "./main/EditProfile.vue";
import ListNews from "./main/ListNews.vue";
import News from "./main/News.vue";
import ManageOption from "./main/ManageOption.vue";
import Manage from "./main/Manage.vue";
import Redirect from "./main/Redirect.vue";
import Insert from "./main/Insert.vue";
import InsertNews from "./main/InsertNews.vue";
import Question from "./main/Question.vue";
import Chat from "./main/Chat.vue";
import Queue from "./main/Queue.vue";
import BookQueue from "./main/BookQueue.vue";
import VideoCall from "./main/components/VideoCall.vue";
import ReadQuestion from "./main/ReadQuestion.vue";
import OrderMedic from "./main/OrderMedic.vue";
import Order from "./main/Order.vue";
import Billing from "./main/Billing.vue";
import OrderHistory from "./main/OrderHistory.vue";
import showOrder from "./main/showOrder.vue";
import Report from "./main/Report.vue";
import InsertMedic from "./main/InsertMedic.vue";
Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Main",
      components: {
        header: AppHeader,
        default: Redirect,
        footer: AppFooter
      }
    },
    {
      path: "/Home",
      name: "Home",
      components: {
        header: AppHeader,
        default: ListNews,
        footer: AppFooter
      }
    },
    {
      path: "/Medicine",
      name: "Medicine",
      components: {
        header: AppHeader,
        default: ListNews,
        footer: AppFooter
      }
    },
    {
      path: "/Disease",
      name: "Disease",
      components: {
        header: AppHeader,
        default: ListNews,
        footer: AppFooter
      }
    },
    {
      path: "/EditProfile/:key",
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
      path: "/News/:key",
      name: "News",
      components: {
        header: AppHeader,
        default: News,
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
    {
      path: "/InsertNews",
      name: "InsertNews",
      components: {
        header: AppHeader,
        default: InsertNews,
        footer: AppFooter
      }
    },
    {
      path: "/Question",
      name: "Question",
      components: {
        header: AppHeader,
        default: Question,
        footer: AppFooter
      }
    },
    {
      path: "/ReadQuestion/:key",
      name: "ReadQuestion",
      components: {
        header: AppHeader,
        default: ReadQuestion,
        footer: AppFooter
      }
    },
    {
      path: "/Chat",
      name: "Chat",
      components: {
        header: AppHeader,
        default: Chat,
        footer: AppFooter
      }
    },
    {
      path: "/Queue",
      name: "Queue",
      components: {
        header: AppHeader,
        default: Queue,
        footer: AppFooter
      }
    },
    {
      path: "/BookQueue",
      name: "BookQueue",
      components: {
        header: AppHeader,
        default: BookQueue,
        footer: AppFooter
      }
    },
    {
      path: "/VideoCall",
      name: "VideoCall",
      components: {
        header: AppHeader,
        default: VideoCall,
        footer: AppFooter
      }
    },
    {
      path: "/OrderMedic",
      name: "OrderMedic",
      components: {
        header: AppHeader,
        default: OrderMedic,
        footer: AppFooter
      }
    },
    {
      path: "/Order",
      name: "Order",
      components: {
        header: AppHeader,
        default: Order,
        footer: AppFooter
      }
    },
    {
      path: "/Billing/:key",
      name: "Billing",
      components: {
        header: AppHeader,
        default: Billing,
        footer: AppFooter
      }
    },
    {
      path: "/OrderHistory",
      name: "OrderHistory",
      components: {
        header: AppHeader,
        default: OrderHistory,
        footer: AppFooter
      }
    },
    {
      path: "/showOrder/:key",
      name: "showOrder",
      components: {
        header: AppHeader,
        default: showOrder,
        footer: AppFooter
      }
    },
    {
      path: "/Report",
      name: "Report",
      components: {
        header: AppHeader,
        default: Report,
        footer: AppFooter
      }
    },
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
