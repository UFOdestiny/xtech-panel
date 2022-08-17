<template>
    <el-checkbox v-model="ontime" label="实时" @change="TimeChange" border />
</template>
<script>

export default {
    name: 'QuoteType',
    data() {
        return {
            ontime: true,
        };
    },
    methods: {
        TimeChange(selected) {
            this.$store.commit('changeTimeType', selected)
        }
    }

};
</script>