<template>
    <div class="orientation bgmain mianScroll">
        <div class="conditionBox">
            <div>
                <em>定位时间</em>
                <div class="overHide padLR10 timeChoBox">
                    <p @click="chouseTimeB()">{{beginDate}}</p>
                </div>
                <span>至</span>
                <div class="overHide padLR10 timeChoBox">
                    <p @click="chouseTimeE()">{{endDate}}</p>
                </div>

            </div>
            <!-- <div>
                <em>结束日期</em>
                <div class="overHide padLR10">
                    <p @click="chouseTimeE()">{{endDate}}</p>
                </div>
            </div> -->
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="getOrientation" class="orientationList">
            <ul class="orientationListBox">
                <li v-for="(dingwei,index) in orientationList" :key="index">
                    <div class="introduction">
                        <h4>{{dingwei.planTitle}}</h4>
                    </div>
                    <dl>
                        <dt><span><i class="icon bpMobile bpMobile-xuexiao_banji"></i></span>班级</dt>
                        <dd>{{dingwei.gradeName+dingwei.className}}班</dd>
                    </dl>
                    <dl>
                        <dt><span><i class="icon bpMobile bpMobile-shijian1"></i></span>上课时间</dt>
                        <dd>{{dingwei.lessonDateValue}}</dd>
                    </dl>
                    <dl>
                        <dt><span><i class="icon bpMobile bpMobile-xuexiao_kemu"></i></span>科目</dt>
                        <dd>{{dingwei.studyName}}</dd>
                    </dl>
                    <dl>
                        <dt><span><i class="icon bpMobile bpMobile-webicon03"></i></span>节次</dt>
                        <dd>{{dingwei.lessonId}}</dd>
                    </dl>

                    <div class="clear"></div>
                </li>
            </ul>
        </van-list>
        <div class="establishBut">
            <el-button style="width:80%;" @click="pageBack()" round>返回</el-button>
            <!-- <el-button type="primary" round @click="savePlan()">保存教案</el-button> -->
        </div>
        <van-popup v-model="bottomShow" position="bottom" :overlay="true">
            <van-datetime-picker
                title="选择开始时间"
                v-model="selBeginDate"
                type="date"
                :min-date="minDate"
                @cancel="bottomShow=!bottomShow"
                @confirm="confirmBegin"
            />
        </van-popup>
        <van-popup v-model="bottomShow1" position="bottom" :overlay="true">
            <van-datetime-picker
                title="选择结束时间"
                v-model="selEndDate"
                type="date"
                :min-date="minDate"
                @cancel="bottomShow1=!bottomShow1"
                @confirm="confirmEnd"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "orientation",
    data() {
        return {
            pageIndex: 1,
            isLoading: false,          //列表数据加载中
            loading: false,            //列表加载数据
            finished: false,           //列表中是否加载了所有数据
            receive: "",
            bottomShow: false,
            bottomShow1: false,
            timeCho: "",
            orientationList: [], //获取
            //时间内容
            minDate: new Date(),
            // selBeginDate: new Date(),
            selBeginDate:this.getBeginTime(),
            selEndDate:this.getEndTime(),

            beginDate: new Date().toLocaleDateString(),
            endDate: new Date(
                (new Date() / 1000 + 86400) * 1000
            ).toLocaleDateString(),
            InterceptNumber:{               //截取列表内容
                beginNum:0,
                endNum:10
            }
        };
    },
    mounted() {},
    watch: {
        // beginDate(val) {
        //     console.log(val);
        // },
        // endDate(val) {
        //     console.log(val);
        // }
    },
    methods: {
        //确认开始时间并查询课时定位
        confirmBegin: function(value) {
            console.log(value);
            this.selBeginDate = value;
            if (this.selBeginDate > this.selEndDate) {
                this.$vnotify("开始日期不能大于结束日期");
                return false;
            }
            this.beginDate = value.toLocaleDateString();
            this.bottomShow = !this.bottomShow;
            this.getOrientation(true);
        },
        //确认结束时间并查询课时定位
        confirmEnd: function(value) {
            this.selEndDate = value;
            if (this.selBeginDate > this.selEndDate) {
                this.$vnotify("开始日期不能大于结束日期");
                return false;
            }
            this.endDate = value.toLocaleDateString();
            console.log(this.endDate);
            this.bottomShow1 = !this.bottomShow1;
            this.getOrientation(true);
        },

        pageBack: function() {
            this.$router.back(-1);
        },
        //加载定位记录列表
        getOrientation: function(isInit) {
            let that = this;
            //判断是否正在加载数据
            if (that.isLoading == false) {
                that.isLoading = true;
            } else {
                return false;
            }

            if (isInit == true) {             //默认加载不用有条件的时候使用
                that.finished = false;
                that.pageIndex = 1;
            }
            let url = "/api/Plan/GetPlanLessonList";
            // let param = { pageindex: that.pageIndex, val: that.searchData };
            let param = {
                begindate: that.beginDate,
                enddate: that.endDate
            };
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
                if (isInit == true) {
                    that.orientationList = res;
                } else {
                
                    if(this.InterceptNumber.beginNum >= res.length ){
                        that.orientationList = that.orientationList;
                         that.finished = true;
                        
                    }else{
                        that.orientationList = that.orientationList.concat(res.slice(that.InterceptNumber.beginNum,that.InterceptNumber.endNum));
                        that.InterceptNumber.beginNum += 10;
                        that.InterceptNumber.endNum += 10;
                    }
                    
                }
                // that.pageIndex++;
                // 加载状态结束
                that.loading = false;
                that.isLoading = false;
                if (resCount < 10) {
                    that.finished = true;
                }
            });
        },
        chouseTimeB: function() {
            //开始时间显示
            this.bottomShow = !this.bottomShow;
        },
        chouseTimeE: function() {
            //结束时间显示
            this.bottomShow1 = !this.bottomShow1;
        },
        getBeginTime:function(){
            let date = new Date();
            var myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
            return myDate;
        },
        getEndTime:function(){
            let date = new Date();
            var myDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDate()+1)
            return myDate;
        },
    }
}

</script>

<style>
</style>
