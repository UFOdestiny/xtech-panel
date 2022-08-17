<template>
    <DatePicker />
    <QuoteType />

</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
export default {
    name: 'CPR',
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