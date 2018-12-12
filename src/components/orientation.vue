<template>
    <div class="orientation bgmain mianScroll">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="loadPlanList">
        <ul>
            <li>
                <div class="introduction">
                <h4>标题标题标题标题标题标题标题标题标题标题</h4>
                </div>
                <dl><dt>班级</dt><dd>2018-12-12</dd></dl>
                <dl><dt>上课时间</dt><dd>2018-12-12</dd></dl>
                <dl><dt>节次</dt><dd>2018-12-12</dd></dl>
                <dl><dt>定位时间</dt><dd>2018-12-12</dd></dl>
                <div class="clear"></div>
            </li>
            <li>
                <div class="introduction">
                <h4>标题标题标题标题标题标题标题标题标题标题</h4>
                </div>
                <dl><dt>班级</dt><dd>2018-12-12</dd></dl>
                <dl><dt>上课时间</dt><dd>2018-12-12</dd></dl>
                <dl><dt>节次</dt><dd>2018-12-12</dd></dl>
                <dl><dt>定位时间</dt><dd>2018-12-12</dd></dl>
                <div class="clear"></div>
            </li>
        </ul>
        </van-list>
    </div>
</template>

<script>
export default {
name:'orientation',
data(){
    return{
        pageIndex: 1,
        isLoading: false,                     //列表数据加载中
        loading: false,                      //列表加载数据
        finished: false,                    //列表中是否加载了所有数据
        orientationList:[]                 //获取
    }
},
mounted(){

},
methods:{
    getOrientation:function(){
        let that = this;
        //判断是否正在加载数据
        if (that.isLoading == false) {
            that.isLoading = true;
        } else {
            return false;
        }
        if (isInit == true) {
            that.finished = false;
            that.pageIndex = 1;
        }
        let url = "/api/Plan/GetMyPlanList";
        let param = { pageindex: that.pageIndex, val: that.searchData };

        that.$api.get(url, param, res => {
            let resCount = res.length;
            console.log("成功加载备课:" + resCount);
            // console.log(res);
            if (isInit == true) {
                that.myPlanList = res;
            } else {
                that.myPlanList = that.myPlanList.concat(res);
            }
            that.pageIndex++;
            // 加载状态结束
            that.loading = false;
            that.isLoading = false;
            if (resCount < 10) {
                that.finished = true;
            }
        });

    }
}
}
</script>

<style>

</style>
