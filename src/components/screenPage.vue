<template>
    <div class="screenPage mianScroll bgmain" v-show="$store.state.rightLayerEstate">
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div class="tcLayerMain">
                    <ul class="selectList">
                        <li>
                            <em>学期</em>
                            <div class="overHide">
                            <el-select v-model="semesterValue" placeholder="请选择" size="small">
                                <el-option v-for="item in myPlanList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                         <li>
                            <em>学段</em>
                            <div class="overHide">
                            <el-select v-model="periodValue" placeholder="请选择" size="small">
                                <el-option v-for="item in myPlanList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                        <li>
                            <em>学科</em>
                            <div class="overHide">
                                <el-select v-model="subjectValue" placeholder="请选择" size="small">
                                    <el-option v-for="item in myPlanList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <em>年级</em>
                            <div class="overHide">
                            <el-select v-model="gradeValue" placeholder="请选择" size="small">
                                <el-option v-for="item in myPlanList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                        <li>
                            <em>教材目录</em>
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
import elTreeselect from "el-tree-select";

export default {
    name:'screenPage',
    components: { elTreeselect },
    props:['chaundishuju'],
    data(){
        return{
        semesterValue:'',
        periodValue:'',
        subjectValue:'',
        gradeValue:'',
        selTeaPlan: "",
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
            { required: true, message: "请选择教案位置", trigger: "blur" }
            ],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        },
        dialogImageUrl: "",
        dialogVisible: false,
        filePics: [],
        importLoading: "",
        myPlanList:[]
           

        }
    },
    watch:{
        semesterValue:function(val){
            this.subFormData.subSemester = val;
        },
        subjectValue:function(val){
            this.subFormData.subSubject = val;
        },
        gradeValue:function(val){
            this.subFormData.subGrade = val;
        },
        teachingMaterialValue:function(val){
            this.subFormData.subTeachingMaterial=val;
        }

    },
    mounted() {
        this.loadcondition();
        this.loadTeachPlanSiteTree();
    },
    methods:{
        loadcondition:function(){
            let that = this;
            let url = "/beike/api/Plan/ScreeningPlan";
            that.$api.get(url,{termId:0},res => {
                console.log(res);
                this.myPlanList = res ;
                console.log( this.myPlanList);
            });
        },
        onValuesChange(picker, values) {
        if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
        }
        },
        handleChange:function(val){
            console.log(val)
        },
        submitCondition:function(){
            console.log(this.subFormData);
            
            this.$emit('headCallBack',this.subFormData);

            this.$store.commit('switch_dialog');
        },
        quxiao:function(){
              this.$store.commit('switch_dialog');
        },
        //加载教案位置的树
        loadTeachPlanSiteTree: function() {
        let url = "/beike/api/Plan/GetTeachPlanSiteTree";
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
            selTitle = parNode.label + "/" + selTitle;
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
        
    }
}
</script>

<style>

</style>
