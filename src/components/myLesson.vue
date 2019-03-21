<template>
    <div class="myLesson bgmain mianScroll">
        <router-view></router-view>
        <!-- <data-top></data-top> -->
        <top-search :searchData="searchData" v-on:searchBack="searchCall" :pageType="pageName"></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
            <!-- 右侧弹层筛选内容 -->
            <right-screen :thePage="thePage" v-on:headCallBack="headCall" style="z-index:10;"></right-screen>
            <!-- 右侧弹层筛选内容 -->
        </div>
        <div class="suspendTool">
            <router-link to="/newCourse" v-if="$store.state.userRole<4">
                <i class="el-icon-plus"></i>
                <!-- <i class="el-icon-edit"></i> -->
            </router-link>
            <!-- <a class="more" @click="$store.commit('switch_dialog')">
                <i class="icon bpMobile bpMobile-shaixuan"></i>
            </a>-->
            <router-link to="/orientation">
                <i class="el-icon-location-outline"></i>
            </router-link>
        </div>
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="lessonList">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100">
                <ul>
                    <li v-for="(course,index) in myPlanList" :key="index">
                        <!-- <div class="plr10"> -->
                            <mt-cell-swipe
                        :right="[
                            {
                                content: '<span class=\' icon bpMobile bpMobile-delete \'></span>',
                                style: { background: '#FFF', color: '#FFF'},
                                handler: () => deleteSection(index,course.planId)
                            }
                            ]">
                            <div class="lessonListNBox" @click="planDetail(course.planId)">
                                <em v-if="course.isCountyShare == true" class="shareState have">已共享</em>

                                <!-- 文件类型图片展示 -->
                                <div v-if="course.fileType == 1 " class="lessonImg">
                                    <img :src="Imgtype">
                                </div>
                                <div v-if="course.fileType == 2 " class="lessonImg">
                                    <img :src="wordtype">
                                </div>
                                <div v-if="course.fileType == 3 " class="lessonImg">
                                    <img :src="exceltype">
                                </div>
                                <div v-if="course.fileType == 4 " class="lessonImg">
                                    <img :src="ppttype">
                                </div>
                                <div v-if="course.fileType == 5 " class="lessonImg">
                                    <img :src="pdftype">
                                </div>
                                <!-- 文件类型图片展示结束 -->
                                <div class="lessonContent">
                                    <h4>
                                        <span @click="planDetail(course.planId)">{{course.planTitle}}</span>
                                        <!-- <em>
                                <i v-if="course.isFavor==true" class="el-icon-star-on"></i>
                                <i v-else @click="collectPlan(course)" class="el-icon-star-off"></i>
                                        </em>-->
                                    </h4>
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
                                        <a v-if="course.hasPlanThink == false" @click.stop="writeThink(course)">
                                            <i class="el-icon-edit"></i>添加反思
                                        </a>
                                        <a v-else @click.stop="watchThink(course.planId)">
                                            <i class="el-icon-view"></i>查看反思
                                        </a>
                                        <a @click.stop="showOrentation(course.planId)">
                                            <i class="el-icon-location-outline"></i>课程定位
                                        </a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            </mt-cell-swipe>
                        <!-- </div> -->
                    </li>
                </ul>
            </van-list>
        </van-pull-refresh>

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
        <!-- 设置课程定位 -->
        <div class="tcLayer" v-show="tcshow">
            <div class="tcLayerMain">
                <div class="closeBt">
                    <em class="psnA" @click="tcshow =! tcshow"></em>
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
                    <ul class="selectList">
                        <li>
                            <em>
                                <i>*</i>年级
                            </em>
                            <div class="overHide">
                                <el-select v-model="lessonOntime.gradeName" disabled placeholder="请选择" size="small" style="width:90%;"></el-select>
                            </div>
                        </li>
                        <li>
                            <em>
                                <i>*</i>班级
                            </em>
                            <div class="overHide">
                                <el-input v-model="lessonOntime.className" label="班级名称" size="small" style=" width:90%; overflow:hidden;"></el-input>
                            </div>
                        </li>
                        <li>
                            <em>
                                <i>*</i>日期
                            </em>
                            <div class="overHide">
                                <el-date-picker
                                    v-model="lessonOntime.lessonDate"
                                    size="small"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions"
                                    style="width:90%;"
                                ></el-date-picker>
                            </div>
                        </li>
                        <li>
                            <em>
                                <i>*</i>节次
                            </em>
                            <div class="overHide">
                                <el-select v-model="lessonOntime.lessonId" placeholder="请选择" size="small" style="width:90%;">
                                    <el-option v-for="item in lessonOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="LayerBottom psnA psnAC">
                    <el-button style="width:80%;" type="primary" @click="setOrientate()">提交</el-button>
                </div>
            </div>
        </div>
        <!-- 设置课程定位结束 -->
    </div>
