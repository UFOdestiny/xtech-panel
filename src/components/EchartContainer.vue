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

export default {
    name: 'EchartContainer',
    components: { Graph, SelectGraph, DatePicker, SelectList, },

    watch: {
        '$store.state.GraphType': function () {
            //console.log(this.$store.state.GraphType)
        },
    },
};

</script>

<style scoped>
</style>
