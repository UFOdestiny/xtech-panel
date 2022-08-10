<template>

    <!-- 日期选择器 -->
    <el-date-picker v-model="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="daterange" range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :disabledDate="disabledDate" @change="dateChange"
        :shortcuts="shortcuts" @calendar-change="calendarChange"></el-date-picker>

</template>   

<script>
import emitter from "@/utils/bus.js"
import { defaultDate } from '@/utils/index'
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


                    // onClick(picker) {
                    //     const end = new Date(new Date().setHours(0, 0, 0, 0));
                    //     const start = new Date(new Date().setHours(0, 0, 0, 0));
                    //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    //     picker.$emit("pick", [start, end]);
                    // },
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
            date: [defaultDate(new Date().getTime() - 8.64e7 * 7), defaultDate(new Date())],
            //下拉框
        };
    },
    methods: {
        disabledDate(time) {
            return (
                time.getTime() > Date.now() ||
                time.getTime() < +new Date("2010-01-01")
            );
        },

        dateChange(value) {
            //console.log(value)
            emitter.emit('DateChange', {DateChange: value})

        },

        calendarChange(dates) {
            // 记录选择的开始日期，方便后面根据开始日期限定结束日期
            let hasSelectDate = dates !== null && dates.length > 0
            this.startDate = hasSelectDate ? dates[0] : null
        },

    },

};
</script>

