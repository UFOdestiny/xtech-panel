<template>
    <el-date-picker v-model="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="daterange" range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :disabledDate="disabledDate" @change="dateChange"
        :shortcuts="shortcuts" @calendar-change="calendarChange"></el-date-picker>
</template>   

<script>
import { defaultDate } from '@/utils/index'
let shortcuts = [
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
]


export default {
    name: 'DatePicker',
    data() {
        return {
            shortcuts: shortcuts,
            startDate: null,
            date: [defaultDate(new Date().getTime() - 8.64e7 * 7), defaultDate(new Date())]
        };
    },
    methods: {
        disabledDate(time) {
            return (
                time.getTime() > Date.now() ||
                time.getTime() < +new Date("2017-01-01")
            );
        },
        // dateChange(dates) {
        //     this.date = dates
        //     if (dates === null || dates.length === 0) {
        //         this.startDate = null
        //     }
        // },
        dateChange(value) {
            let that = this
            this.customTimeShow = false
            let shortcuts = [
                {
                    text: '全部',
                    onClick() {
                        const start = new Date("2000-01-01")
                        const end = new Date(new Date(that.tradeDayDate))
                        return [start, end]
                    },
                },
                {
                    text: '最近三个月',
                    onClick() {
                        // const end = that.tradeDayDate
                        const end = new Date(new Date(that.tradeDayDate))
                        const start = new Date()
                        start.setTime(end.getTime() - 3600 * 1000 * 24 * 90)
                        return [start, end]
                    },
                },
                {
                    text: '最近半年',
                    onClick() {
                        const end = new Date(new Date(that.tradeDayDate))
                        const start = new Date()
                        start.setTime(end.getTime() - 3600 * 1000 * 24 * 180)
                        // start.setMonth(end.getMonth() - 6)
                        return [start, end]
                    },
                },
                {
                    text: '最近一年',
                    onClick() {
                        const end = new Date(new Date(that.tradeDayDate))
                        const start = new Date()
                        start.setTime(end.getTime() - 3600 * 1000 * 24 * 365)
                        // start.setMonth(end.getMonth() - 12)
                        return [start, end]
                    },
                },
            ]
            shortcuts.forEach((element) => {
                if (element.text == value) {
                    let time = element.onClick()
                    let arr = []
                    if (time.length !== 0) {
                        arr.push(defaultDate(time[0], false), defaultDate(time[1], false))
                    } else {
                        arr = []
                    }
                    console.log(arr)
                    //this.$emit('datePickerVal', arr)
                }
            })
        },

        calendarChange(dates) {
            // 记录选择的开始日期，方便后面根据开始日期限定结束日期
            let hasSelectDate = dates !== null && dates.length > 0
            this.startDate = hasSelectDate ? dates[0] : null
        },




    },

};
</script>