import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import HelloWorld from '@/components/HelloWorld'
import links from '@/components/links'
import top from '@/components/top'
import searchTop from '@/components/searchTop'
import myLesson from '@/components/myLesson'
import detailsPage from '@/components/detailsPage'
import myCollect from '@/components/myCollect'
import shareSchool from '@/components/shareSchool'
import shareCounty from '@/components/shareCounty'
import newCourse from '@/components/newCourse'
import appList from '@/components/appList'
import screenPage from '@/components/screenPage'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [{
    path: '/',
    redirect: 'links'
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/links',
    name: 'links',
    component: links,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    }
  }, {
    path: '/top',
    name: 'top',
    component: top
  }, {
    path: '/searchTop',
    name: 'searchTop',
    component: searchTop
  }, {
    path: '/myLesson',
    name: 'myLesson',
    component: myLesson,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{ //进入详情页面
      path: '/detailsPage',
      name: 'detailsPage',
      component: detailsPage,
    }],
  }, {
    path: '/myCollect',
    name: 'myCollect',
    component: myCollect,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    }
  }, {
    path: '/shareSchool',
    name: 'shareSchool',
    component: shareSchool,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    }
  }, {
    path: '/shareCounty',
    name: 'shareCounty',
    component: shareCounty,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    }
  }, {
    path: '/newCourse',
    name: 'newCourse',
    component: newCourse,
    meta: {
      Authorize: true // 添加该字段，表示进入这个路由是需要登录的
    }
  }, {
    path: '/appList',
    name: 'appList',
    component: appList
  }, {
    path: '/screenPage',
    name: 'screenPage',
    component: screenPage
  }]
})

//添加路由过滤
router.beforeEach((to, from, next) => {
  if (to.meta.Authorize) {
    // 判断该路由是否需要登录权限
    if (window.localStorage.Token) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      window.localStorage.setItem("Token", "");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
