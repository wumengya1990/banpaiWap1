import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import links from '@/components/links'
import top from '@/components/top'
import searchTop from '@/components/searchTop'
import myLesson from '@/components/myLesson'
import myCollect from '@/components/myCollect'
import shareSchool from '@/components/shareSchool'
import shareCounty from '@/components/shareCounty'
import newCourse from '@/components/newCourse'
import appList from '@/components/appList'
import screenPage from '@/components/screenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'links'
    },{
      path:'/HelloWorld',
      name:'HelloWorld',
      component: HelloWorld
    },{
      path:'/links',
      name:'links',
      component: links
    },{
      path:'/top',
      name:'top',
      component: top
    },{
      path:'/searchTop',
      name:'searchTop',
      component: searchTop
    },{
      path:'/myLesson',
      name:'myLesson',
      component: myLesson
    },{
      path:'/myCollect',
      name:'myCollect',
      component: myCollect
    },{
      path:'/shareSchool',
      name:'shareSchool',
      component: shareSchool
    },{
      path:'/shareCounty',
      name:'shareCounty',
      component: shareCounty
    },{
      path:'/newCourse',
      name:'newCourse',
      component: newCourse
    },{
      path:'/appList',
      name:'appList',
      component: appList
    },{
      path:'/screenPage',
      name:'screenPage',
      component: screenPage
    }
  ]
})

