<template>
    <div class="searchTop">
        <div class="topBox">
            <div class="searchBox">
                <div class="searchBoxN"> 
                <el-input suffix-icon="el-icon-search" v-model="inputnr" placeholder="按照教案名称/作者搜素"></el-input>
                </div>
            </div>
            <div class="topNav">
            	<!-- <span onclick="window.location.href='myLessons.html'">我的备课</span>
            	<span onclick="window.location.href='share.html'">学校共享</span>
            	<span onclick="window.location.href='share1.html'">区县共享</span>
            	<span onclick="window.location.href='myCollection.html'">我的收藏</span> -->
                <router-link active-class="on" to="/myLesson">我的备课</router-link>
                <router-link active-class="on" to="/shareSchool">学校共享</router-link>
                <router-link active-class="on" to="/shareCounty">区县共享</router-link>
                <router-link active-class="on" to="/myCollect">我的收藏</router-link>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:'searchTop',
    data(){
        return{
            inputnr:''
        }
    }
}
</script>

<style>

</style>
