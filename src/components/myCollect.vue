<template>
    <div class="myCollect bgmain mianScroll">
        <!-- <top></top> -->
        <top-search
            :searchData="searchData"
            v-on:searchBack="searchCall"
            v-bind:pageType="pageType"
        ></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
            <!-- 右侧弹层筛选内容 -->
            <right-screen
                :chaundishuju="chaundishuju"
                v-on:headCallBack="headCall"
                style="z-index:10;"
            ></right-screen>
            <!-- 右侧弹层筛选内容 -->
        </div>
        <div class="suspendTool">
            <a @click="$store.commit('switch_dialog')">
                <i class="el-icon-more"></i>
            </a>
        </div>

        <div class="lessonList">
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
        </div>
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
            Imgtype:require('./../assets/images/imgTyle.png'),
            wordtype:require('./../assets/images/wordTyle.png'),
            xuancengimg:require('./../assets/images/gongnengTb_03.png'),   //教学反思的弹层公共的额图片导入
            pageType: 1,
            searchData: "",
            pageindex: 1,
            chaundishuju: "",
            myPlanList: []
        };
    },
    mounted() {
        this.loadList1();
    },
    methods: {
        loadList1: function() {
            //加载我的收藏
            let that = this;
            let url = "/beike/api/Plan/GetMyCollectPlanList";
            let param = { pageindex: 1 };
            that.$api.get(url, param, res => {
                this.myPlanList = res;
                console.log(this.myPlanList);
                console.log("我的收藏");
            });
        },
        searchCall: function(mes) {
            this.searchDataBox = mes;
            console.log(this.searchDataBox);
        },
        headCall: function(mes) {
            this.receive = mes;
            console.log(this.receive);
        }
    }
};
</script>

<style>
</style>
