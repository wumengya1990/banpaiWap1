<template>
    <div class="shareSchool mianScroll bgmain">
        <top></top>
        <searchTop></searchTop>
        <div class="lessonList">
            <ul>
                <li v-for="(course,index) in courseList" :key="index">
                        <em v-if="course.shareState == true" class="shareState have">
                            已校共享
                        </em>
                        <div class="lessonImg"><img v-bind:src="course.imgUrl"></div>
                        <div class="lessonContent">
                            <h4>{{course.title}}</h4>
                            <p class="synopsis"><span><i class="icon bpMobile bpMobile-wode2"></i>{{course.formPeo}}</span><span><i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>{{course.time}}</span>   
                            </p>
                            <div class="operate">
                                <a v-if="course.haveReflect == false" @click="tcshow1 =! tcshow1"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="tcshow2 =! tcshow2"><i class="el-icon-view"></i>查看反思</a>
                                <span><i class="el-icon-download"></i>{{course.downNum}}</span>
                                <span><i class="el-icon-star-off"></i>{{course.collectionNum}}</span>
                                <span><i class="icon bpMobile bpMobile-duihuakuang"></i>{{course.collectionNum}}</span>
                            </div>
                            <div class="checkBox">
                                <el-checkbox v-model="course.schoolShare">校共享</el-checkbox>
                                <el-checkbox v-model="course.countyShare">区共享</el-checkbox>
                                <el-checkbox v-model="course.Collection">收藏</el-checkbox>  
                            </div>
                        </div>
                        <div class="clear"></div>
                </li>
             </ul>
        </div>
    </div>
</template>

<script>
import top from '@/components/top'
import searchTop from '@/components/searchTop'
export default {
    name:"shareSchool",
    components:{top,searchTop},
    data(){
        return{
            courseList:[
                        {
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅1',
                            formPeo:'王艳丽',
                            time:'2018-10-22',
                            shareState:true,
                            haveReflect:true,
                            downNum:16,
                            commentNum:16,
                            collectionNum:16,
                            schoolShare:false,
                            countyShare:false,
                            Collection:false
                        },
                        {
                             imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅2',
                            formPeo:'张洋',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:false,
                            downNum:16,
                            commentNum:16,
                            collectionNum:16,
                            schoolShare:false,
                            countyShare:false,
                            Collection:true
                        },
                        {
                             imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true,
                            downNum:16,
                            commentNum:16,
                            collectionNum:16,
                            schoolShare:false,
                            countyShare:false,
                            Collection:true
                        },
                        {
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅4',
                            formPeo:'李炜',
                            time:'2018-10-22',
                            shareState:true,
                            haveReflect:false,
                            downNum:16,
                            commentNum:16,
                            collectionNum:16,
                            schoolShare:false,
                            countyShare:false,
                            Collection:false
                        }
                    ],
                    myPlanList:[]
        }
    },
    mounted(){
        this.loadList1();
    },
    methods:{
        loadList1:function(){
            let that = this;
            let url = "/cao/api/Plan/GetSchoolSharingPlanList";
            that.$api.get(url,{ schoolId:0},res => {
                console.log(res);
                this.myPlanList = res ;
                console.log(this.myPlanList);
            });
        }
        
    }
}
</script>

<style scoped>
    .checkBox >>> .el-checkbox+.el-checkbox{ margin-left: 5px;}
</style>
