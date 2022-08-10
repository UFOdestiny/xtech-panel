<template>
    <el-select v-model="type" placeholder="请选择图表" @change="GraphChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>
<script>

import emitter from "@/utils/bus"
export default {
    name: 'SelectGraph',
    data() {
        return {
            options: [{
                value: '名义本金',
                label: '名义本金'
            }, {
                value: '历史波动率',
                label: '历史波动率'
            }, {
                value: 'CPR',
                label: 'CPR'
            }, {
                value: '升贴水',
                label: '升贴水'
            }, {
                value: '偏度',
                label: '偏度'
            }, {
                value: 'SmileSurface',
                label: 'SmileSurface'
            }, {
                value: '波动率差异',
                label: '波动率差异'
            }, {
                value: '平值隐波',
                label: '平值隐波'
            }, {
                value: '垂直价差',
                label: '垂直价差'
            },],
            type: '名义本金',
        };
    },

    methods: {
        GraphChange(selected) {
            emitter.emit('GraphTypeChange', {GraphType: selected})
        },

    }

};
</script>