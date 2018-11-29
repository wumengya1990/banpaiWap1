<template>
<div class="links">
    <router-link to="/HelloWorld">欢迎页面</router-link>
    <router-link to="/top">顶部页面</router-link>
    <router-link to="/searchTop">顶部搜索</router-link>
    <router-link to="/myLesson">我的备课</router-link>
    <router-link to="/shareSchool">学校共享</router-link>
    <router-link to="/shareCounty">区县共享</router-link>
    <router-link to="/myCollect">我的收藏</router-link>
    <router-link to="/newCourse">创建新教案</router-link>
    <router-link to="/screenPage">筛选页面</router-link>
</div>
    
</template>

<script>
export default {
    name:'links'
}
</script>

<style>
.links a{display:block; width:80%; height:40px; line-height: 40px; background: #FF7F00; color: #ffffff; font-size: 16px; text-align: center; margin: 10px auto; border-radius: 8px;}
</style>
