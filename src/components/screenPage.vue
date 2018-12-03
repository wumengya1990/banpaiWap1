<template>
    <div class="screenPage mianScroll bgmain" v-show="$store.state.rightLayerEstate">
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div class="tcLayerMain">
                    <ul class="selectList">
                        <li>
                            <em>学期</em>
                            <div class="overHide">
                            <el-select v-model="semesterValue" placeholder="请选择" size="small">
                                <el-option v-for="item in semesterOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                        <li>
                            <em>学科</em>
                            <div class="overHide">
                                <el-select v-model="subjectValue" placeholder="请选择" size="small">
                                    <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <em>年级</em>
                            <div class="overHide">
                            <el-select v-model="gradeValue" placeholder="请选择" size="small">
                                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                        <li>
                            <em>教材目录</em>
                            <div>
                                <!-- <el-cascader :options="teachingMaterialOptions" v-model="teachingMaterialValue"  @change="handleChange"></el-cascader> -->
                                <treeselect style="margin:25px 0 0;" v-model="teachingMaterialValue" :multiple="true" :options="teachingMaterialOptions" />
                               
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
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name:'screenPage',
    components: { Treeselect },
    props:['chaundishuju'],
    data(){
        return{
            subFormData:{
                subSemester:'',
                subSubject:'',
                subGrade:'',
                subTeachingMaterial:''
            },
            semesterValue:'',
            semesterOptions:[{value:'2017~2018第一学期', label:'2017~2018第一学期'},{value:'2017~2018第二学期', label:'2017~2018第二学期'}],
            subjectValue:'',
            subjectOptions:[{value:'语文', label:'语文'},{value:'数学', label:'数学'}],
            gradeValue:'',
            gradeOptions: [
                { value:'一年级', label:'一年级'}, 
                { value:'二年级', label:'二年级'}, 
                { value:'三年级', label:'三年级'}
            ],
            teachingMaterialValue:[],
            teachingMaterialValue1:'',
            teachingMaterialValue2:'',
            teachingMaterialOptions1:[],
            teachingMaterialOptions2:[],
            teachingMaterialOptions:[
                {
                    id:'renjiaoaban',
                    label:'人教版',
                    children:[
                        {
                            id:'yinianji1',
                            label:'一年级1',
                            children:[
                                {id:'runit1',label:'r第1单元s',},
                                {id:'runit2',label:'r第2单x元',},
                                {id:'runit3',label:'r第3单x元',},
                                {id:'cccc',label:'第四单元',}
                            ]
                        },{
                            id:'ernianji',
                            label:'二年级2',
                            children:[
                                {id:'sunit1',label:'r第1单s元s',},
                                {id:'sunit2',label:'r第2a单元s',},
                                {id:'sunit3',label:'r第3x单元s',},
                                {id:'sunit4',label:'r第4单x元s',}
                            ]
                        }
                    ]
                },{
                    id:'sujiaoban2',
                    label:'苏教版3',
                    children:[
                        {
                            id:'yinianji',
                            label:'一年级1',
                            children:[
                                {id:'rrrunit1',label:'第1单元d',},
                                {id:'rrrrunit2',label:'第2单元d',},
                                {id:'rrrrunit3',label:'第3单元d',},
                                {id:'rrrrunit4',label:'第4单元d',}
                            ]
                        },{
                            id:'ernianji1',
                            label:'二年级3',
                            children:[
                                {id:' rrrrunrrrit21',label:'第1单元',},
                                {id:'rrrrunrrrit2',label:'第2单元',},
                                {id:'rrrrunist3',label:'第3单元',},
                                {id:'ccc',label:'第四单元',}
                            ]
                        }
                    ]
                }
            ],

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
    },
    methods:{
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
        getChildren:function(){
            console.log(this.teachingMaterialValue);
        },
        getChildren1:function(){
            console.log(321);
        }
    }
}
</script>

<style>

</style>
