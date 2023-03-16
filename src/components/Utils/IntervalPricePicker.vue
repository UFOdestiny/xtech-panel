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
                value: 'optargetderivativeprice_1d',
                label: '1d'
            }, {
                value: 'optargetderivativeprice_2h',
                label: '2h'
            }, {
                value: 'optargetderivativeprice_1h',
                label: '1h'
            },{
                value: 'optargetderivativeprice_5m',
                label: '5m'
            }, {
                value: 'optargetderivativeprice_15m',
                label: '15m'
            }, {
                value: 'optargetderivativeprice_30m',
                label: '30m'
            }],
            type: '15m',
        };
    },
    methods: {
        IntervalPriceChange(selected) {
            this.$store.commit('changePriceInterval', selected)
        },
    }

};
</script>