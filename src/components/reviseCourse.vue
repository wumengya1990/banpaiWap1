<template>
    <div class="newCourse mianScroll bgmain">
        <div class="establish mianScroll">
            <div class="establishBox">
                <h4>
                    <span>教案基本属性</span>
                </h4>
                <ul>
                    <li>
                        <em>
                            <i>*</i>教案位置
                        </em>
                        <div class="overHide">
                            <el-treeselect
                                :multiple="false"
                                :data="treeNodes"
                                :props="treeprops"
                                placeholder="请选择教案位置"
                                :search="nodeSearch"
                                :clickParent="selParent"
                                v-model="teachPlan.planRemark"
                                @nodeClick="nodeClick"
                                style="width:100%;"
                            ></el-treeselect>
                        </div>
                    </li>
                    <li>
                        <em>
                            <i>*</i>教案名称
                        </em>
                        <div class="overHide">
                            <el-input v-model="teachPlan.planTitle" placeholder="请输入内容"></el-input>
                        </div>
                    </li>
                    <li>
                        <em>课时数</em>
                        <div class="overHide">
                            <el-input-number v-model="teachPlan.timeId" :min="1" :max="50" label="课时数量"></el-input-number>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 教案设计 -->
            <div v-if="bkConfig.planDesign" class="establishBox">
                <h4>
                    <span>教案设计1</span>
                </h4>
                <ul>
                    <li>
                        <div class="overHide" style="padding:0 0 0 10px">
                            <el-upload
                                class="upload-demo"
                                action="/api/Plan/UploadPlanFile"
                                :loadingTxt="loadTxt"
                                :http-request="pdUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="pdfileChange"
                                :before-upload="beforeUpload"
                                :file-list="teachPlan.planFileList"
                                list-type="picture"
                                accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
                            >
                            <!-- :file-list="teachPlan.planFileList" -->
                                <el-button size="small" type="primary">上传设计</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过10MB</div>
                            </el-upload>
                            <div class="clear"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 教案设计结束 -->
            <!-- 课堂素材 -->
            <div v-if="bkConfig.planMat && showMat" class="establishBox">
                <h4>
                    <span>课堂素材</span>
                </h4>
                <ul>
                    <li>
                        <div class="overHide" style="padding:0 0 0 10px">
                            <el-upload
                                class="upload-demo"
                                action="/api/Plan/UploadPlanFile"
                                :loadingTxt="loadTxt"
                                :http-request="pmUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="pmfileChange"
                                :before-upload="beforeUpload"
                                :file-list="pmfiles"
                                list-type="picture"
                                accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP, image/*"
                                 capture="camera" 
                            >
                                <el-button size="small" type="primary">上传素材</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过10MB</div>
                            </el-upload>
                            <div class="clear"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 课堂素材结束 -->
            <!-- 教材分析 -->
            <div v-if="bkConfig.planGoal" class="establishBox">
                <h4>
                    <span>教案分析</span>
                </h4>
                <ul>
                    <li>
                        <em>教学目标</em>
                        <div class="overHide">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planGoal"></el-input>
                        </div>
                    </li>
                    <li>
                        <em>重点难点</em>
                        <div class="overHide">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planImport"></el-input>
                        </div>
                    </li>
                    <li>
                        <em>教学准备</em>
                        <div class="overHide">
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planReady"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 教材分析结束 -->
            <!-- 板书设计 -->
            <div v-if="bkConfig.planBlack" class="establishBox">
                <h4>
                    <span>板书设计</span>
                </h4>
                <div class="textareaBox">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planBlack"></el-input>
                </div>
            </div>
            <!-- 板书设计结束 -->
            <!-- 课堂练习 -->
            <div v-if="bkConfig.planExe" class="establishBox">
                <h4>
                    <span>课堂练习</span>
                </h4>
                <div class="textareaBox">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planExe"></el-input>
                </div>
            </div>
            <!-- 课堂练习结束 -->
            <!-- 作业布置 -->
            <div v-if="bkConfig.planWork" class="establishBox">
                <h4>
                    <span>作业布置</span>
                </h4>
                <div class="textareaBox">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planWork"></el-input>
                </div>
            </div>
            <!-- 作业布置结束 -->
            <!-- 教学反思 -->
            <div v-if="bkConfig.planThink" class="establishBox">
                <h4>
                    <span>教学反思</span>
                </h4>
                <div class="textareaBox">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planThink"></el-input>
                </div>
            </div>
            <!-- 教学反思结束 -->
            <!-- 学案设计 -->
            <div v-if="bkConfig.planLearn" class="establishBox">
                <h4>
                    <span>学案设计</span>
                </h4>
                <div class="textareaBox">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="teachPlan.planLearn"></el-input>
                </div>
            </div>
            <!-- 学案设计结束 -->
            <!-- 资源共享 -->
            <div class="establishBox">
                <h4>
                    <span>资源共享</span>
                </h4>
                <ul>
                    <!-- <li>
                        <div style="margin:0 10px;">
                            <el-button type="primary" size="small">素材库选择</el-button>
                            <el-button type="primary" size="small">网络引用</el-button>
                            <el-button type="primary" size="small">站点推荐</el-button>
                        </div>
                    </li>-->
                    <li style="margin:0 0 0 10px;">
                        <el-checkbox true-label="1" false-label="0" v-model="teachPlan.FlagSchool">学校共享</el-checkbox>
                        <el-checkbox true-label="1" false-label="0" v-model="teachPlan.FlagArea">区县共享</el-checkbox>
                    </li>
                </ul>
            </div>
            <!-- 资源共享结束 -->
        </div>

        <div class="establishBut">
            <el-button-group style="width:80%;">
                <el-button style="width:50%;" @click="pageBack()">返回</el-button>
                <el-button style="width:50%;" type="primary" @click="savePlan()">保存教案</el-button>
            </el-button-group>
            <!-- <el-button type="primary" round @click="savePlan()">保存教案</el-button> -->
        </div>
    </div>
</template>

<script>
import elTreeselect from "el-tree-select";
import axios from 'axios'

export default {
    name: "newCourse",
    components: { elTreeselect },
    data() {
        return {
            loadTxt: "文件上传中....",
            treeNodes: [],
            treeprops: { label: "nodeLabel", value: "nodeData" },
            nodeSearch: false,
            selParent: false,
            teachPlan: {
                PlanId: 0,
                StageId: 0,
                VersionId: 0,
                StudyId: 0,
                GradeId: 0,
                VolumeId: 0,
                UnitId: 0,
                LessonId: 0,
                TimeId: 1,
                PlanTitle: "",
                PlanRemark: "",
                FlagSchool: 0,
                FlagArea: 0,
                PlanFileType: 1,
                planDesign: "", //教案设计文档信息
                planDesignPath: "", //教案设计文档路径
                PlanFileList: [], //教案设计附件列表
                PlanMatList: [], //课堂素材附件列表
                planGoal: "", //教学目标
                planImport: "", //重点难点
                planReady: "", //教学准备
                planExe: "", //课堂练习
                planBlack: "", //板书设计
                planWork: "", //作业布置
                planThink: "", //教学反思
                planLearn: "", //学案设计
                planketangsucai: "" //课堂素材
            },
            dialogImageUrl: "",
            dialogVisible: false,
            pdfiles: [],
            pmfiles: [],
            pdimglist: [],
            pmimglist: [],
            importLoading: "",
            showMat: false,
            bkConfig: {
                planDesign: true,
                planGoal: true, //教材分析(教学目标、重点难点、教学准备)
                planExe: true,
                planBlack: true,
                planWork: true,
                planThink: true,
                planLearn: true,
                planMat: true
            },
            huoquFujianList:[]
        }
    },
    mounted() {
        this.loadConfig();
        this.loadPlanDetails();
        this.loadTeachPlanSiteTree();
    },
    methods: {
        loadPlanDetails: function() {
            let that = this;
            const vd = that.$vloading();
            let pId = that.$route.query.planId;
            let url = "/api/Plan/GetPlanDetails";
            let param = { planid: pId };
            that.$api.get(url, param, res => {
                console.log("成功加载备课详情");
                console.log(res);
                vd.clear();
                let imgIdx = 0;
                let pcUrl = that.$store.state.apiUrl;
                //  console.log(pcUrl);
                //处理教案设计中的附件
                // for (let i = 0; i < res.planFileList.length; i++) {             //循环获取获取数据列表
                //     let pf = res.planFileList[i];               
                //     that.pmfiles.push(pf);
                //     if (pf.fileType == 1) {
                //         pf.itemOrder = imgIdx;
                //         that.pdimglist.push(pcUrl + "/BKFiles/" + pf.path);
                //         // that.pmfiles.push(pcUrl + "/BKFiles/" + pf.path);
                //         imgIdx++;
                //     }
                // }
                //处理课堂素材附件
                // imgIdx = 0;
                // for (let i = 0; i < res.planMatList.length; i++) {
                //     let mf = res.planMatList[i];
                //     if (mf.matTypeId == 1) {
                //         mf.itemOrder = imgIdx;
                //         that.pmimglist.push(pcUrl + "/BKFiles/" + mf.matPath);
                //         // that.pmfiles.push(pcUrl + "/BKFiles/" + mf.matPath);
                //         imgIdx++;
                //     }
                // }
                that.teachPlan =res;
                
                for (let i = 0; i < that.teachPlan.planFileList.length; i++) {             //循环获取获取数据列表
                    let pf = that.teachPlan.planFileList[i];                                //当前循环索引的数据       
                    that.pmfiles.push(pf);                                                  //pmfiles数据另外加载当前循环索引的数据
                    if (pf.fileType == 1) {                                                 //如果是图片
                        pf.itemOrder = imgIdx;
                        
                        that.pdimglist.push(pcUrl + "/BKFiles/" + pf.path);
                        // that.pmfiles.push(pcUrl + "/BKFiles/" + pf.path);
                        that.teachPlan.planFileList[i].path = pcUrl + "/BKFiles/" + pf.path;
                        imgIdx++;
                    }
                }
                console.log(that.teachPlan);
               
            });
        },
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
        //加载教案位置的树
        loadTeachPlanSiteTree() {
            let url = "/api/Plan/GetTeachPlanSiteTree";
            let the = this;
            the.$api.get(url, null, data => {
                the.treeNodes = data;
            });
        },
        //点击教案位置的Tree节点
        nodeClick(data, node) {
            //console.log(node);
            let the = this;
            if (node.level == 3) {
                the.teachPlan.LessonId = 0;
            }
            the.setTeachPlanProp(node);
            let selTitle = "/" + node.label;
            while (node.level > 1) {
                let parNode = node.parent;
                selTitle = "/" + parNode.label + selTitle;
                the.setTeachPlanProp(parNode);
                node = parNode;
            }
            the.teachPlan.PlanRemark = selTitle;
        },
        //根据选中的节点设置教案信息属性
        setTeachPlanProp(node) {
            let the = this;
            switch (node.level) {
                case 1:
                    the.teachPlan.StageId = node.data.nodeData.stageId;
                    the.teachPlan.VersionId = node.data.nodeData.versionId;
                    the.teachPlan.StudyId = node.data.nodeData.studyId;
                    break;
                case 2:
                    the.teachPlan.GradeId = node.data.nodeData.gradeId;
                    the.teachPlan.VolumeId = node.data.nodeData.volumeId;
                    break;
                case 3:
                    the.teachPlan.UnitId = node.data.nodeData.unitId;
                    break;
                case 4:
                    the.teachPlan.LessonId = node.data.nodeData.lessonId;
                    break;
                default:
                    break;
            }
        },
        /////开始附件上传相关功能
        handleRemove(file, fileList) {
            console.log(file+"你好");
            
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        ///on-change钩子，文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
        pdfileChange: function(file, fileList) {
            this.pdfiles = fileList;
            console.log(this.pdfiles);
        },
        ///文件上传之前的验证操作
        beforeUpload: function(file) {
            const isJPG = file.type === "application/vnd.ms-excel";
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$vnotify("上传图片必须是JPG/GIF/PNG/BMP 格式");
            }
            if (!isLt2M) {
                vmstu.$vnotify("上传Excel大小不能超过10MB");
            }

            let isPass = (isJPG || isGIF || isPNG || isBMP) && isLt2M;
            if (isPass) {
                this.importLoading = this.$loading({
                    lock: true,
                    text: "正在上传图片....."
                });
            }
            return isPass;
        },
        //axios自定义上传(教案设计)
        pdUpload(obj) {
            let the = this;
            let fOrder = the.teachPlan.planFileList.length + 1;
            let param = { files: obj.file, fileOrder: fOrder };
            the.$api.uploadFile("/api/Plan/UploadPlanFile", param, data => {
                the.importLoading.close();
                if (!data.success) {
                    the.$vnotify("图片上传失败");
                } else {
                    // the.teachPlan.planFileList = {}
                    // the.teachPlan.planFileList.push(data.planfile);
                    the.huoquFujianList.push(data.planfile);
                }
            });
        },
        ///on-change钩子，文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
        pmfileChange: function(file, fileList) {
            this.pmfiles = fileList;
        },
        //axios自定义上传(课堂素材)
        pmUpload(obj) {
            let the = this;
            let fOrder = the.teachPlan.planMatList.length + 1;
            let param = { files: obj.file, fileOrder: fOrder };
            the.$api.uploadFile("/api/Plan/UploadPlanFile", param, data => {
                the.importLoading.close();
                if (!data.success) {
                    the.$vnotify("图片上传失败");
                } else {
                    the.teachPlan.planMatList.push(data.planfile);
                }
            });
        },
        ///on-error钩子，上传失败时的钩子
        handleError: function(err, file, fileList) {
            console.log(err);
            this.importLoading.close();
        },
        ///文件上传成功时的钩子
        handleSuccess: function(response, file, fileList) {
            this.importLoading.close();
            if (!response.success) {
                this.$vnotify("图片上传失败");
            } else {
                this.teachPlan.planFileList.push(file);
            }
        },
        //保存教案信息
        savePlan: function() {
            let the = this;
            let errMsg = "";
            if (the.teachPlan.StudyId == "") {
                errMsg += "请选择教案位置<br>";
            }
            if (the.teachPlan.PlanTitle == "") {
                errMsg += "请输入教案名称<br>";
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
            const vd = the.$vloading("保存中...");
            let url = "/api/Plan/UpdPlan";
         the.teachPlan.planFileList = the.huoquFujianList;
            the.$api.post(url, the.teachPlan, data => {
                vd.clear();
                console.log(data.msg);
                the.$vnotify(data.msg);
                if (data.success) {
                    this.$router.push("myLesson");
                }
            });
        }
    }
};
</script>

<style>
.el-button + .el-button {
    margin-left: 5px;
}
.el-button--small,
.el-button--small.is-round {
    padding: 9px 8px;
}
</style>
