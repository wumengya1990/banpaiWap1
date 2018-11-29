<template>
    <div class="newCourse mianScroll bgmain">
        <div class="establish mianScroll">

            <div class="establishBox">
                <h4><span>教案基本属性</span></h4>
                <ul>
                    <li><em><i>*</i>教案位置</em><div class="overHide"><el-input v-model="inputWZ" placeholder="请输入内容"></el-input></div></li>
                    <li><em><i>*</i>教案名称</em><div class="overHide"><el-input v-model="inputMC" placeholder="请输入内容"></el-input></div></li>
                    <li><em>课时数</em><div class="overHide"><el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number></div></li>
                </ul>
            </div>

            <div class="establishBox">
                <h4><span>教案设计</span></h4>
                <ul>
                    <li><em><i>*</i>教案类型</em><div class="overHide">
                        <p>
                        <el-radio v-model="radio" label="2">图片</el-radio>
                    </p>
                    </div></li>
                    <li><em><i>*</i>教案名称</em><div class="overHide">
                            <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList2"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                            <div class="clear"></div>
                    </div></li>
                </ul>
            </div>

            <div class="establishBox">
                    <h4><span>课堂素材</span></h4>
                    <ul>
                        <li>
                            <div style="margin:0 10px;">
                                <el-button type="primary" size="small">本地选择</el-button>
                                <el-button type="primary" size="small">素材库选择</el-button>
                                <el-button type="primary" size="small">网络引用</el-button>
                                <el-button type="primary" size="small">站点推荐</el-button>
                            </div>
                        </li>
                        <li><el-checkbox-group v-model="checkList" style="margin:0 0 0 10px;">
                                <el-checkbox label="学校共享"></el-checkbox>
                                <el-checkbox label="区县共享"></el-checkbox>
                              </el-checkbox-group></li>
                    </ul>
                </div>

            
        </div>

        <div class="establishBut"><el-button type="primary" round @click="submitForm()">保存教案</el-button></div>


    </div>
</template>

<script>
export default {
    name:'newCourse',
    data(){
        return{
            inputWZ:'',
            inputMC:'',
            radio: '2',
            num1: 1,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            checkList:[]
        }
    },
    methods:{
        handleChange(value) {
            console.log(value);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        subButton:function(){

        },
        submitForm:function(value1,value2){
            if(value1===''&& value2===''){
                console.log("请输入用户名和密码");
	   	    	return false;
            }
            this.$ajax({
                method:'post',
                url:'',
                data:{
                    
                }
            })
        }
    }
}
</script>

<style>
    .el-button+.el-button{ margin-left: 5px;}
    .el-button--small, .el-button--small.is-round{ padding: 9px 8px;}
</style>
