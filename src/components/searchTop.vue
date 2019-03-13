<template>
    <div class="searchTop">
        <div class="topBox">
            <div class="searchBox">
                <a class="more" @click="$store.commit('switch_dialog')">
                    <i class="icon bpMobile bpMobile-shaixuan"></i>
                </a>
                <div class="searchBoxN">
                    <el-input placeholder="请输入内容" v-model="input5" size="medium" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="searchSub()"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="topNav">
                <!-- <router-link v-if="userRole<4" active-class="on" to="/myLesson">我的备课</router-link> -->
                <router-link active-class="on" to="/myLesson">我的备课</router-link>
                <!-- <router-link active-class="on" to="/orientation">课程定位</router-link> -->
                <router-link active-class="on" to="/shareSchool">学校共享</router-link>
                <router-link active-class="on" to="/shareCounty">区县共享</router-link>
                <router-link v-if="userRole<4" active-class="on" to="/myCollect">我的收藏</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "searchTop",
    props: ["pageType"], //接收父页面传来的数据
    data() {
        return {
            inputnr: "",
            input5: "",
            userRole: 0
        };
    },
    mounted() {
        this.userRole = this.$store.state.userRole;
        this.yangshi();
    },
    methods: {
        searchSub: function() {
            this.$emit("searchBack", this.input5);
        },
        yangshi: function() {
            var topLink = document.getElementsByClassName("topNav")[0];
            console.log(topLink.children.length);
            if (topLink.children.length > 4) {
                topLink.className = "topNavMore";
            }
        }
    }
};
</script>

<style>
</style>
