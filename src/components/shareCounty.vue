<template>
    <div class="shareSchool mianScroll bgmain">
        <top></top>
        <searchTop></searchTop>
        <div class="lessonList">
            <ul>
                <li v-for="(course,index) in myPlanList" :key="index">
                        <em v-if="course.shareState == true" class="shareState have">
                            已校共享
                        </em>
                        <div class="lessonImg"><img v-bind:src="course.planImg"></div>
                        <div class="lessonContent">
                            <h4>{{course.planTitle}}</h4>
                            <p class="synopsis"><span><i class="icon bpMobile bpMobile-wode2"></i>{{course.authorUserName}}</span><span><i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>{{course.createTime}}</span>   
                            </p>
                            <div class="operate">
                                <a v-if="course.haveReflect == false" @click="tcshow1 =! tcshow1"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="tcshow2 =! tcshow2"><i class="el-icon-view"></i>查看反思</a>
                                <span><i class="el-icon-download"></i>{{course.downNum}}</span>
                                <span><i class="el-icon-star-off"></i>{{course.collectionNum}}</span>
                                <span><i class="icon bpMobile bpMobile-duihuakuang"></i>{{course.collectionNum}}</span>
                            </div>
                            <div class="checkBox">
                                <el-checkbox v-model="course.isSchoolShare" @change="countyShare(index)">区共享</el-checkbox>
                                <el-checkbox v-model="course.isCountyShare" @change="collection(index)">收藏</el-checkbox>  
                            </div>
                        </div>
                        <div class="clear"></div>
                </li>
             </ul>
        </div>


<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

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
                            countyShare:true,
                            Collection:false
                        },
                        {
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅2',
                            formPeo:'张洋',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:false,
                            schoolShare:false,
                            countyShare:true,
                            Collection:false
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
                            Collection:false
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
                            Collection:true
                        }
                    ],
                    myPlanList:[],       //装载读取的我的备课列表内容
        }
    },
    mounted(){
        this.loadList1();
    },
    methods:{
        loadList1:function(){
            let that = this;
            let url = "/cao/api/Plan/GetAreaSharingPlanList";
            that.$api.get(url,{ userid:2, pageindex:1},res => {
                console.log(res);
                this.myPlanList = res ;
                console.log(this.myPlanList);
            });
        },
        countyShare:function(suoyin){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
            // let that = this;
            // let url = "/cao/api/Plan/GetAreaSharingPlanList";
            // that.$api.get(url,null,res => {
            //     console.log(res);
            //     this.myPlanList = res ;
            //     console.log( this.myPlanList);
            // });
        },
        collection:function(suoyin){
            // let that = this;
            // let url = "/cao/api/Plan/GetAreaSharingPlanList";
            // that.$api.get(url,null,res => {
            //     console.log(res);
            //     this.myPlanList = res ;
            //     console.log( this.myPlanList);
            // });
        }
        
    }
}
</script>

<style scoped>
    .checkBox >>> .el-checkbox+.el-checkbox{ margin-left: 5px;}
    .el-message-box__wrapper .el-message-box{ width:auto;}
</style>
