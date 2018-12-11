<template>
    <div class="screenPage mianScroll bgmain" v-show="$store.state.rightLayerEstate">
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div class="tcLayerMain">
            <ul class="selectList">
                <li>
                    <em>学期</em>
                    <div class="overHide">
                        <el-select v-model="selTerm" @change="changeTerm" placeholder="请选择" size="small">
                            <el-option v-for="item in TermList" :key="item.termId" :label="item.termName" :value="item.termId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li v-if="thePage!=1">
                    <em>学段</em>
                    <div class="overHide">
                        <el-select v-model="selStage" @change="changeStage" placeholder="请选择" size="small">
                            <el-option v-for="item in StageList" :key="item.stageId" :label="item.stageName" :value="item.stageId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <em>学科</em>
                    <div class="overHide">
                        <el-select v-model="selStudy" @change="changeStudy" @focus="focusStudy" clearable placeholder="请选择" size="small">
                            <el-option v-for="item in StudyList" :key="item.studyId" :label="item.studyName" :value="item.studyId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <em>年级</em>
                    <div class="overHide">
                        <el-select v-model="selGrade" @change="changeGrade" @focus="focusGrade" clearable placeholder="请选择" size="small">
                            <el-option v-for="item in GradeList" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <em>册次</em>
                    <div class="overHide">
                        <el-select v-model="selVolume" @change="changeVolume" @focus="focusVolume" clearable placeholder="请选择" size="small">
                            <el-option v-for="item in VolumeList" :key="item.volumeId" :label="item.volumeName" :value="item.volumeId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <em>章节</em>
                    <div class="overHide">
                        <el-select v-model="selUnit" @focus="focusUnit" clearable placeholder="请选择" size="small">
                            <el-option v-for="item in UnitList" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <div class="tcLayerRightBottom psnA psnAC">
                <el-button-group>
                    <el-button @click="quxiao()" style=" width:120px;">取消</el-button>
                    <el-button @click="submitCondition()" style=" width:120px;" type="primary">确定</el-button>
                </el-button-group>
            </div>
        </div>
    </div>
</template>

