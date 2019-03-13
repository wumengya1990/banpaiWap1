<template>
    <div class="errorPage bgmain mianScroll">
        <dl>
            <dt><img :src="cuowuImg"></dt>
            <dd>连接断开，<br />请刷新尝试重新登录！</dd>
        </dl>
    </div>
</template>

<script>
export default {
    name:'errorPage',
    data(){
        return{
            cuowuImg:require("./../assets/images/loginNotice.png")
        }
    }
}
</script>

<style>

</style>
