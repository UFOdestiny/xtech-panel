<template>
    <el-select v-model="type" placeholder="请选择期权类型" @change="TypeChange" style="width: 100%;">
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
                value: '50ETF',
                label: '50ETF'
            }, {
                value: '300ETF沪',
                label: '300ETF沪'
            }, {
                value: '300ETF深',
                label: '300ETF深'
            }, {
                value: 'HS300',
                label: 'HS300'
            }, {
                value: 'zz100',
                label: 'zz100'
            }],
            type: '50ETF',
        };
    },
    methods: {
        TypeChange(selected) {
            this.$store.commit('changeQuoteType', selected)
        },
    }

};
</script>