<template>
    <div class="myLesson bgmain mianScroll">
        <data-top></data-top>
        <top-search></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
            <!-- 右侧弹层筛选内容 -->
             <right-screen :chaundishuju="chaundishuju" v-on:headCallBack="headCall" style="z-index:10;"></right-screen>  
            <!-- 右侧弹层筛选内容 -->
        </div>

        <div class="suspendTool">
            <router-link to="/newCourse"><i class="el-icon-plus"></i></router-link>
            <a @click="$store.commit('switch_dialog')"><i class="el-icon-more"></i></a>
        </div>

        <div class="lessonList">
            <ul>
                <li v-for="(course,index) in myPlanList" :key="index">
                        <em v-if="course.isCountyShare == true" class="shareState have">
                            已校共享
                        </em>
                        <div class="lessonImg"><img v-bind:src="course.planImg"></div>
                        <div class="lessonContent">
                            <h4>{{course.planTitle}}<em><i class="el-icon-star-off"></i></em></h4>
                            <p class="synopsis"><span><i class="icon bpMobile bpMobile-wode2"></i>{{course.authorUserName}}</span><span><i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>{{course.createTime}}</span>   
                            </p>
                            <div class="operate">
                                <a v-if="course.planThink == null || course.planThink.length <= 0" @click="writeThink(course.planId)"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="watchThink(course.planId)"><i class="el-icon-view"></i>查看反思</a>
                                <a @click="tcshow =! tcshow"><i class="el-icon-location-outline"></i>课程定位</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                </li>
             </ul>
        </div>

        <!-- 填写教学反思 -->
        <div class="tcLayer" v-show="tcshow1">
            <div class="tcLayerMain">
                <div class="closeBt"><em class="psnA" @click="tcshow1 =! tcshow1"></em></div>
                <div class="LayerTop">
                    <dl>
                        <dt><img :src="this.xuancengimg"></dt>
                        <dd>教学反思</dd>
                    </dl>
                </div>
                <div class="LayerCenter">
                    <div class="textareaBox">
                        <textarea placeholder="请输入内容"></textarea>
                    </div>
                </div>
                <div class="LayerBottom psnA psnAC"><el-button style="width:80%;" type="primary">提交</el-button></div>
            </div>
        </div>
         <!-- 填写教学反思结束 -->
         <!-- 查看教学反思 -->
        <div class="tcLayer" v-show="tcshow2">
            <div class="tcLayerMain">
                <div class="closeBt"><em class="psnA" @click="tcshow2 =! tcshow2"></em></div>
                <div class="LayerTop">
                    <dl>
                        <dt><img :src="this.xuancengimg"></dt>
                        <dd>教学反思</dd>
                    </dl>
                </div>
                <div class="LayerCenter">
                    <div class="textareaBox">
                        <p>所谓教学反思，是指教师对教育教学实践的再认识、再思考，并以此来总结经验教训，进一步提高教育教学水平。教学反思一直以来是教师提高个人业务水平的一种有效手段，教育上有成就的大家一直非常重视之。现在很多教师会从自己的教育实践中来反观自己的得失，通过教育案例、教育故事、或教育心得等来提高教学反思的质量。</p>
                    </div>
                </div>
                <div class="LayerBottom psnA psnAC"><el-button style="width:80%;" type="primary" @click="tcshow2 =! tcshow2">关闭</el-button></div>
            </div>
        </div>
        <!-- 查看教学反思结束 -->
        <!-- 设置课程定位 -->
        <div class="tcLayer" v-show="tcshow">
            <div class="tcLayerMain">
                <div class="closeBt"><em class="psnA" @click="tcshow =! tcshow"></em></div>
                <div class="LayerTop">
                    <dl>
                        <dt><img :src="this.xuancengimg"></dt>
                        <dd>教学反思</dd>
                    </dl>
                </div>
                <div class="LayerCenter">
                    <ul class="selectList">
                        <li>
                            <em><i>*</i>年级</em>
                            <el-select v-model="gradeValue" placeholder="请选择" size="small">
                                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <em><i>*</i>班级</em>
                            <el-select v-model="classValue" placeholder="请选择" size="small">
                                <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <em><i>*</i>日期</em>
                            <el-select v-model="dataValue" placeholder="请选择" size="small">
                                <el-option v-for="item in dataOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <em><i>*</i>节次</em>
                            <el-select v-model="jieciValue" placeholder="请选择" size="small">
                                <el-option v-for="item in jieciOptions" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </li>
                </ul>
                        
                </div>
                <div class="LayerBottom psnA psnAC"><el-button style="width:80%;" type="primary">提交</el-button></div>
            </div>
        </div>
        <!-- 设置课程定位结束 -->
        
    </div>
</template>

<script>
import top from '@/components/top'
import searchTop from '@/components/searchTop'
import screenPage from '@/components/screenPage'
export default {
    name:'myLesson',
    components:{
        'data-top':top,
        'top-search':searchTop,
        'right-screen':screenPage
        },
    data(){
        return{
            xuancengimg:require('./../assets/images/gongnengTb_03.png'),   //教学反思的弹层公共的额图片导入
            chaundishuju:'',
            show:false,
            tcshow1:false,        //填写教学反思的弹层显示隐藏
            tcshow2:false,          //查看教学反思的弹层显示隐藏
            myPlanList:[],       //装载读取的我的备课列表内容
            planThinkCon:'',     //装载点击的的备课的教学反思的内
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
                    jieciOptions: ['第一节','第二节','第三节','第四节','第五节','第六节','第七节','第八节'],
                    dataOptions: [],
        }
    },
    mounted(){
        // this.loadList();
        this.loadList1();
    },
    methods:{
        headCall:function(mes){
            this.receive = mes;
            console.log(this.receive);
        },
        TogglePopupMore(){
            this.tab.popupMoreTrigger = !this.tab.popupMoreTrigger;
        },

        loadList1:function(){
            let that = this;
            let url = "/cao/api/Plan/GetMyPlanList";
            // let url1 = "/cao/api/Plan/GetPlanByPlanID";
            // let url = "/cao/api/Plan/GetMyPlanList";
            // let url = "/cao/api/Plan/GetPlanByPlanID";
            that.$api.get(url,null,res => {
                console.log(res);
                this.myPlanList = res ;
                console.log( this.myPlanList);
            });
        },
        writeThink:function(planID){
            console.log(planID);
            this.tcshow1 = true;
            
        },
        watchThink:function(mes){
            console.log(mes);
            let that = this;
            let kwd = {planId:mes};
            let url = "/cao/api/Plan/GetPlanByPlanID";
            that.$api.get(url,kwd,res => {
                console.log(res);
                this.planThinkCon = res ;
                console.log( this.planThinkCon);
            });
            this.tcshow2 = true;
        }
    }
}
</script>

<style>
.rightLayerW{ position: absolute; left:0; top: 0; right: 0; bottom: 0; margin: auto;  background: rgba(0,0,0,0.5);}
.rightLayer{ position: absolute; left:100%; top: 0; right: 0; bottom: 0; margin: auto; z-index:20;}
.laeryleft{ left:20%;}

</style>
