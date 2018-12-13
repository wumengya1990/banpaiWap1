<template>
    <div class="connectPage"></div>
</template>

<script>
export default {
    name: "ConnectPage",
    data() {
        return {
            formData: []
        };
    },
    mounted() {
        this.setList();
    },
    methods: {
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

            if (dataList != null) {
                let urlp = "/api/account/home";
                that.$api.get(urlp, dataList, res => {
                    if (res.success) {
                        that.$store.commit("saveToken", res.token); //保存 token
                        that.$store.commit("saveRole", res.role); //保存 role
                        if (res.role < 4) {
                            that.$router.push({ path: "/myLesson" });
                        } else {
                            that.$router.push({ path: "/shareCounty" });
                        }
                    } else {
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
};
</script>

<style>
</style>
