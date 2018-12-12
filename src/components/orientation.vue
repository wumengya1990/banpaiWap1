<template>
    <div class="orientation bgmain mianScroll">
        <div class="conditionBox">
            <!-- <div><el-date-picker
                v-model="timeCho"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div> -->
            <div><em>结束时间</em><div class="overHide"><button @click="bottomShow=!bottomShow">ca</button></div></div>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="getOrientation">
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

        <van-popup v-model="bottomShow" transition="时间选择" position="bottom" cancel-button-text="取消" confirm-button-text="确定" :overlay="true">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
            />
        </van-popup>
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
        receive: "",
        bottomShow:false,
        timeCho:'',
        orientationList:[],                 //获取
        //时间内容
        minDate: new Date(2018, 0, 1),
        currentDate: new Date()
    }
},
mounted(){

},
methods:{
    getOrientation:function(isInit){
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
        let mes = that.receive;

        if (that.$isNull(mes) == false) {
                for (const key in mes) {
                    if (mes[key] == null || mes[key] == "") {
                        continue;
                    } else if (mes.hasOwnProperty(key)) {
                        param[key] = mes[key];
                    }
                }
            }

        that.$api.get(url, param, res => {
            let resCount = res.length;
            console.log("加载课程定位成功:" + resCount);
            // console.log(res);
            if (isInit == true) {
                that.orientationList = res;
            } else {
                that.orientationList = that.orientationList.concat(res);
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
