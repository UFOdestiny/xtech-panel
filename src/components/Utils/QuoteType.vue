<template>
    <el-select v-model="type" placeholder="标的" @change="QuoteTypeChange" style="width: 100%;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
    </el-select>
</template>
<script>
//import { ref } from 'vue'
//50ETF、300ETF沪、300ETF深、HS300、zz100
export default {
    name: 'QuoteType',
    data() {
        return {
            options: [{
                value: '510050.XSHG',
                label: '510050'
            }, {
                value: '510300.XSHG',
                label: '510300'
            }, {
                value: '510500.XSHG',
                label: '510500'
            }, {
                value: '159901.XSHE',
                label: '159901'
            }, {
                value: '159915.XSHE',
                label: '159915'
            },{
                value: '159919.XSHE',
                label: '159919'
            }, {
                value: '159922.XSHE',
                label: '159922'
            }, {
                value: '000016.XSHG',
                label: '000016'
            }, {
                value: '000300.XSHE',
                label: '000300'
            }, {
                value: '000852.XSHE',
                label: '000852'
            }],
            type: '510050',
        };
    },
    methods: {
        QuoteTypeChange(selected) {
            this.$store.commit('changeQuoteType', selected)
        },
    }

};
</script>