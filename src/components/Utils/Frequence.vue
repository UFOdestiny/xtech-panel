<template>
    <el-select v-model="type" placeholder="请选择频率" @change="FrequenceChange" style="width: 100%;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>
<script>

export default {
    name: 'Frequence',
    data() {
        return {
            options: [{
                value: '2min',
                label: '2min'
            }, {
                value: '5mim',
                label: '5mim'
            }, {
                value: '15min',
                label: '15min'
            }, {
                value: '30min',
                label: '30min'
            }, {
                value: '1h',
                label: '1h'
            }, {
                value: '1.5h',
                label: '1.5h'
            }, {
                value: '2h',
                label: '2h'
            }, {
                value: '1d',
                label: '1d'
            },],
            type: '2min',
        };
    },
    methods: {
        FrequenceChange(selected) {
            this.$store.commit('changeFrequence', selected)
        },


    }

};
</script>