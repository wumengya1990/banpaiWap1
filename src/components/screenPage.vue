<template>
    <div class="screenPage">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>

    </div>
</template>

<script>
export default {
    name:'screenPage',
    data(){
        return{
             slots: [
                {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot1',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot2'
                }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot3',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot4'
                }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot5',
                textAlign: 'center'
                }
            ]
        }
    },
    methods:{
        onValuesChange(picker, values) {
        if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
        }
        }
    }
}
</script>

<style>

</style>
