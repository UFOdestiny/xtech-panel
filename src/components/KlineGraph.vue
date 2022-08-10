<template>
    <div>
        <keep-alive>
            <component :is="KlineGraph" />
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
            KlineGraph: 'EchartContainer',
        }
    },

}
</script>
z

