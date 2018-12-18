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
                <section v-if="planDetails.fileType > 1 && !$isNull(planDetails.planDesign)">
                    <h4>教案设计</h4>
                    <ul class="ImgList">
                        <li>
                            <a class="fileImg" href="javascript:;">
                                <img :src="wordtype">
                                <!-- <img v-else :src="wordtype"> -->
                            </a>
                            <div class="overHide">
                                <!-- <a
                                    v-if="planDetails.fileType == 1"
                                    href="javascript:;"
                                    @click="ImgPreview(planDetails.itemOrder)"
                                >{{planDetails.planDesign}}</a>-->
                                <a :href="$store.state.apiUrl+ '/BKFiles/'+planDetails.planDesignPath">{{planDetails.planDesign}}</a>
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
                                    <a v-if="f.fileType == 1" href="javascript:;" @click="ImgPreview(f.itemOrder)">{{f.name}}</a>
                                    <a v-else :href="$store.state.apiUrl+ '/BKFiles/'+f.path">{{f.name}}</a>
                                </div>
                                <div class="clear"></div>
                            </li>
                        </ul>
                    </template>
                </section>
                <section>
                    <h4>教案评论</h4>
                    <div class="commentBox">
                        <article>
                            <dl>
                                <dt><img :src="morentouxiang"></dt>
                                <dd>
                                    <h5><span>张洋</span><time>13:00</time></h5>
                                    <div class="nrCon">
                                        <p>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</p>
                                    </div>
                                </dd>
                            </dl>
                            <div class="clear"></div>
                        </article>
                        <article>
                            <dl>
                                <dt><img :src="morentouxiang"></dt>
                                <dd>
                                    <h5><span>张洋</span><time>13:00</time></h5>
                                    <div class="nrCon">
                                        <p>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</p>
                                    </div>
                                </dd>
                            </dl>
                            <div class="clear"></div>
                        </article>
                    </div>
                    
                </section>
            </div>
        </div>
        <div class="establishBut">
            <el-button round @click="pageBack()">返回</el-button>
        </div>
    </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
    name: "detailsPage",
    data() {
        return {
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            morentouxiang: require("./../assets/images/userImg.png"),
            planDetails: {
                planId: "",
                planTitle: "",
                planRemark: "",
                belongUserId: "",
                belongUserName: "",
                createTime: "",
                planFileList: []
            },
            imglist: []
        };
    },
    mounted() {
        // this.$store.commit("saveApiUrl", window.localStorage.ApiUrl); //保存 ApiUrl
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
                let imgIdx = 0;
                let pcUrl = that.$store.state.apiUrl;
                //处理教案设计中的附件
                // if (
                //     !that.$isNull(res.planDesignPath) &&
                //     !that.$isNull(res.planDesign) &&
                //     res.fileType == 1
                // ) {
                //     res.itemOrder = imgIdx;
                //     that.imglist.push(pcUrl + res.planDesignPath);
                //     imgIdx++;
                // }
                for (let i = 0; i < res.planFileList.length; i++) {
                    let pf = res.planFileList[i];
                    if (pf.fileType == 1) {
                        pf.itemOrder = imgIdx;
                        that.imglist.push(pcUrl + "/BKFiles/" + pf.path);
                        imgIdx++;
                    }
                }
                that.planDetails = res;
                console.log(that.planDetails);
            });
        },
        //显示图片预览
        ImgPreview(imgIdx) {
            let that = this;
            const instance = ImagePreview({
                images: that.imglist,
                startPosition: typeof imgIdx === "number" ? imgIdx : 0
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
