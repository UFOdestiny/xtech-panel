<template>
    <el-checkbox v-model="ontime" label="实时" @change="TimeChange" style="width: 100%;" border />
</template>
<script>

export default {
    name: 'QuoteType',
    data() {
        return {
            ontime: false,
        };
    },
    methods: {
        TimeChange(selected) {
            this.$store.commit('changeTimeType', selected)
        }
    }

};
</script>