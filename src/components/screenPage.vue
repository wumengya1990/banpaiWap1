<template>
    <div class="screenPage mianScroll bgmain">
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
                            <div class="overHide">
                            <el-select v-model="teachingMaterialValue" placeholder="请选择" size="small">
                                <el-option v-for="item in teachingMaterialOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                        <li>
                            <em>教师</em>
                            <div class="overHide">
                            <el-select v-model="teacherValue" placeholder="请选择" size="small">
                                <el-option v-for="item in teacherOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </li>
                    </ul>

                <div class="tcLayerRightBottom psnA psnAC">
                        <el-button-group>
                        <el-button style=" width:120px;">取消</el-button>
                        <el-button @click="submitCondition()" style=" width:120px;" type="primary">确定</el-button>
                        </el-button-group>
                </div>
            </div>

    </div>
</template>

<script>
export default {
    name:'screenPage',
    data(){
        return{
             slots: [
                {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot1',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot2'
                }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot3',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot4'
                }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot5',
                textAlign: 'center'
                }
            ],
            dataOptions: [],
            semesterOptions:[{value:'xq1', label:'2017~2018第一学期'},{value:'xq2', label:'2017~2018第二学期'}],
            subjectOptions:[{value:'xk1', label:'语文'},{value:'xk2', label:'数学'}],
            teachingMaterialOptions:[{value:'jc1', label:'人教版'},{value:'jc2', label:'苏教版'}],
            teacherOptions:[{value:'js1', label:'张洋 '},{value:'js2', label:'张婷'}],
            jieciOptions: ['第一节','第二节','第三节','第四节','第五节','第六节','第七节','第八节'],
             gradeOptions: [{
                        value: 'gd1',
                        label: '一年级'
                        }, {
                        value: 'gd2',
                        label: '二年级'
                        }, {
                        value: 'gd3',
                        label: '三年级'
                    }],
                    classOptions: [{
                        value: 'bj1',
                        label: '(1)班'
                        }, {
                        value: 'bj2',
                        label: '(2)班'
                        }, {
                        value: 'bj3',
                        label: '(3)班'
                    }],
                    gradeValue: '',
                    classValue: '',
                    dataValue: '',
                    jieciValue: '',
                    teacherValue:'',
                    semesterValue:'',
                    subjectValue:'',
                    teachingMaterialValue:''
        }
    },
    props:["message"],
    methods:{
        onValuesChange(picker, values) {
        if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
        }
        },
        submitCondition:function(){
            this.$emit('headCallBack', '子组件的参数内容');
        }
    }
}
</script>

<style>

</style>
