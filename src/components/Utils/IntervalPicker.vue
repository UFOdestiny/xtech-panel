<template>
    <el-select v-model="type" placeholder="时间间隔" @change="IntervalChange" style="width: 100%;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>
<script>
//import { ref } from 'vue'
//50ETF、300ETF沪、300ETF深、HS300、zz100
export default {
    name: 'IntervalPicker',
    data() {
        return {
            options: [{
                value: 'optargetderivativevol_1d',
                label: '1d'
            }, {
                value: 'optargetderivativevol_2h',
                label: '2h'
            }, {
                value: 'optargetderivativevol_1h',
                label: '1h'
            }],
            type: '1d',
        };
    },
    methods: {
        IntervalChange(selected) {
            this.$store.commit('changeInterval', selected)
        },
    }

};
</script>