<template>
    <el-date-picker v-model="date" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabledDate="disabledDate"
        @change="dateChange" :shortcuts="shortcuts" @calendar-change="calendarChange"
        :default-time='[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]' style="width: 97%;">
    </el-date-picker>
</template>   

<script>
//import { daysInterval } from '@/utils/index'
//快捷方式

export default {
    name: 'DatePicker',
    data() {
        return {
            //日期选择器快捷方式
            shortcuts: [
                {
                    text: "最近一周",
                    value: () => {
                        const start = new Date();
                        start.setDate(start.getDate() - 7);
                        return [start, new Date()]
                    }
                },
                {
                    text: "最近一个月",
                    value: () => {
                        const start = new Date();
                        start.setMonth(start.getMonth() - 1);
                        return [start, new Date()]
                    }
                },
                {
                    text: "最近三个月",
                    value: () => {
                        const start = new Date();
                        start.setMonth(start.getMonth() - 3);
                        return [start, new Date()]
                    }
                },
                {
                    text: '最近六个月',
                    value: () => {
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        return [start, new Date()]
                    }
                },
                {
                    text: '最近一年',

                    value: () => {
                        const start = new Date();
                        start.setFullYear(start.getFullYear() - 1);
                        return [start, new Date()]
                    }

                },
            ],
            //默认开始日期
            startDate: null,
            date: [this.$store.state.Date[0], this.$store.state.Date[1]]//daysInterval(3),
            //下拉框
        };
    },
    watch: {
        'data.date'(newValue, oldValue) {
            console.log(newValue, oldValue);
        },
    },
    methods: {
        disabledDate(time) {

            return (time.getTime() > Date.now() || time.getTime() < +new Date("2020-01-01"));
        },

        dateChange(value) {
            this.$store.commit('changeDate', value)

        },

        calendarChange(dates) {
            // 记录选择的开始日期，方便后面根据开始日期限定结束日期
            let hasSelectDate = dates !== null && dates.length > 0
            this.startDate = hasSelectDate ? dates[0] : null
        },

    },

};
</script>