</template>

<script>
import top from "@/components/top";
import searchTop from "@/components/searchTop";
import screenPage from "@/components/screenPage";
export default {
    name: "myLesson",
    components: {
        "data-top": top,
        "top-search": searchTop,
        "right-screen": screenPage
    },
    data() {
        return {
            pageName: "我的备课",
            searchData: "",
            pageIndex: 1,
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            exceltype: require("./../assets/images/excel.png"),
            ppttype: require("./../assets/images/ppt.png"),
            pdftype: require("./../assets/images/pdf.png"),
            xuancengimg: require("./../assets/images/gongnengTb_03.png"), //教学反思的弹层公共的额图片导入
            thePage: 1, //1：我的备课,2：学校共享,3：区县贡献
            receive: "",
            show: false,
            tcshow: false, //课程定位显示隐藏
            tcshow1: false, //填写教学反思的弹层显示隐藏
            tcshow2: false, //查看教学反思的弹层显示隐藏
            myPlanList: [], //装载读取的我的备课列表内容
            isLoading: false, //列表数据加载中
            isRefresh: false, //正在刷新数据
            loading: false, //列表加载数据
            finished: false, //列表中是否加载了所有数据
            editPlan: "",
            planThinkCon: "", //装载点击的的备课的教学反思的内
            //课程定位信息
            lessonOntime: {
                planId: "",
                gradeId: "",
                gradeName: "", //课程定位年级内容
                className: "", //课程内定位班级内容
                lessonDate: "", //课程定位设置课程时间
                LessonId: "" //课程定位节次内容
            },
            //日期设置选项
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() < Date.now() - 8.64e7;
            //     }
            // },
            pickerOptions: {
                //日期为一周内的选择时间
                disabledDate(time) {
                    let _now = Date.now(),
                        seven = 7 * 24 * 60 * 60 * 1000,
                        sevenDays = _now + seven;
                    return time.getTime() < _now || time.getTime() > sevenDays; //大于当前的禁止，小于7天前的禁止
                }
            },
            classNumberDW: "",
            lessonOptions: [
                { value: "1", label: "第一节" },
                { value: "2", label: "第二节" },
                { value: "3", label: "第三节" },
                { value: "4", label: "第四节" },
                { value: "5", label: "第五节" },
                { value: "6", label: "第六节" },
                { value: "7", label: "第七节" },
                { value: "8", label: "第八节" }
            ],
            dataOptions: [],
            searchDataBox: ""
        };
    },
    created(){
        this.setList();
    },
    mounted() {
        // this.loadPlanList(true);
        this.$nextTick(function () {
            this.loadPlanList(true);
        });
    },
    methods: {
        //是否请求用户登录
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        setList: function() {
            let that = this;
            if(that.$store.state.haveLogin){
                this.loadPlanList(true);
                return;
            }
            // let that = this;
            let mySource = that.getQueryString("source");
            let myuId = that.getQueryString("uId");
            let mytoken = that.getQueryString("token");
            let dataList = new Object();
            if (!that.$isNull(mySource)) {
                dataList.source = mySource;
            }
            if (!that.$isNull(myuId)) {
                dataList.uId = myuId;
            }
            if (!that.$isNull(mytoken)) {
                dataList.token = mytoken;
            }
            that.formData = dataList;
            let token = dataList.token;
            console.log("开始授权登录");
            const vd = that.$vloading("开始用户中心授权登录...");
            if (dataList != null) {
                let urlp = "/api/account/home";
                that.$api.get(urlp, dataList, res => {
                    if (res.success) {
                        vd.clear();
                        console.log("授权登录成功");
                        // that.$vnotify("授权登录成功，页面跳转中...");
                        that.$store.commit("saveToken", res.token); //保存 token
                        that.$store.commit("saveRole", res.role); //保存 role
                        that.$store.commit("saveLogin", true);
                        this.loadPlanList(true);
                        // setTimeout(function() {
                        //     if (res.role < 4) {
                        //         that.$router.push({ path: "/myLesson" });
                        //     } else {
                        //         that.$router.push({ path: "/shareCounty" });
                        //     }
                        // }, 1500);
                    } else {
                        console.log("授权登录失败");
                        vd.clear();
                        that.$vnotify(res.msg);
                        that.$router.push({ path: "/errorPage" });
                    }
                });
            } else {
                that.$vnotify("参数传递不完整");
                that.$router.push({ path: "/errorPage" });
            }
        },

        //跳转到详情页面
        planDetail: function(planId) {
            this.$router.push({
                path: "/detailsPage",
                query: { planId: planId }
            });
        },
        //点击搜索框查询
        searchCall: function(mes) {
            this.searchData = mes;
            this.loadPlanList(true);
            // console.log(this.searchDataBox);
        },
        //筛选后的查询
        headCall: function(mes) {
            console.log(mes);
            this.receive = mes;
            this.loadPlanList(true);
        },
        TogglePopupMore() {
            this.tab.popupMoreTrigger = !this.tab.popupMoreTrigger;
        },
        //刷新数据
        onRefresh() {
            this.loading = false;
            this.loadPlanList(true);
        },
        //加载我的备课列表(isInit:是否清空后重新加载数据)
        loadPlanList: function(isInit) {
           
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
            let url = "/api/Plan/GetMyPlanList";
            let param = { pageindex: that.pageIndex, val: that.searchData };
            let mes = that.receive;
            if (that.$isNull(mes) == false) {
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
                console.log("成功加载备课:" + resCount);
                // console.log(res);
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
        //收藏教案
        collectPlan(plan) {
            let that = this;
            if (plan.isFavor == true) {
                that.$vnotify("已经收藏过该教案");
                return;
            }
            let kwd = { planid: plan.planId };
            let url = "/api/Plan/CollectionPlan";
            that.$api.get(url, kwd, res => {
                console.log("添加收藏成功");
                plan.isFavor = res;
            });
        },
        //查看教学反思
        watchThink: function(mes) {
            let that = this;
            that.planThinkCon = "";
            let kwd = { planId: mes };
            let url = "/api/Plan/GetPlanByPlanID";
            that.$api.get(url, kwd, res => {
                console.log("教学反思加载成功");
                that.planThinkCon = res.planThink;
            });
            that.tcshow2 = true;
        },
        //弹出教学反思输入框
        writeThink: function(plan) {
            this.planThinkCon = "";
            this.editPlan = plan;
            this.tcshow1 = true;
        },
        //保存教学反思
        savePlanThink() {
            let that = this;
            if (that.$isNull(that.planThinkCon)) {
                that.$vnotify("请输入教学反思");
                return false;
            }
            let pt = {
                planid: that.editPlan.planId,
                planthink: that.planThinkCon
            };
            let url = "/api/Plan/AddPlanThink";
            that.$api.post(url, pt, res => {
                console.log("保存反思成功");
                that.editPlan.planThink = res.planThink;
                that.editPlan.hasPlanThink = true;
                that.planThinkCon = "";
            });
            this.tcshow1 = false;
        },
        //课程定位打开
        showOrentation: function(planId) {
            this.lessonOntime = {
                planId: "",
                gradeId: "",
                gradeName: "", //课程定位年级内容
                className: "", //课程内定位班级内容
                lessonDate: "", //课程定位设置课程时间
                LessonId: "" //课程定位节次内容
            };
            this.tcshow = !this.tcshow;
            let that = this;
            let url = "/api/Plan/GetGradeByPlanId";
            let param = { planid: planId };
            that.$api.get(url, param, res => {
                that.lessonOntime.planId = planId;
                that.lessonOntime.gradeId = res.gradeId;
                that.lessonOntime.gradeName = res.gradeName;
            });
        },
        //保存课时定位
        setOrientate: function() {
            let that = this;
            if (that.$isNull(that.lessonOntime.className) == true) {
                that.$vnotify("请填写班级名称");
                return false;
            }
            if (that.$isNull(that.lessonOntime.lessonDate) == true) {
                that.$vnotify("请选择定位日期");
                return false;
            }
            if (that.$isNull(that.lessonOntime.lessonId) == true) {
                that.$vnotify("请选择定位节次");
                return false;
            }
            let url = "/api/Plan/AddPlanLesson";
            that.$api.post(url, that.lessonOntime, res => {
                that.$vnotify(res.msg);
                console.log(res.msg);
            });
            this.tcshow = false;
        },
        deleteSection: function(pindex,pid) {
            let that = this;
            let url = "/api/Plan/DelPlan";
            let param = {planid:pid};
            that.$api.get(url, param, res => {
                if(res){
                    that.myPlanList.splice(pindex,1);
                }else{
                    that.$vnotify("删除失败");
                }
                
            });
        }
    },
    watch: {
        // isRefresh: function(val) {
        //     if (val == true) {
        //         var div = document.getElementsByClassName(
        //             "van-pull-refresh__loading"
        //         );
        //         if (this.myPlanList.length > 10) {
        //             div.setAttribute("style", "display: none");
        //         } else {
        //             div.setAttribute("style", "display: block");
        //         }
        //     }
        // }
    }
};
</script>

<style scoped>
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
