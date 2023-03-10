<template>
    <el-select v-model="type" placeholder="时间间隔" @change="IntervalPriceChange" style="width: 100%;">
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
            },{
                value: 'optargetderivativevol_5m',
                label: '5m'
            }, {
                value: 'optargetderivativevol_15m',
                label: '15m'
            }, {
                value: 'optargetderivativevol_30m',
                label: '30m'
            }],
            type: '1h',
        };
    },
    methods: {
        IntervalPriceChange(selected) {
            this.$store.commit('changePriceInterval', selected)
        },
    }

};
</script>