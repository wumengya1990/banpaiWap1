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
            <a @click="$store.commit('switch_dialog')">
                <i class="el-icon-more"></i>
            </a>
        </div>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadPlanList" class="lessonList">
            <ul>
                <li v-for="(course,index) in myPlanList" :key="index">
                    <em v-if="course.shareState == true" class="shareState have">已校共享</em>

                    <div v-if="course.fileType == 2 " class="lessonImg">
                        <img v-bind:src="Imgtype">
                    </div>
                    <div v-else>
                        <img v-bind:src="wordtype" class="lessonImg">
                    </div>

                    <div class="lessonContent">
                        <h4>{{course.planTitle}}</h4>
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
                            <a @click="watchReflect(course.planId,index)">
                                <i class="el-icon-view"></i>查看反思
                            </a>
                            <span>
                                <i class="el-icon-download"></i>
                                {{course.planDownNum}}
                            </span>
                            <span>
                                <i class="el-icon-star-off"></i>
                                {{course.planFavNum}}
                            </span>
                            <span>
                                <i class="icon bpMobile bpMobile-duihuakuang"></i>
                                {{course.planForumNum}}
                            </span>
                        </div>
                        <div class="checkBox">
                            <el-checkbox v-model="course.isSchoolShare" @click.native.prevent="schoolShare(course.planId,index)">校共享</el-checkbox>
                            <el-checkbox v-model="course.isFavor" @click.native.prevent="collection(course.planId,index)">收藏</el-checkbox>
                        </div>
                    </div>
                    <div class="clear"></div>
                </li>
            </ul>
        </van-list>

        <!-- 填写教学反思 -->
        <!-- <div class="tcLayer" v-show="tcshow1">
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
        </div>-->
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
import top from "@/components/top";
import searchTop from "@/components/searchTop";
import screenPage from "@/components/screenPage";
export default {
    name: "shareSchool",
    components: {
        "data-top": top,
        "top-search": searchTop,
        "right-screen": screenPage
    },
    data() {
        return {
            tcshow1: false,
            tcshow2: false,
            pageType: "区县分享",
            planThinkCon: "", //教学反思内容
            searchData: "", //获取头部搜索的内容
            chaundishuju: "", //获取右侧高级筛选的内容
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            xuancengimg: require("./../assets/images/gongnengTb_03.png"), //教学反思的弹层公共的额图片导入
            myPlanList: [], //装载读取的我的备课列表内容
            pageIndex: 1,
            isLoading: false, //列表数据加载中
            loading: false, //列表加载数据
            finished: false, //列表中是否加载了所有数据
            shareCk: false, //分享状态
            addfasiId: "" //添所要添加教学反思的暂时存储教案ID
        };
    },
    mounted() {
        //this.loadPlanList();
    },
    methods: {
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
        //加载列表(isInit:是否清空后重新加载数据)
        loadPlanList: function(isInit) {
            //加载区县分享
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
            }
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
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
                console.log("成功加载区县分享:" + resCount);
                if (isInit == true) {
                    that.myPlanList = res;
                } else {
                    that.myPlanList = that.myPlanList.concat(res);
                }
                that.pageIndex++;
                // 加载状态结束
                that.loading = false;
                that.isLoading = false;
                if (resCount < 10) {
                    that.finished = true;
                }
            });
        },
        //分享到学校
        schoolShare: function(pid, rowIdx) {
            let that = this;
            let plan = that.myPlanList[rowIdx];
            if (plan.userRole == 1 && plan.curUser != plan.belongUserId) {
                that.$vnotify("您没有分享该教案的权限");
                return false;
            }
            let shareState = plan.flagSchool;
            let url = "/beike/api/Plan/SharedPlan";
            let param = { planid: pid, sharetype: 1 };
            if (shareState == 1) {
                url = "/beike/api/Plan/SharedPlanCancel";
            }
            that.$api.get(url, param, res => {
                plan.flagSchool = shareState == 1 ? 0 : 1;
            });
        },
        //收藏教案
        collection: function(pid, rowIdx) {
            let shareState = this.myPlanList[rowIdx].isFavor;
            if (shareState == true) {
                that.$vnotify("已经收藏过该教案");
                return;
            }
            let that = this;
            let url = "/beike/api/Plan/CollectionPlan";
            let param = { planId: pid };
            that.$api.get(url, param, res => {
                this.myPlanList[rowIdx].isFavor = true;
            });
        },
        //查看教学反思
        watchReflect: function(jiaoanid, suoyin) {
            this.tcshow2 = !this.tcshow2;
            let that = this;
            let url = "/beike/api/Plan/GetPlanByPlanID";
            let param = { planId: pid };
            that.$api.get(url, param, res => {
                console.log("教学反思加载成功");
                that.planThinkCon = res.planThink;
            });
        },
        addReflect: function(jiaoanid, suoyin) {
            //打开添加反思
            this.tcshow1 = !this.tcshow1;
            this.addfasiId = jiaoanid;
        },
        savePlanThink: function() {
            //保存教学反思
            let that = this;
            let url = "/beike/api/Plan/GetAreaSharingPlanList";
            let param = { planid: this.addfasiId, val: planThinkCon };
            that.$api.post(url, param, res => {
                console.log(res);
            });
            this.tcshow1 = false;
        }
    }
};
</script>

<style scoped>
.checkBox >>> .el-checkbox + .el-checkbox {
    margin-left: 5px;
}
.el-message-box__wrapper .el-message-box {
    width: auto;
}
</style>
