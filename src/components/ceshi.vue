<template>
    <div class="ceshi">

<ul class="list">
    <li class="item" v-for="section in sectionList">
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
    </div>
</template>

<script>

export default {
name:"ceshi",
data(){
    return{
        sectionList:[
            {PartName:"adasasdasda",TeacherName:"dadasdada"}
        ]
    }
},
methods:{
    
}
}
</script>

<style>

</style>
