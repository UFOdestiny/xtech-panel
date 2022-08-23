<template>
    <el-tree-select v-model="value" :data="data" :render-after-expand="false" @change="RightGraphChange" style="width: 100%;"/>
</template>

<script setup>
import { ref } from 'vue'
const value = ref()
value.value = "当天波动率曲面图"

const data = [
    {
        value: '当天波动率曲面图',
        label: '当天波动率曲面图',
    },
    {
        value: '成交量/持仓量增量分布图',
        label: '成交量/持仓量增量分布图',
        children: [
            {
                value: '成交量',
                label: '成交量',
            },
            {
                value: '成交量增量',
                label: '成交量增量',
            },
            {
                value: '持仓量',
                label: '持仓量',
            },
            {
                value: '持仓量增量',
                label: '持仓量增量',
            },
        ],
    },
    {
        value: '历史波动率锥图',
        label: '历史波动率锥图',
    },
    {
        value: 'Vix历史锥图',
        label: 'Vix历史锥图',
    },
    {
        value: '历史价格锥图',
        label: '历史价格锥图',
    },
]

const RightGraphChange = (selected) => {
    this.$store.commit('changeRightGraphType', selected)
    //console.log(selected)

}

</script>
