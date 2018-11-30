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
                            <div class="overHide">
                                <div class="selectBox">
                                    <el-select v-model="teachingMaterialValue" placeholder="请选择" size="small" @change="getChildren()">
                                        <el-option v-for="item in teachingMaterialOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>

                                    <el-select v-model="teachingMaterialValue1" placeholder="请选择" size="small" @change="getChildren1()">
                                        <el-option v-for="item1 in teachingMaterialOptions1" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
                                    </el-select>
    
                                    <el-select v-model="teachingMaterialValue2" placeholder="请选择" size="small">
                                        <el-option v-for="item2 in teachingMaterialOptions2" :key="item2.value" :label="item2.label" :value="item2.value"></el-option>
                                    </el-select>

                                </div>
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
export default {
    name:'screenPage',
    data(){
        return{
            semesterValue:'',
            semesterOptions:[{value:'xq1', label:'2017~2018第一学期'},{value:'xq2', label:'2017~2018第二学期'}],
            subjectValue:'',
            subjectOptions:[{value:'xk1', label:'语文'},{value:'xk2', label:'数学'}],
            gradeValue:'',
            gradeOptions: [
                { value:'gd1', label:'一年级'}, 
                { value:'gd2', label:'二年级'}, 
                { value:'gd3', label:'三年级'}
            ],
            teachingMaterialValue:'',
            teachingMaterialValue1:'',
            teachingMaterialValue2:'',
            teachingMaterialOptions1:[],
            teachingMaterialOptions2:[],
            teachingMaterialOptions:[
                {
                    valeu:'renjiaoaban',
                    label:'人教版',
                    children:[
                        {
                            valeu:'yinianji',
                            label:'一年级',
                            children:[
                                {valeu:'unit1',label:'第1单元',},
                                {valeu:'unit2',label:'第2单元',},
                                {valeu:'unit3',label:'第3单元',},
                                {valeu:'unit4',label:'第4单元',}
                            ]
                        },{
                            valeu:'ernianji',
                            label:'二年级',
                            children:[
                                {valeu:'unit1',label:'第1单元',},
                                {valeu:'unit2',label:'第2单元',},
                                {valeu:'unit3',label:'第3单元',},
                                {valeu:'unit4',label:'第4单元',}
                            ]
                        }
                    ]
                },{
                    valeu:'sujiaoban',
                    label:'苏教版',
                    children:[
                        {
                            valeu:'yinianji',
                            label:'一年级',
                            children:[
                                {valeu:'unit1',label:'第1单元',},
                                {valeu:'unit2',label:'第2单元',},
                                {valeu:'unit3',label:'第3单元',},
                                {valeu:'unit4',label:'第4单元',}
                            ]
                        },{
                            valeu:'ernianji',
                            label:'二年级',
                            children:[
                                {valeu:'unit1',label:'第1单元',},
                                {valeu:'unit2',label:'第2单元',},
                                {valeu:'unit3',label:'第3单元',},
                                {valeu:'unit4',label:'第4单元',}
                            ]
                        }
                    ]
                }
            ],

        }
    },
    mounted() {
        console.log(123);
    },
    methods:{
        onValuesChange(picker, values) {
        if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
        }
        },
        submitCondition:function(){
            console.log(this.teachingMaterialValue);
            // this.$emit('headCallBack', '子组件的参数内容');
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
