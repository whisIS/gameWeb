import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

// 所有的路由数组
const routerList = [];

// 该函数用于将所有分区路由中的路由添加到路由数组
function importAll(routerArr) {
  routerArr.keys().forEach(key => {
    routerList.push(routerArr(key).default)
  })
}
importAll(require.context(".", true, /\.routes\.js/))

const routes = [
  ...routerList
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router
