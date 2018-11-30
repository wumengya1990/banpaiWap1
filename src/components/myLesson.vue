<template>
    <div class="myLesson bgmain mianScroll">
        <data-top></data-top>
        <top-search></top-search>
        <div class="rightLayer" :class="{laeryleft:$store.state.rightLayerEstate}">
             <right-screen style="z-index:10;"></right-screen>
        </div>

        <div class="suspendTool">
            <router-link to="/newCourse"><i class="el-icon-plus"></i></router-link>
            <a @click="$store.commit('switch_dialog')"><i class="el-icon-more"></i></a>
        </div>

        <div class="lessonList">
            <ul>
                <li v-for="(course,index) in courseList" :key="index">
                        <em v-if="course.shareState == true" class="shareState have">
                            已校共享
                        </em>
                        <div class="lessonImg"><img v-bind:src="course.imgUrl"></div>
                        <div class="lessonContent">
                            <h4>{{course.title}}<i class="el-icon-star-off"></i></h4>
                            <p class="synopsis"><span><i class="icon bpMobile bpMobile-wode2"></i>{{course.formPeo}}</span><span><i class="icon bpMobile bpMobile-hs_h_Clock_h-naozhong"></i>{{course.time}}</span>   
                            </p>
                            <div class="operate">
                                <a v-if="course.haveReflect == false" @click="tcshow1 =! tcshow1"><i class="el-icon-edit"></i>添加反思</a>
                                <a v-else @click="tcshow2 =! tcshow2"><i class="el-icon-view"></i>查看反思</a>
                                <a @click="tcshow =! tcshow"><i class="el-icon-location-outline"></i>课程定位</a>
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
            show:false,
            courseList:[
                        {
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅1',
                            formPeo:'王艳丽',
                            time:'2018-10-22',
                            shareState:true,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅2',
                            formPeo:'张洋',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:false
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅3',
                            formPeo:'王帅',
                            time:'2018-10-22',
                            shareState:false,
                            haveReflect:true
                        },{
                            imgUrl:require('./../assets/images/runtu.jpg'),
                            title:'少年闰土——鲁迅4',
                            formPeo:'李炜',
                            time:'2018-10-22',
                            shareState:true,
                            haveReflect:false
                        }
                    ],
                t: 2,
                page:1,
                rows:10,
                schoolStateList:[],
                schoolStateDetail:{}
        }
    },
    mounted(){
        this.loadList();
        // this.loadList1();
    },
    methods:{
        TogglePopupMore(){
            this.tab.popupMoreTrigger = !this.tab.popupMoreTrigger;
        },
        loadList:function(){
           var url = "/cao/api/Plan/GetTermList";
           var _this = this;
           _this.$ajax.post(url,{termId:2}).then((res)=>{
                console.log(res);
           }).catch((error)=>{
                console.log(error);
           })
        }
        // ,
        // loadList1:function(){
        //    this.$ajax.get('/cao/api/Plan/GetTermList').then(res=>{
        //        console.log(res);
        //    }).catch(error=>{
        //        console.log(error);
        //    })

        // }
    }
}
</script>

<style>
.rightLayerW{ position: absolute; left:0; top: 0; right: 0; bottom: 0; margin: auto;  background: rgba(0,0,0,0.5);}
.rightLayer{ position: absolute; left:100%; top: 0; right: 0; bottom: 0; margin: auto; z-index:20;}
.laeryleft{ left:20%;}

</style>
