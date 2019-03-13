<template>
    <div class="myCollect bgmain mianScroll">
        <!-- <top></top> -->
        <top-search :searchData="searchData" v-on:searchBack="searchCall" v-bind:pageType="pageType"></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
            <!-- 右侧弹层筛选内容 -->
            <right-screen :thePage="thePage" v-on:headCallBack="headCall" style="z-index:10;"></right-screen>
            <!-- 右侧弹层筛选内容 -->
        </div>
        <!-- <div class="suspendTool">
            <a class="more" @click="$store.commit('switch_dialog')">
                <i class="icon bpMobile bpMobile-shaixuan"></i>
            </a>
        </div> -->
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="lessonList">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadPlanList">
                <ul>
                    <li v-for="(course,index) in myPlanList" :key="index">
                        <mt-cell-swipe
                        :right="[
                            {
                                content: '<span class=\' icon bpMobile bpMobile-delete \'></span>',
                                style: { background: '#FFF', color: '#FFF'},
                                handler: () => deleteSection(index,course.planId)
                            }
                            ]">
                        <div class="lessonListNBox">
                        <em v-if="course.shareState == true" class="shareState have">已校共享</em>
                        
                        <!-- 文件类型图片展示 -->
                        <div v-if="course.fileType == 1 " class="lessonImg">
                            <img :src="Imgtype" @click="planDetail(course.planId)">
                        </div>
                        <div v-if="course.fileType == 2 " class="lessonImg">
                            <img :src="wordtype" @click="planDetail(course.planId)">
                        </div>
                        <div v-if="course.fileType == 3 " class="lessonImg">
                            <img :src="exceltype" @click="planDetail(course.planId)">
                        </div>
                        <div v-if="course.fileType == 4 " class="lessonImg">
                            <img :src="ppttype" @click="planDetail(course.planId)">
                        </div>
                        <div v-if="course.fileType == 5 " class="lessonImg">
                            <img :src="pdftype" @click="planDetail(course.planId)">
                        </div>
                        <!-- 文件类型图片展示结束 -->

                        <div class="lessonContent">
                            <h4 @click="planDetail(course.planId)">{{course.planTitle}}</h4>
                            <p class="synopsis">
                                <span>
                                    <i class="icon bpMobile bpMobile-wode2"></i>
                                    {{course.authorUserName}}
                                </span>
                                <span>
                                    <i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>
                                    {{course.createTime}}
                                </span>
                            </p>
                            <div class="operate">
                                <a @click="watchThink(course.planId)">
                                    <i class="el-icon-view"></i>查看反思
                                </a>
                                <span v-if="course.useCnt!== undefined && course.useCnt > 0">
                                    <i class="icon bpMobile bpMobile-yishiyong"></i>
                                    已使用
                                </span>
                                <span v-else>
                                    <i class="icon bpMobile bpMobile-yishiyong"></i>
                                    未使用
                                </span>
                            </div>
                        </div>
                        <div class="clear"></div>
                        </div>
                        </mt-cell-swipe>
                    </li>
                </ul>
            </van-list>
        </van-pull-refresh>

        <!-- 查看教学反思 -->
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
                        <p v-html="planThinkCon"></p>
                    </div>
                </div>
                <div class="LayerBottom psnA psnAC">
                    <el-button style="width:80%;" type="primary" @click="tcshow1 =! tcshow1">关闭</el-button>
                </div>
            </div>
        </div>
        <!-- 查看教学反思结束 -->
    </div>
</template>

<script>
import top from "@/components/top";
import searchTop from "@/components/searchTop";
import screenPage from "@/components/screenPage";
import $ from "jquery";
export default {
    name: "myCollect",
    components: {
        "data-top": top,
        "top-search": searchTop,
        "right-screen": screenPage
    },
    data() {
        return {
            pageType: "我的收藏",
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            xuancengimg: require("./../assets/images/gongnengTb_03.png"), //教学反思的弹层公共的额图片导入
            thePage: 1, //1：我的备课/收藏,2：学校共享,3：区县贡献
            searchData: "",
            pageIndex: 1,
            tcshow1: false,
            planThinkCon: "",
            myPlanList: [],
            isRefresh: false, //正在刷新数据
            isLoading: false, //列表数据加载中
            loading: false, //列表加载数据
            finished: false //列表中是否加载了所有数据
        };
    },
    mounted() {
        // this.loadPlanList();
    },
    methods: {
        //跳转到详情页面
        planDetail: function(planId) {
            this.$router.push({
                path: "/detailsPage",
                query: { planId: planId }
            });
        },
        //刷新数据
        onRefresh() {
            this.loading = false;
            this.loadPlanList(true);
        },
        //加载我的收藏列表(isInit:是否清空后重新加载数据)
        loadPlanList: function(isInit) {
            //加载我的收藏
            let that = this;
            //判断是否正在加载数据
            if (that.isLoading == false) {
                that.isLoading = true;
            } else {
                return false;
            }
            if (isInit == true) {
                that.finished = false;
                that.pageIndex = 1;
                that.myPlanList = [];
            }
            let url = "/api/Plan/GetMyCollectPlanList";
            let param = { pageindex: that.pageIndex, val: that.searchData };
            let mes = that.receive;
            if (mes != "") {
                for (const key in mes) {
                    if (mes[key] == null || mes[key] == "") {
                        continue;
                    } else if (mes.hasOwnProperty(key)) {
                        param[key] = mes[key];
                    }
                }
            }
            that.$api.get(url, param, res => {
                let resCount = res.length;
                console.log("成功加载我的收藏:" + resCount);
                if (isInit == true) {
                    that.myPlanList = res;
                } else {
                    that.myPlanList = that.myPlanList.concat(res);
                }
                that.pageIndex++;
                // 加载状态结束
                that.loading = false;
                that.isLoading = false;
                that.isRefresh = false;
                if (resCount < 10) {
                    that.finished = true;
                }
            });
        },
        //点击搜索框查询
        searchCall: function(mes) {
            this.searchData = mes;
            this.loadPlanList(true);
        },
        //筛选后查询
        headCall: function(mes) {
            this.receive = mes;
            this.loadPlanList(true);
        },
        //查看教学反思
        watchThink: function(mes) {
            let that = this;
            that.planThinkCon = "";
            let kwd = { planId: mes };
            let url = "/api/Plan/GetPlanByPlanID";
            that.$api.get(url, kwd, res => {
                that.planThinkCon = res.planThink;
            });
            that.tcshow1 = true;
        },
        deleteSection: function(pindex,pid) {
            let that = this;
            let url = "/api/Plan/DelFavPlan";
            let param = {planid:pid};
            that.$api.get(url, param, res => {
                if(res){
                    that.myPlanList.splice(pindex,1);
                }else{
                    that.$vnotify("删除失败");
                }
                
            });
        }
    }
};
</script>

<style scoped>
/* .lessonList ul li .lessonListNBox{ padding: 10px; border-bottom: 1px solid #eaeaea;} */
.lessonList >>> .van-cell {
    line-height: normal;
}
.lessonList >>> .mint-cell-wrapper {
    background: none;
}
.lessonList >>> .mint-cell-title {
    display: none;
}
.lessonList >>> .mint-cell-swipe-button {
    line-height: 90px;
}
.lessonList >>> .mint-cell-swipe-button span{ margin:27px 0 0; font-size: 22px; width: 40px; height: 40px; display: block; line-height: 40px; text-align: center; border-radius: 50%; background: #F00;}

</style>
