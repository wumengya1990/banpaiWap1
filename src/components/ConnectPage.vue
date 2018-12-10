<template>
    <div class="connectPage"></div>
</template>

<script>
export default {
name:'ConnectPage',
data(){
    return{
        formData:[],
    }
},mounted(){
    let that = this;
    let url = "/beike/api/Account/home?source&uId=xxx&token=xxx";
    let source = this.$route.query.source;
    let uId = this.$route.query.uId;
    let token = this.$route.query.token;
    let that.formData ={
        source:source,
    };
    axios.get(url).then(res=>{
        this.formData=res
        if( this.formData != null ){
            let urlp = "/account/home?source&uId=xxx&token=xxx";
            axios.get(urlp,this.formData).then(res=>{
                if(res.success){
                 let token = res.token;
                that.$store.commit("saveToken", token); //保存 token
                that.$router.replace(
                    // that.$route.query.redirect ? that.$route.query.redirect : "/"
                    that.$route.query.redirect ? that.$route.query.redirect : "/"
                    );
                }else{
                    console.log(res.msg);
                }
            })
        }
    })
}

}
</script>

<style>

</style>