<script>
// import the component
// import Treeselect from "@riophae/vue-treeselect";
// import elTreeselect from "el-tree-select";
// // import the styles
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "screenPage",
    // components: { Treeselect, elTreeselect },
    props: ["thePage"],
    data() {
        return {
            selTeaPlan: "",
            treeNodes: [],
            treeprops: { label: "nodeLabel", value: "nodeData" },
            nodeSearch: false,
            selParent: false,
            subFormData: {
                termId: "",
                stageId: "",
                studyId: "",
                gradeId: "",
                volumeId: "",
                unitId: ""
            },
            TermList: [],
            selTerm: "",
            StageList: [],
            selStage: "",
            StudyList: [],
            selStudy: "",
            GradeList: [],
            selGrade: "",
            VolumeList: [],
            selVolume: "",
            UnitList: [],
            selUnit: ""
        };
    },
    watch: {
        selTerm: function(val) {
            this.subFormData.termId = val;
        },
        selStage: function(val) {
            this.subFormData.stageId = val;
        },
        selStudy: function(val) {
            this.subFormData.studyId = val;
        },
        selGrade: function(val) {
            this.subFormData.gradeId = val;
        },
        selVolume: function(val) {
            this.subFormData.volumeId = val;
        },
        selUnit: function(val) {
            this.subFormData.unitId = val;
        }
    },
    mounted() {
        this.loadTermList();
        if (this.thePage != 1) {
            this.loadStageList();
        }
    },
    methods: {
        //初始化加载学期
        loadTermList: function() {
            let that = this;
            let url = "/api/Plan/GetTermList";
            that.$api.get(url, null, res => {
                console.log("学期加载成功");
                that.TermList = res.terms;
                // that.selTerm = res.curTerm;
                // if (that.thePage == 1) {
                //     that.loadStudyList();
                // }
            });
        },
        //学期变化
        changeTerm() {
            if (this.thePage == 1) {
                this.loadStudyList();
            }
            this.selStudy = "";
            this.selGrade = "";
            this.selVolume = "";
            this.selUnit = "";
        },
        //初始化加载学段
        loadStageList: function() {
            let that = this;
            let url = "/api/Plan/GetStageList";
            that.$api.get(url, null, res => {
                console.log("学段加载成功");
                that.StageList = res;
            });
        },
        //学段变化
        changeStage() {
            this.loadStudyList();
            this.selStudy = "";
            this.selGrade = "";
            this.selVolume = "";
            this.selUnit = "";
        },
        //加载学科
        loadStudyList: function() {
            let that = this;
            let url = "/api/Plan/GetStudyList";
            let param = {};
            if (that.thePage == 1) {
                if (that.selTerm == "") {
                    that.$vnotify("请选择学期");
                    return false;
                }
                param = { termId: that.selTerm };
                url = "/api/Plan/GetTeaStudyList";
            } else {
                if (that.selStage == "") {
                    that.$vnotify("请选择学段");
                    return false;
                }
                param = { stageid: that.selStage };
                url = "/api/Plan/GetStudyList";
            }
            that.$api.get(url, param, res => {
                console.log("学科加载成功");
                that.StudyList = res;
            });
        },
        //进入学科选择框时触发
        focusStudy() {
            let that = this;
            if (that.thePage == 1) {
                if (that.selTerm == "") {
                    that.$vnotify("请选择学期");
                    return false;
                }
            } else {
                if (that.selStage == "") {
                    that.$vnotify("请选择学段");
                    return false;
                }
            }
        },
        //学科变化
        changeStudy() {
            this.loadGradeList();
            this.selGrade = "";
            this.selVolume = "";
            this.selUnit = "";
        },
        //加载年级
        loadGradeList: function() {
            let that = this;
            let url = "/api/Plan/GetGradeList";
            let param = {};
            if (that.thePage == 1) {
                if (that.selStudy == "") {
                    that.$vnotify("请选择学科");
                    return false;
                }
                param = { termId: that.selTerm, studyId: that.selStudy };
                url = "/api/Plan/GetTeaGradeList";
            } else {
                if (that.selStage == "") {
                    that.$vnotify("请选择学段");
                    return false;
                }
                if (that.selStudy == "") {
                    that.$vnotify("请选择学科");
                    return false;
                }
                param = { stageid: that.selStage, studyId: that.selStudy };
                url = "/api/Plan/GetGradeList";
            }
            that.$api.get(url, param, res => {
                console.log("年级加载成功");
                that.GradeList = res;
            });
        },
        //进入年级选择框时触发
        focusGrade() {
            let that = this;
            if (that.thePage == 1) {
                if (that.selStudy == "") {
                    that.$vnotify("请选择学科");
                    return false;
                }
            } else {
                if (that.selStage == "") {
                    that.$vnotify("请选择学段");
                    return false;
                }
                if (that.selStudy == "") {
                    that.$vnotify("请选择学科");
                    return false;
                }
            }
        },
        //年级变化
        changeGrade() {
            this.loadVolumeList();
            this.selVolume = "";
            this.selUnit = "";
        },
        //加载册次
        loadVolumeList: function() {
            let that = this;
            if (that.selGrade == "") {
                that.$vnotify("请选择年级");
                return false;
            }
            let url = "/api/Plan/GetVolumeList";
            let param = { gradeId: that.selGrade, studyId: that.selStudy };
            that.$api.get(url, param, res => {
                console.log("册次加载成功");
                console.log(res);
                that.VolumeList = res;
            });
        },
        //进入册次选择框时触发
        focusVolume() {
            let that = this;
            if (that.selGrade == "") {
                that.$vnotify("请选择年级");
                return false;
            }
        },
        //册次变化
        changeVolume() {
            this.loadUnitList();
            this.selUnit = "";
        },
        //加载教材章节目录
        loadUnitList: function() {
            let that = this;
            if (that.selVolume == "") {
                that.$vnotify("请选择册次");
                return false;
            }
            let url = "/api/Plan/GetUnitList";
            let param = { volumeId: that.selVolume };
            that.$api.get(url, param, res => {
                console.log("章节目录加载成功");
                that.UnitList = res;
            });
        },
        //进入教材章节选择框时触发
        focusUnit() {
            let that = this;
            if (that.selVolume == "") {
                that.$vnotify("请选择册次");
                return false;
            }
        },
        loadcondition: function() {
            let that = this;
            let url = "/api/Plan/ScreeningPlan";
            that.$api.get(url, null, res => {
                console.log(res);
                that.myPlanList.concat(res);
                console.log(that.myPlanList);
            });
        },
        //点击确定回传参数
        submitCondition: function() {
            console.log("开始回传参数");
            //console.log(this.subFormData);
            this.$emit("headCallBack", this.subFormData);
            this.$store.commit("switch_dialog");
        },
        //点击取消
        quxiao: function() {
            this.selTerm = "";
            this.selStudy = "";
            this.selGrade = "";
            this.selVolume = "";
            this.selUnit = "";
            this.$store.commit("switch_dialog");
        }
    }
};
</script>

<style>
</style>
