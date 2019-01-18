<template>
    <div class="about mianScroll bgmain">
        <div class="editionList">
            <div class="editionListN">
                <div class="editionBox">
                    <h2>备课移动端v0.2.0b</h2>
                    <div class="editionBoxN">
                        <h3>修复内容</h3>
                        <ul>
                            <li>修复了详情页面的图片与附件的无法打开的问题</li>
                            <li>修复了新增备课时偶现的保存失败问题</li>
                            <li>修复了收藏后状态不正确的问题</li>
                            <li>修复了移动端定位记录与PC端不一致的问题</li>
                        </ul>
                    </div>
                    <div class="editionBoxN">
                        <h3>修改与新增</h3>
                        <ul>
                            <li>调整了用户权限，区县管理员不能使用我的备课与我的收藏功能</li>
                            <li>我的收藏功能添加筛选方法</li>
                            <li>添加了我的备课的定位记录页面，显示老师的备课定位记录</li>
                            <li>备课详情与新增页面添加配置控制，根据配置显示具体功能</li>
                        </ul>
                    </div>
                </div>

                <div class="editionBox">
                    <h2>备课移动端v0.1.0b</h2>
                    <div class="editionBoxN">
                        <h3>备课移动端的第一版</h3>
                        <ul>
                            <li>制作了我的备课功能，实现我的备课的新增、查询、备课定位、教学反思</li>
                            <li>制作了学校共享与区县共享页面，对共享备课的收藏与分享</li>
                            <li>制作了我的收藏页面，提供收藏备课的查询</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bts">
                <button @click="pageBack">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "about",
    methods: {
        pageBack: function() {
            this.$router.back(-1);
        }
    }
};
</script>

<style>
.editionList {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.editionList .editionListN {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 4rem;
    margin: auto;
    overflow: hidden;
    overflow-y: auto;
}
.editionList .bts {
    text-align: center;
    height: 4rem;
    position: absolute;
    left: 0;
    top: auto;
    right: 0;
    bottom: 0;
    margin: auto;
}
.editionList .bts button {
    width: 80%;
    height: 2.5rem;
    line-height: 2rem;
    margin: 0.5rem auto;
    background: #ffffff;
    font-size: 1rem;
    border-radius: 50px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid #eaeaea;
}

.editionBox {
    background: #ffffff;
    margin: 10px;
    padding: 0 10px 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px #c5c5c5;
}
.editionBox h2 {
    font-size: 1.3rem;
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    padding: 10px 0;
    margin: 0 0 10px;
}
.editionBox h3 {
    font-size: 1rem;
    font-weight: bold;
}
.editionBoxN ul {
    padding: 0 0 10px;
}
.editionBoxN ul li {
    padding: 0 0 0 15px;
    margin: 5px 0 0;
    position: relative;
    line-height: 1.5em;
}
.editionBoxN ul li:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    line-height: normal;
    background: #000000;
    border-radius: 50%;
    overflow: hidden;
    left: 0;
    top: 8px;
}
</style>
