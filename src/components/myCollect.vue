<template>
    <div class="myCollect bgmain mianScroll">
        <!-- <top></top> -->
        <top-search :searchData="searchData" v-on:searchBack="searchCall" v-bind:pageType="pageType"></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
            <!-- 右侧弹层筛选内容 -->
            <right-screen :thePage="thePage" v-on:headCallBack="headCall" style="z-index:10;"></right-screen>
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
                            <a v-if="course.haveReflect == false" @click="tcshow1 =! tcshow1">
                                <i class="el-icon-edit"></i>添加反思
                            </a>
                            <a v-else @click="tcshow2 =! tcshow2">
                                <i class="el-icon-view"></i>查看反思
                            </a>
                            <a @click="classOrentation()">
                                <i class="icon bpMobile bpMobile-yishiyong"></i>已使用{{course.UseCnt}}
                            </a>
                        </div>
                    </div>
                    <div class="clear"></div>
                </li>
            </ul>
        </van-list>
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
            chaundishuju: "",
            myPlanList: [],
            isLoading: false, //列表数据加载中
            loading: false, //列表加载数据
            finished: false //列表中是否加载了所有数据
        };
    },
    mounted() {
        // this.loadPlanList();
    },
    methods: {
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
            }
            let url = "/beike/api/Plan/GetMyCollectPlanList";
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
        }
    }
};
</script>

<style>
</style>
