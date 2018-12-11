<template>
    <div class="details bgmain mianScroll">
        <div class="establish mianScroll">
            <div class="detailsBox">
                <section>
                    <h4>教案标题</h4>
                    <article>
                        <p>{{planDetails.planTitle}}</p>
                    </article>
                </section>
                <section>
                    <h4>教案位置</h4>
                    <article>
                        <p>{{planDetails.planRemark}}</p>
                    </article>
                </section>
                <section>
                    <h4>基本信息</h4>
                    <ul>
                        <li>
                            <em>发布人</em>
                            <div class="overHide">
                                <div class="detailCon">{{planDetails.belongUserName}}</div>
                            </div>
                        </li>
                        <li>
                            <em>发布时间</em>
                            <div class="overHide">
                                <div class="detailCon">{{planDetails.createTime}}</div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section v-if="!$isNull(planDetails.planDesign)">
                    <h4>教案设计</h4>
                    <ul class="ImgList">
                        <li>
                            <a class="fileImg" href="javascript:;">
                                <img v-if="planDetails.fileType == 1" :src="Imgtype">
                                <img v-else :src="wordtype">
                            </a>
                            <div class="overHide">
                                <a :href="$store.state.rootUrl+'/'+planDetails.planDesignPath">{{planDetails.planDesign}}</a>
                            </div>
                            <div class="clear"></div>
                        </li>
                    </ul>
                </section>
                <section>
                    <h4>教案素材</h4>
                    <template v-for="f in planDetails.planFileList">
                        <ul v-if="planDetails.planDesignPath!=f.path" class="ImgList" :key="f.id">
                            <li>
                                <a class="fileImg" href="javascript:;">
                                    <img v-if="f.fileType==1" :src="Imgtype">
                                    <img v-else :src="wordtype">
                                </a>
                                <div class="overHide">
                                    <a :href="$store.state.rootUrl+'/'+f.path">{{f.name}}</a>
                                </div>
                                <div class="clear"></div>
                            </li>
                        </ul>
                    </template>
                </section>
            </div>
        </div>
        <div class="establishBut">
            <el-button round @click="pageBack()">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "detailsPage",
    data() {
        return {
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            planDetails: {
                planId: "",
                planTitle: "",
                planRemark: "",
                belongUserId: "",
                belongUserName: "",
                createTime: "",
                planFileList: []
            }
        };
    },
    mounted() {
        this.loadPlanDetails();
    },
    methods: {
        pageBack: function() {
            this.$router.back(-1);
        },
        loadPlanDetails: function() {
            let that = this;
            const vd = that.$vloading();
            let pId = that.$route.query.planId;
            let url = "/api/Plan/GetPlanDetails";
            let param = { planid: pId };
            that.$api.get(url, param, res => {
                console.log("成功加载备课详情");
                vd.clear();
                that.planDetails = res;
            });
        }
    }
};
</script>

<style>
.details {
    z-index: 20;
}
</style>
