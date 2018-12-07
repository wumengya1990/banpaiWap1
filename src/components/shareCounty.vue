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
                                <a v-if="course.hasPlanThink == false" @click="addReflect(course.planId,index)"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="watchReflect(course.planId,index)"><i class="el-icon-view"></i>查看反思</a>
                                <span><i class="el-icon-download"></i>{{course.planDownNum}}</span>
                                <span><i class="el-icon-star-off"></i>{{course.planFavNum}}</span>
                                <span><i class="icon bpMobile bpMobile-duihuakuang"></i>{{course.planForumNum}}</span>
                            </div>
                            <div class="checkBox">
                                <el-checkbox v-model="course.isSchoolShare" @change="countyShare(course.planId,index)">区共享</el-checkbox>
                                <el-checkbox v-model="course.isCountyShare" @change="collection(course.planId,index)">收藏</el-checkbox>  
                            </div>
                        </div>
                        <div class="clear"></div>
                </li>
             </ul>
        </div>

        <!-- 填写教学反思 -->
        <div class="tcLayer" v-show="tcshow1">
            <div class="tcLayerMain">
                <div class="closeBt">
                    <em class="psnA" @click="tcshow1 =! tcshow1"></em>
                </div>
                <div class="LayerTop">
                    <dl>
                        <dt>
                            <img :src="this.xuancengimg">
                        </dt>
                        <dd>教学反思</dd>
                    </dl>
                </div>
                <div class="LayerCenter">
                    <div class="textareaBox">
                        <textarea v-model="planThinkCon" placeholder="请输入内容"></textarea>
                    </div>
                </div>
                <div class="LayerBottom psnA psnAC">
                    <el-button @click="savePlanThink" type="primary" style="width:80%;">提交</el-button>
                </div>
            </div>
        </div>
        <!-- 填写教学反思结束 -->
        <!-- 查看教学反思 -->
        <div class="tcLayer" v-show="tcshow2">
            <div class="tcLayerMain">
                <div class="closeBt">
                    <em class="psnA" @click="tcshow2 =! tcshow2"></em>
                </div>
                <div class="LayerTop">
                    <dl>
                        <dt>
                            <img :src="this.xuancengimg">
                        </dt>
                        <dd>教学反思</dd>
                    </dl>
                </div>
                <div class="LayerCenter">
                    <div class="textareaBox">
                        <p v-html="planThinkCon"></p>
                    </div>
                </div>
                <div class="LayerBottom psnA psnAC">
                    <el-button style="width:80%;" type="primary" @click="tcshow2 =! tcshow2">关闭</el-button>
                </div>
            </div>
        </div>
        <!-- 查看教学反思结束 -->

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
            tcshow1:false,
            tcshow2:false,
            pageType:'区县分享',
            planThinkCon:'',     //教学反思内容
            searchData:'',       //获取头部搜索的内容
            chaundishuju:'',     //获取右侧高级筛选的内容      
            Imgtype:require('./../assets/images/imgTyle.png'),
            wordtype:require('./../assets/images/wordTyle.png'),
            xuancengimg:require('./../assets/images/gongnengTb_03.png'),   //教学反思的弹层公共的额图片导入
            myPlanList:[],       //装载读取的我的备课列表内容
            addfasiId:''           //添所要添加教学反思的暂时存储教案ID
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
        countyShare:function(jiaoanid,suoyin){
            let shareState = this.myPlanList[suoyin].isCountyShare;
            console.log(shareState);
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            let param= {planId:jiaoanid, val:!shareState};
            that.$api.get(url,param,res => {
                this.myPlanList[suoyin].isCountyShare = res;
            });
        },
        collection:function(jiaoanid,suoyin){
            let shareState = this.myPlanList[suoyin].isCollection;
            console.log(shareState);
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            let param= {planId:jiaoanid, val:!shareState};
            that.$api.get(url,param,res => {
                this.myPlanList[suoyin].isCollection = res;
            });
        },
        watchReflect:function(jiaoanid,suoyin){
            this.tcshow2 =! this.tcshow2
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            let param= {planId:jiaoanid};
            that.$api.get(url,param,res => {
                this.myPlanList[suoyin].planThink = res.planThink;
            });
        },
        addReflect:function(jiaoanid,suoyin){                //打开添加反思
            this.tcshow1 =! this.tcshow1
            this.addfasiId = jiaoanid;
        },
        savePlanThink:function(){           //保存教学反思           
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            let param= {planid:this.addfasiId,val:planThinkCon};
            that.$api.post(url,param,res => {
                console.log(res);
            });
             this.tcshow1 = false;
        }
        
    }
}
</script>

<style scoped>
    .checkBox >>> .el-checkbox+.el-checkbox{ margin-left: 5px;}
    .el-message-box__wrapper .el-message-box{ width:auto;}
</style>
