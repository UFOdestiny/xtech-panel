<template>


    <div>
        <keep-alive>
            <component :is="strategyTabs" />
        </keep-alive>
    </div>

</template>

<script>
import EchartContainer from '@/components/EchartContainer.vue'
export default {
    name: 'KlineGraph',
    components: { EchartContainer },
    props: {},
    data() {
        return {
            strategyInfo: {},
            infoLoading: true,
            strategyTabs: 'EchartContainer',
        }
    },

}
</script>
<style scoped>
</style>

