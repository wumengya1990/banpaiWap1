<template>
    <div class="appList">
        <div class="appCenterList">
                <div class="topAD"><img :src="ad.adUrl"></div>
                <div class="appCenterListN">
                <h3><span>常用应用</span><!--<a href="">保存</a>--></h3>
                <ul>
                    <li v-for="(app,index) in commonlyUsedList" :key="index">
                        <div>
                            <a href=""><img :src="app.appIcourl"></a>
                        </div>
                        <p><a href="">{{app.appName}}</a></p>
                    </li>
                        <!-- <li><div><a href="myLessons.html"><img src="../images/beikexitong.png"></a></div><p><a>备课系统</a></p></li>
                        <li><div><a><img src="../images/oaxitong.png"></a></div><p><a>局OA</a></p></li>
                        <li><div><a><img src="../images/xunkexitong.png"></a></div><p><a>智能巡课</a></p></li>
                        <li><div><a><img src="../images/pengchengketang.png"></a></div><p><a>彭城课堂</a></p></li>
                        <li><div><a><img src="../images/shujushangbao.png"></a></div><p><a>数据上报</a></p></li>
                        <li><div><a><img src="../images/dudaoxitong.png"></a></div><p><a>督导系统</a></p></li>
                        <li><div><a><img src="../images/suzhipingjia.png"></a></div><p><a>素质评价</a></p></li>
                        <li><div><a><img src="../images/oaxitong.png"></a></div><p><a>局OA</a></p></li>
                        <li><div><a><img src="../images/xunkexitong.png"></a></div><p><a>智能巡课</a></p></li>
                        <li><div><a><img src="../images/pengchengketang.png"></a></div><p><a>彭城课堂</a></p></li>
                        <li><div><a><img src="../images/shujushangbao.png"></a></div><p><a>数据上报</a></p></li>
                        <li><div><a><img src="../images/beikexitong.png"></a></div><p><a>备课系统</a></p></li>
                        <li><div><a><img src="../images/dudaoxitong.png"></a></div><p><a>督导系统</a></p></li>
                        <li><div><a><img src="../images/suzhipingjia.png"></a></div><p><a>素质评价</a></p></li> -->
                    </ul>
                    <div class="clear"></div>
                </div>
    
                <div class="appCenterListN">
                <h3><span>全部应用</span></h3>
                <ul>
                    <li v-for="(app,index) in allAppList" :key="index">
                        <div>
                            <a href=""><img :src="app.appIcourl"></a>
                        </div>
                        <p><a href="">{{app.appName}}</a></p>
                    </li>
                        
                    </ul>
                    <div class="clear"></div>
                </div>
    
            </div>

            <div class="bottomNav">
                <span><i class="icon bpMobile bpMobile-xiaoxi"></i><em>消息</em></span>
                <span><i class="icon bpMobile bpMobile-tongxunlu"></i><em>联系人</em></span>
                <span><i class="icon bpMobile bpMobile-shijian"></i><em>事物</em></span>
                <span class="on"><i class="icon bpMobile bpMobile-menu_app_down"></i><em>应用</em></span>
                <span><i class="icon bpMobile bpMobile-wode"></i><em>我</em></span>
            </div>
    </div>
</template>

<script>
export default {
    name:"appList",
    data(){
        return{
            ad:{
                adName:'广告1',
                adUrl:require('./../assets/images/adImg.jpg')
            },
            allAppList:[
                {appName:'备课系统',appIcourl:require('./../assets/images/beikexitong.png')},
                {appName:'局OA',appIcourl:require('./../assets/images/oaxitong.png')},
                {appName:'智能巡课',appIcourl:require('./../assets/images/xunkexitong.png')},
                {appName:'彭城课堂',appIcourl:require('./../assets/images/pengchengketang.png')},
                {appName:'数据上报',appIcourl:require('./../assets/images/shujushangbao.png')}
            ],
            commonlyUsedList:[
                {appName:'备课系统',appIcourl:require('./../assets/images/beikexitong.png')},
                {appName:'局OA',appIcourl:require('./../assets/images/oaxitong.png')},
                {appName:'智能巡课',appIcourl:require('./../assets/images/xunkexitong.png')},
                {appName:'彭城课堂',appIcourl:require('./../assets/images/pengchengketang.png')},
                {appName:'数据上报',appIcourl:require('./../assets/images/shujushangbao.png')}
            ]
        }
    }
}
</script>

<style>

</style>
