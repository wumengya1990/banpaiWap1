<template>
    <div class="details bgmain mianScroll">
        <div class="establish mianScroll">
            <div class="detailsBox" :data="fromMes">
                <section>
                    <h4>教案标题</h4>
                    <article><p>标题标题标题标题标题标题标题标题标题</p></article>
                </section>
                <section>
                    <h4>基本信息</h4>
                    <ul>
                        <li><em>发布人</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                        <li><em>发布时间</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                    </ul>
                </section>
                <section>
                    <h4>课程定位</h4>
                    <ul>
                        <li><em>年级</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                        <li><em>班级</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                        <li><em>日期</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                        <li><em>节次</em><div class="overHide"><div class="detailCon">内容内容内容内容内容内容内容</div></div></li>
                    </ul>
                </section>
                <section>
                    <h4>附件列表</h4>
                    <ul class="fileList">
                        <li><a class="fileImg" href=""><img :src="this.wordtype"></a><div class="overHide"><a href="">名称名称名称名称名称名称名称名称名称</a></div><div class="clear"></div></li>
                    </ul>
                    <ul class="ImgList">
                        <li><a class="fileImg" href=""><img :src="this.wordtype"></a><div class="overHide"><a href="">名称名称名称名称名称名称名称名称名称</a></div><div class="clear"></div></li>
                    </ul>
                </section>

            </div>
        </div>
         <div class="establishBut">
            <el-button round  @click="pageBack()">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'detailsPage',
    data(){
        return{
            Imgtype: require("./../assets/images/imgTyle.png"),
            wordtype: require("./../assets/images/wordTyle.png"),
            fromMes:''
        }
    },
    mounted(){
        this.getMes();
    },
    methods:{
        pageBack:function(){
             this.$router.back(-1);
        },
        getMes:function(){
            let that = this;
            that.fromMes = that.$router.params.planId;
            console.log(that.fromMes);
        }
    }
}
</script>

<style>
.details{ z-index:20;}
</style>
