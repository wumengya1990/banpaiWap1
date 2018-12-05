<template>
    <div class="searchTop">
        <div class="topBox">
            <div class="searchBox">
                <div class="searchBoxN"> 
                <el-input placeholder="请输入内容" v-model="input5" size="medium" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchSub()"></el-button>
                </el-input>
                </div>
            </div>
            <div class="topNav">
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
    // props:['searchData'],
    data(){
        return{
            inputnr:'',
            input5:''
        }
    },
    methods:{
        searchSub:function(){
            this.$emit('searchBack',this.input5);
        }
    }
}
</script>

<style>

</style>
