<template>

    <SelectGraph />

    <DatePicker />

    <SelectList />

    <keep-alive>
        <Graph />
    </keep-alive>

</template>

<script>
import SelectGraph from '@/components/SelectGraph.vue';
import DatePicker from '@/components/DatePicker.vue';
import SelectList from '@/components/SelectList.vue';
import Graph from '@/components/KlineGraph.vue';

import emitter from "@/utils/bus"
import { onBeforeUnmount, onMounted } from "vue";

export default {
    name: 'EchartContainer',
    components: { Graph, SelectGraph, DatePicker, SelectList, },
    setup() {
        onMounted(() => {
            emitter.on('GraphTypeChange', data => {
                console.log(data)
            })
        });
        onBeforeUnmount(() => {
            emitter.off('GraphTypeChange')  //关闭
        })
    },
};

</script>

<style scoped>
</style>
