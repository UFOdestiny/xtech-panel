<template>
    <DatePicker />
    <QuoteType />

</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
export default {
    name: 'IVDiff',
    components: { DatePicker, QuoteType },
    data() {
        return {
        };
    },
    watch: {
    },
    methods: {},
    mounted() {
    },
    beforeUnmount() {
    },
}
</script>