<template>
    <el-form :model="form" :inline="true" >
        <el-form-item>
            <el-tree-select v-model="form.value" :data="form.data3" :render-after-expand="false"
                @change="RightGraphChange" />
        </el-form-item>

        <el-form-item>
            <DatePickerVue />
        </el-form-item>

        <el-form-item>
            <LiveVue />
        </el-form-item>
        <el-form-item>
            123
        </el-form-item>
        <el-form-item>
            456
        </el-form-item>

    </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import DatePickerVue from './DatePicker.vue';
import LiveVue from './Live.vue';
// do not use same name with ref
const form = reactive({
    value: '当天波动率曲面图',
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    data3: [
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
    ],
})

</script>