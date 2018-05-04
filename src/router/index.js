import Vue from 'vue'
import Router from 'vue-router'


// 引入商品页组件
import GoodList from "@/components/goods/list";
import GoodDetail from "@/components/goods/detail";

// 引入新闻页组件
import NewsList from "@/components/news/list";
import NewsDetail from "@/components/news/detail";

// 引入图片页组件
import PicList from "@/components/pictures/list";
import PicDetail from "@/components/pictures/detail";

// 引入导航组件
import Cart from "@/components/tabbar/cart";
import Search from "@/components/tabbar/search";
import Home from "@/components/tabbar/home";
import Member from "@/components/tabbar/member";

Vue.use(Router);
export default new Router({
  routes: [
    // 导航路由
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/cart",
      component: Cart
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/member",
      component: Member
    },
    // 商品路由
    {
      path: "/goods",
      component: GoodList
    },
    {
      path: "/goods/detail",
      component: GoodDetail
    },
    // 新闻页路由
    {
      path: "/news",
      component: NewsList
    },
    {
      path: "/news/detail/:id",
      component: NewsDetail
    },
    // 图片页路由
    {
      path: "/pictures",
      component: PicList
    },
    {
      path: "/pictures/detail",
      component: PicDetail
    }
  ],
  linkActiveClass: "mui-active"
});
