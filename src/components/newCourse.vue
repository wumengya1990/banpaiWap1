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
                                v-model="teachPlan.PlanRemark"
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
                            <el-input v-model="teachPlan.PlanTitle" placeholder="请输入内容"></el-input>
                        </div>
                    </li>
                    <li>
                        <em>课时数</em>
                        <div class="overHide">
                            <el-input-number v-model="teachPlan.TimeId" :min="1" :max="50" label="课时数量"></el-input-number>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="establishBox">
                <h4>
                    <span>教案设计</span>
                </h4>
                <ul>
                    <li>
                        <div class="overHide" style="padding:0 0 0 10px">
                            <el-upload
                                class="upload-demo"
                                action="/api/Plan/UploadPlanFile"
                                :loadingTxt="loadTxt"
                                :http-request="customUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="fileUpload"
                                :before-upload="beforeUpload"
                                :file-list="filePics"
                                list-type="picture"
                                accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过4MB</div>
                            </el-upload>
                            <div class="clear"></div>
                        </div>
                    </li>
                </ul>
            </div>

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
                        <!-- <el-checkbox-group v-model="checkList" style="margin:0 0 0 10px;"> -->
                        <el-checkbox true-label="1" false-label="0" v-model="teachPlan.FlagSchool">学校共享</el-checkbox>
                        <el-checkbox true-label="1" false-label="0" v-model="teachPlan.FlagArea">区县共享</el-checkbox>
                        <!-- </el-checkbox-group> -->
                    </li>
                </ul>
            </div>
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

export default {
    name: "newCourse",
    components: { elTreeselect },
    data() {
        return {
            loadTxt: "数据加载中....",
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
                PlanDesign: "",
                PlanDesignPath: "",
                PlanFileList: []
            },
            rules: {
                PlanRemark: [
                    {
                        required: true,
                        message: "请选择教案位置",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            dialogImageUrl: "",
            dialogVisible: false,
            filePics: [],
            importLoading: ""
        };
    },
    mounted() {
        this.loadTeachPlanSiteTree();
    },
    methods: {
        pageBack: function() {
            this.$router.back(-1);
        },
        //加载教案位置的树
        loadTeachPlanSiteTree: function() {
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        ///on-change钩子，文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
        fileUpload: function(file, fileList) {
            this.filePics = fileList;
        },
        ///文件上传之前的验证操作
        beforeUpload: function(file) {
            const isJPG = file.type === "image/jpeg";
            const isGIF = file.type === "image/gif";
            const isPNG = file.type === "image/png";
            const isBMP = file.type === "image/bmp";
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.message("上传图片必须是JPG/GIF/PNG/BMP 格式", "warning");
            }
            if (!isLt2M) {
                vmstu.$message.error("上传Excel大小不能超过2MB");
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
        //自定义上传(axios)
        customUpload(obj) {
            let the = this;
            let fOrder = the.teachPlan.PlanFileList.length + 1;
            let param = { files: obj.file, fileOrder: fOrder };
            the.$api.uploadFile(
                "/api/Plan/UploadPlanFile",
                param,
                data => {
                    the.importLoading.close();
                    if (!data.success) {
                        the.$message("图片上传失败");
                    } else {
                        the.teachPlan.PlanFileList.push(data.planfile);
                    }
                }
            );
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
                this.$message("图片上传失败");
            } else {
                this.teachPlan.PlanFileList.push(file);
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
            let url = "/api/Plan/SaveTeachPlan";
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
