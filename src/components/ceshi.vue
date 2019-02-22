<template>
    <div class="ceshi">

    <ul class="list">
        <li class="item" v-for="(section,index) in sectionList" :key="index">
            <mt-cell-swipe
                :right="[
                    {
                        content: '删除',
                        style: { background: '#ff7900', color: '#fff'},
                        handler: () => deleteSection(section.PartId)
                    }
                ]">
                <p class="section">{{section.PartName}}</p>
                <p class="teacher">{{section.TeacherName}}</p>
            </mt-cell-swipe>
        </li>
    </ul>

    <div class="mixins">
        <span>{{msg | uppercase}}</span>
    </div>

    </div>
</template>

<script>
import {xiangshi} from './mixins/hunru.js'

export default {
mixins: [xiangshi],
name:"ceshi",
data(){
    return{
        sectionList:[
            {"PartName":"你妹","TeacherName":"你奶奶"}
        ],
        mes:"草草草草草草草草草草草草"
    }
},
methods:{
    
}
}
</script>

<style>

</style>
