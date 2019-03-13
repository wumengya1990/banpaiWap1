<template>
    <div class="firstPage">
        <router-link v-if="$store.state.role < 4" to="myLesson">进入我的备课</router-link>
        <router-link v-else to="myLesson">进入我的备课</router-link>
    </div>
</template>

<script>
export default {
    name:'firstPage',
    data(){
        return{
            
        }
    },
    mounted(){
        this.setList();
    },
    methods:{
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        setList: function() {
            let that = this;
            let mySource = that.getQueryString("source");
            let myuId = that.getQueryString("uId");
            let mytoken = that.getQueryString("token");
            let dataList = new Object();
            if (!that.$isNull(mySource)) {
                dataList.source = mySource;
            }
            if (!that.$isNull(myuId)) {
                dataList.uId = myuId;
            }
            if (!that.$isNull(mytoken)) {
                dataList.token = mytoken;
            }
            that.formData = dataList;
            let token = dataList.token;
            console.log("开始授权登录");
            const vd = that.$vloading("开始用户中心授权登录...");
            if (dataList != null) {
                let urlp = "/api/account/home";
                that.$api.get(urlp, dataList, res => {
                    if (res.success) {
                        vd.clear();
                        console.log("授权登录成功");
                        // that.$vnotify("授权登录成功，页面跳转中...");
                        that.$store.commit("saveToken", res.token); //保存 token
                        that.$store.commit("saveRole", res.role); //保存 role
                        // setTimeout(function() {
                        //     if (res.role < 4) {
                        //         that.$router.push({ path: "/myLesson" });
                        //     } else {
                        //         that.$router.push({ path: "/shareCounty" });
                        //     }
                        // }, 1500);
                    } else {
                        console.log("授权登录失败");
                        vd.clear();
                        that.$vnotify(res.msg);
                        that.$router.push({ path: "/errorPage" });
                    }
                });
            } else {
                that.$vnotify("参数传递不完整");
                that.$router.push({ path: "/errorPage" });
            }
        }
    }
}
</script>

<style>

</style>
