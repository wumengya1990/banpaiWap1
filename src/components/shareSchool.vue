<template>
    <div class="shareSchool mianScroll bgmain">
        <!-- <top></top> -->
        <top-search :searchData="searchData" v-on:searchBack="searchCall" v-bind:pageType="pageType"></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
        <!-- 右侧弹层筛选内容 -->
            <right-screen :chaundishuju="chaundishuju" v-on:headCallBack="headCall" style="z-index:10;"></right-screen>  
        <!-- 右侧弹层筛选内容 -->
        </div>
        <div class="suspendTool">
            <router-link to="/newCourse"><i class="el-icon-plus"></i></router-link>
            <a @click="$store.commit('switch_dialog')"><i class="el-icon-more"></i></a>
        </div>

        <div class="lessonList">
           
            <ul>
                <li v-for="(course,index) in myPlanList" :key="index">
                        <em v-if="course.shareState == true" class="shareState have">已共享</em>
                        <!-- <div class="lessonImg"><img v-bind:src="course.imgUrl"></div> -->

                        <div v-if="course.fileType == 2 " class="lessonImg">
                            <img v-bind:src="Imgtype">
                        </div>
                        <div v-else>
                            <img v-bind:src="wordtype" class="lessonImg">
                        </div>

                        <div class="lessonContent">
                            <h4>{{course.planTitle}}</h4>
                            <p class="synopsis"><span><i class="icon bpMobile bpMobile-wode2"></i>{{course.authorUserName}}</span><span><i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>{{course.createTime}}</span>   
                            </p>
                            <div class="operate">
                                <a v-if="course.haveReflect == false" @click="tcshow1 =! tcshow1"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="tcshow2 =! tcshow2"><i class="el-icon-view"></i>查看反思</a>
                                <span><i class="el-icon-download"></i>{{course.planDownNum}}</span>
                                <span><i class="el-icon-star-off"></i>{{course.planFavNum}}</span>
                                <span><i class="icon bpMobile bpMobile-duihuakuang"></i>{{course.planForumNum}}</span>
                            </div>
                            <div class="checkBox">
                                <el-checkbox v-model="course.isSchoolShare">校共享</el-checkbox>
                                <el-checkbox v-model="course.isCountyShare">区共享</el-checkbox>
                                <el-checkbox v-model="course.isCollection">收藏</el-checkbox>  
                            </div>
                        </div>
                        <div class="clear"></div>
                </li>
             </ul>
        </div>
    </div>
</template>

<script>
import top from '@/components/top'
import searchTop from '@/components/searchTop'
import screenPage from '@/components/screenPage'
export default {
    name:"shareSchool",
    components:{
    'data-top':top,
    'top-search':searchTop,
    'right-screen':screenPage
    },
    data(){
        return{
            pageType:'学校分享',
            searchData:'',
            chaundishuju:'',
            Imgtype:require('./../assets/images/imgTyle.png'),
            wordtype:require('./../assets/images/wordTyle.png'),
            xuancengimg:require('./../assets/images/gongnengTb_03.png'),   //教学反思的弹层公共的额图片导入
            myPlanList:[]
        }
    },
    mounted(){
        this.loadList1();
    },
    methods:{
        loadList1:function(){    //加载学校分享
            let that = this;
            let url = "/beike/api/Plan/GetSchoolSharingPlanList";
            that.$api.get(url,null,res => {
                this.myPlanList = res ;
                console.log(this.myPlanList);
                console.log('加载学校分享');
            });
        },
        searchCall:function(mes){
            this.searchDataBox = mes;
            console.log(this.searchDataBox);
        },
        headCall:function(mes){
            this.receive = mes;
            console.log(this.receive);
        }
    }
}
</script>

<style scoped>
    .checkBox >>> .el-checkbox+.el-checkbox{ margin-left: 5px;}
</style>
