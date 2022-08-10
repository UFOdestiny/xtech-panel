<template>
    <el-select v-model="type" placeholder="请选择图表" @change="RightGraphChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>
<script>

import emitter from "@/utils/bus"
export default {
    name: 'SelectRightGraph',
    data() {
        return {
            options: [{
                value: '当天波动率曲面图',
                label: '当天波动率曲面图'
            }, {
                value: '成交量/持仓量增量分布图',
                label: '成交量/持仓量增量分布图'
            }, {
                value: '历史波动率锥图',
                label: '历史波动率锥图'
            }, {
                value: 'Vix历史锥图',
                label: 'Vix历史锥图'
            }, {
                value: '历史价格锥图',
                label: '历史价格锥图'
            }],
            type: '当天波动率曲面图',
        };
    },

    methods: {
        RightGraphChange(selected) {
            emitter.emit('RightGraphTypeChange', {RightGraphType: selected})
        },

    }

};
</script>