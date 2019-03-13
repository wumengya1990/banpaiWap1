<template>
    <div class="details bgmain mianScroll">
        <div class="establish mianScroll">
            <div class="detailsBox">
                <!-- 教案基础信息 -->
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
                <!-- 教案基础信息结束 -->
                <!-- 教案设计与素材的附件 -->
                <section v-if="planDetails.planFileList!=null && planDetails.planFileList.length > 0">
                    <h4>教案设计</h4>
                    <template v-for="f in planDetails.planFileList">
                        <a :href="gethref(f,1)" :key="f.id" :download="f.name" @click="fileClick(f,1)">
                            <ul class="ImgList">
                                <li>
                                    <a class="fileImg" :href="gethref(f,1)">
                                        <img v-if="f.fileType==1" :src="Imgtype">
                                        <img v-else-if="f.fileType==2" :src="wordtype">
                                        <img v-else-if="f.fileType==3" :src="exceltype">
                                        <img v-else-if="f.fileType==4" :src="ppttype">
                                        <img v-else-if="f.fileType==5" :src="pdftype">
                                    </a>
                                    <div class="overHide">
                                        <a :href="gethref(f,1)" :download="f.name">{{f.name}}</a>
                                    </div>
                                    <div class="clear"></div>
                                </li>
                            </ul>
                        </a>
                    </template>
                </section>
                <section v-if="planDetails.planMatList!=null && planDetails.planMatList.length>0">
                    <h4>教案素材</h4>
                    <template v-for="f in planDetails.planMatList">
                        <a :href="gethref(f,2)" :key="f.matId" :download="f.matTitle + '.' + f.matExt" @click="fileClick(f,2)">
                            <ul class="ImgList">
                                <li>
                                    <a class="fileImg" :href="gethref(f,2)">
                                        <img v-if="f.matTypeId==1" :src="Imgtype">
                                        <img v-else-if="f.matTypeId==2" :src="wordtype">
                                        <img v-else-if="f.matTypeId==3" :src="exceltype">
                                        <img v-else-if="f.matTypeId==4" :src="ppttype">
                                        <img v-else-if="f.matTypeId==5" :src="pdftype">
                                    </a>
                                    <div class="overHide">
                                        <a :href="gethref(f,2)" :download="f.matTitle + '.' + f.matExt">{{f.matTitle + "." + f.matExt}}</a>
                                    </div>
                                    <div class="clear"></div>
                                </li>
                            </ul>
                        </a>
                    </template>
                </section>
                <!-- 教案设计与素材的附件结束 -->
                <!-- 教案分析 -->
                <section v-if="bkConfig.planGoal">
                    <h4>教案分析</h4>
                    <ul>
                        <li>
                            <em>教学目标</em>
                            <div class="overHide">
                                <article>
                                    <p>{{planDetails.planGoal}}</p>
                                </article>
                            </div>
                        </li>
                        <li>
                            <em>重点难点</em>
                            <div class="overHide">
                                <article>
                                    <p>{{planDetails.planImport}}</p>
                                </article>
                            </div>
                        </li>
                        <li>
                            <em>教学准备</em>
                            <div class="overHide">
                                <article>
                                    <p>{{planDetails.planReady}}</p>
                                </article>
                            </div>
                        </li>
                    </ul>
                </section>
                <!-- 教案分析结束 -->
                <!-- 板书设计 -->
                <section v-if="bkConfig.planBlack">
                    <h4>板书设计</h4>
                    <article>
                        <p>{{planDetails.planBlack}}</p>
                    </article>
                </section>
                <!-- 板书设计结束 -->
                <!-- 课堂练习 -->
                <section v-if="bkConfig.planExe">
                    <h4>课堂练习</h4>
                    <article>
                        <p>{{planDetails.planExe}}</p>
                    </article>
                </section>
                <!-- 课堂练习结束 -->
                <!-- 作业布置 -->
                <section v-if="bkConfig.planWork">
                    <h4>作业布置</h4>
                    <article>
                        <p>{{planDetails.planWork}}</p>
                    </article>
                </section>
                <!-- 作业布置结束 -->
                <!-- 教学反思 -->
                <section v-if="bkConfig.planThink">
                    <h4>教学反思</h4>
                    <article>
                        <p>{{planDetails.planThink}}</p>
                    </article>
                </section>
                <!-- 教学反思结束 -->
                <!-- 学案设计 -->
                <section v-if="bkConfig.planLearn">
                    <h4>学案设计</h4>
                    <article>
                        <p>{{planDetails.planLearn}}</p>
                    </article>
                </section>
                <!-- 学案设计结束 -->
                <section>
                    <h4>教案评论</h4>
                    <div class="commentBox">
                        <div class="writeBox">
                            <el-rate v-model="leaveMessageCpntent.ForumStar" style="margin:0 0 10px;"></el-rate>
                            <el-input type="textarea" :rows="4" placeholder="请输入教案评论内容" v-model="leaveMessageCpntent.ForumContent"></el-input>
                            <div class="bts">
                                <el-button type="primary" size="mini" @click="subComment()">提交评论</el-button>
                            </div>
                        </div>
                        <article v-for="(pinglun,index) in planForum" :key="index">
                            <dl>
                                <dt>
                                    <img :src="morentouxiang">
                                </dt>
                                <dd>

                                    <h5>
                                        <span>{{pinglun.forumUserName}}</span>
                                        <time>{{pinglun.forumTime}}</time>
                                        <a class="drop" v-show="pinglun.isMe" @click="dropMyLeaveMessage(index,pinglun.forumId)">
                                            <i class="el-icon-delete"></i>
                                        </a>
                                    </h5>

                                    <div class="star">
                                        <el-rate v-model="pinglun.forumStar" disabled text-color="#ff9900"></el-rate>
                                    </div>
                                    <div class="nrCon">
                                        <p>{{pinglun.forumContent}}</p>
                                    </div>
                                </dd>
                            </dl>
                            <div class="clear"></div>
                        </article>
                    </div>
                </section>
                <section>
                    <div class="changeButton" v-if="planDetails.isMine">
                        <!-- <div class="changeButton"> -->
                        <el-button style="width:80%;" type="primary" @click="changeContent()">修改备课内容</el-button>
                    </div>
                </section>
            </div>
        </div>
        <div class="establishBut">
            <el-button-group style="width:80%;">
                <el-button style="width:100%;" @click="pageBack()">返回</el-button>
                <!-- <el-button style="width:50%;" @click="pageBack()">返回</el-button>
                <el-button style="width:50%;" type="primary">编辑</el-button>-->
            </el-button-group>
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
            exceltype: require("./../assets/images/excel.png"),
            ppttype: require("./../assets/images/ppt.png"),
            pdftype: require("./../assets/images/pdf.png"),
            morentouxiang: require("./../assets/images/userImg.png"),
            bkConfig: "",
            planDetails: {
                planId: "",
                planTitle: "",
                planRemark: "",
                belongUserId: "",
                belongUserName: "",
                createTime: "",
                planFileList: []
            },
            pdimglist: [],
            pmimglist: [],
            planForum: [],
            leaveMessageCpntent: {
                PlanId: 0,
                ForumStar: 0,
                ForumContent: ""
            }
        };
    },
    mounted() {
        // this.$store.commit("saveApiUrl", window.localStorage.ApiUrl); //保存 ApiUrl
        this.loadConfig();
        this.loadPlanDetails();
        this.loadLeaveMessage();
    },
    methods: {
        pageBack: function() {
            this.$router.back(-1);
        },
        //加载配置
        loadConfig() {
            let url = "/api/Plan/GetPlanConfig";
            let the = this;
            the.$api.get(url, null, data => {
                the.bkConfig = data;
            });
        },
        //初始化教案详情
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
                for (let i = 0; i < res.planFileList.length; i++) {
                    let pf = res.planFileList[i];
                    if (pf.fileType == 1) {
                        pf.itemOrder = imgIdx;
                        that.pdimglist.push(pcUrl + "/BKFiles/" + pf.path);
                        imgIdx++;
                    }
                }
                //处理课堂素材附件
                imgIdx = 0;
                for (let i = 0; i < res.planMatList.length; i++) {
                    let mf = res.planMatList[i];
                    if (mf.matTypeId == 1) {
                        mf.itemOrder = imgIdx;
                        that.pmimglist.push(pcUrl + "/BKFiles/" + mf.matPath);
                        imgIdx++;
                    }
                }
                that.planDetails = res;
            });
        },
        //读取本教案啊的评价留言
        loadLeaveMessage: function() {
            let that = this;
            let pId = that.$route.query.planId;
            let url = "/api/Plan/GetForumByPlanId";
            let param = { planid: pId };
            that.$api.get(url, param, res => {
                that.planForum = res;
            });
        },
        gethref(f, ptype) {
            let the = this;
            let href = "javascript:;";
            // if (ptype == 1) {
            //     if (f.fileType > 1) {
            //         href = the.$store.state.apiUrl + "/BKFiles/" + f.path;
            //     }
            // } else {
            //     if (f.matTypeId > 1) {
            //         href = the.$store.state.apiUrl + "/BKFiles/" + f.matPath;
            //     }
            // }
            return href;
        },
        //点击附件
        fileClick(f, ptype) {
            let the = this;
            if (ptype == 1) {
                if (f.fileType == 1) {
                    the.ImgPreview(the.pdimglist, f.itemOrder);
                } else {
                    the.$api.openFile(f.name, f.path);
                }
            } else {
                if (f.matTypeId == 1) {
                    the.ImgPreview(the.pmimglist, f.itemOrder);
                } else {
                    the.$api.openFile(f.matTitle + "." + f.matExt, f.matPath);
                    // // let param = {
                    //     fileName: f.matTitle + "." + f.matExt,
                    //     filePath: f.matPath
                    // };
                    // the.$api.downloadFile("/api/Base/DownLoad", param);
                }
            }
        },
        //显示图片预览
        ImgPreview(pimglist, imgIdx) {
            let that = this;
            const instance = ImagePreview({
                
                images: pimglist,
                startPosition: typeof imgIdx === "number" ? imgIdx : 0
            });
        },
        //提交教案评价
        subComment: function() {
            let that = this;
            let errMsg = "";
            if (that.writeLeaveMessage == "") {
                errMsg += "请填写教案评论内容";
            }
            if (errMsg != "") {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    showClose: true,
                    type: "warning",
                    duration: 5000,
                    message: errMsg
                });
                return false;
            }
            const vd = that.$vloading("保存中...");
            let url = "/api/Plan/ForumPlan";
            that.leaveMessageCpntent.planId = that.$route.query.planId;
            that.$api.post(url, that.leaveMessageCpntent, data => {
                vd.clear();
                that.loadLeaveMessage();
                //console.log(data.msg);
                that.$vnotify(data.msg);
            });
            that.writeLeaveMessage="";
        },
        dropMyLeaveMessage(leaveIndex,leaveID){                //删除内容
            let that = this;
            let url = "/api/Plan/DelPlanForum";
            let params = { planforumid:leaveID };
            that.$api.get(url, params, res => {
                if(res){
                    that.planForum.splice(leaveIndex,1);
                }else{
                    that.$vnotify("删除失败");
                }
                
            });

        },
        changeContent(){                //修改备课内容
            let that = this;
            let pId = that.$route.query.planId;
            this.$router.push({
                path: "/reviseCourse",
                query: { planId: pId }
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
