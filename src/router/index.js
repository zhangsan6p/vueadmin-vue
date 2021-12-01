import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/index";
import axios from "axios";
import store from "@/store"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "index",
        component: Index
      },
      {
        path: "userCenter",
        name: "UserCenter",
        component: () => import("@/views/UserCenter")
      },
      // {
      //   path: "sys/users",
      //   name: "SysUser",
      //   component: User
      // },
      // {
      //   path: "sys/roles",
      //   name: "SysRole",
      //   component: Role
      // },
      // {
      //   path: "sys/menu",
      //   name: "SysMenu",
      //   component: Menu
      // },
      // {
      //   path: "sys/dicts",
      //   name: "SysDict",
      //   component: System
      // }
    ]
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //懒加载不需要引入
    component: () => import("@/views/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由之前验证
//to 跳转路由
//from 从哪个路由来
//next 往下走
router.beforeResolve((to, from, next) => {

  //防止重复请求
  let hasRoute = store.state.menus.hasRoute

  if (!hasRoute){
    axios({
      url:'/sys/menu/nav',
      method:'get',
      headers:{
        Authorization:localStorage.getItem("token")
      }
    }).then(respones => {
      // 拿到menuList
      store.commit("setMenuList",respones.data.data.nav)
      //获取用户的权限
      store.commit("setPermList",respones.data.data.authoritys)

      console.log(store.state.menus.menuList)

      //动态绑定路由
      //拿到路由信息
      let newRoutes = router.options.routes

      respones.data.data.nav.forEach(menus => {
        if (menus.children){
          menus.children.forEach(e => {

            //转化成路由
            let route = menusToRoute(e)

            //将路由添加在路由管理其中
            if (route){
              newRoutes[0].children.push(route)
            }
          })
        }
      })

      //路由绑定
      router.addRoutes(newRoutes)

      console.log("$$$$newRoutes"+newRoutes)
      hasRoute = true
      store.commit("changeRouteStatus",hasRoute)
    })
  }

  next();
});

//导航转成路由
const menusToRoute = (menu) => {


    if (!menu.component){
        return null;
    }

  let route = {
      name:menu.name,
      path:menu.path,
      meta:{
        icon:menu.icon,
        title:menu.title
      },
      component: () => import('@/views/'+menu.component+'')
  }
  return route;
}
export default router;
