<template>
    <el-select v-model="type" placeholder="请选择期权类型" @change="TypeChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
    <el-checkbox v-model="ontime" label="实时" @change="TimeChange" border />
</template>
<script>
//import { ref } from 'vue'
//50ETF、300ETF沪、300ETF深、HS300、zz100
import emitter from "@/utils/bus"
export default {
    name: 'SelectList',
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
            ontime: true,
        };
    },
    methods: {
        TypeChange(selected) {
            emitter.emit('QuoteTypeChange', { QuoteType: selected })
        },

        TimeChange(selected) {
            emitter.emit('TimeTypeChange', { TimeType: selected })
        }
    }

};
</script>