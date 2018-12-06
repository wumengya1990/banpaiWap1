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
                        <em v-if="course.shareState == true" class="shareState have">
                            已校共享
                        </em>
                        
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
                                <el-checkbox v-model="course.isSchoolShare" @change="countyShare(index)">区共享</el-checkbox>
                                <el-checkbox v-model="course.isCountyShare" @change="collection(index)">收藏</el-checkbox>  
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
            pageType:'区县分享',
            searchData:'',
            chaundishuju:'',
            Imgtype:require('./../assets/images/imgTyle.png'),
            wordtype:require('./../assets/images/wordTyle.png'),
            xuancengimg:require('./../assets/images/gongnengTb_03.png'),   //教学反思的弹层公共的额图片导入
            myPlanList:[],       //装载读取的我的备课列表内容
        }
    },
    mounted(){
        this.loadList1();
    },
    methods:{
        searchCall:function(mes){
            this.searchDataBox = mes;
            console.log(this.searchDataBox);
        },
        headCall:function(mes){
            this.receive = mes;
            console.log(this.receive);
        },
        loadList1:function(){           //加载区县分享
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            that.$api.get(url,null,res => {
                this.myPlanList = res ;
                console.log(this.myPlanList);
                console.log("加载区县共享");

            });
        },
        countyShare:function(suoyin){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
            // let that = this;
            // let url = "/beike/api/Plan/GetAreaSharingPlanList";
            // that.$api.get(url,null,res => {
            //     console.log(res);
            //     this.myPlanList = res ;
            //     console.log( this.myPlanList);
            // });
        },
        collection:function(suoyin){
            // let that = this;
            // let url = "/beike/api/Plan/GetAreaSharingPlanList";
            // that.$api.get(url,null,res => {
            //     console.log(res);
            //     this.myPlanList = res ;
            //     console.log( this.myPlanList);
            // });
        }
        
    }
}
</script>

<style scoped>
    .checkBox >>> .el-checkbox+.el-checkbox{ margin-left: 5px;}
    .el-message-box__wrapper .el-message-box{ width:auto;}
</style>
