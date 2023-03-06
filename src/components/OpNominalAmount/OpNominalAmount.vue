<template>
    <el-row justify="start" :gutter="10" style="width: 80%;">

        <el-col :span="3">
            <QuoteType />
        </el-col>

        <el-col :span="6">
            <DatePicker />
        </el-col>


    </el-row>


    <div style="padding-bottom: 20px;"></div>
    <div>
        <div id="OpNominalAmount" ref="OpNominalAmount" style="width:90%; height:700% ;float:left"></div>
    </div>
</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
import { get_data } from '@/request/index.js';
var echarts = require("echarts");

export default {
    name: 'OpNominalAmount',
    components: { DatePicker, QuoteType, },
    data() {
        return {
            data: '',
            ontime: false,
        };
    },
    watch: {

        '$store.state.QuoteType': function () {
            const datetime = [this.$store.state.Date[0], this.$store.state.Date[1]]
            this.fresh(datetime)
        },

        '$store.state.Date': function () {
            const datetime = [this.$store.state.Date[0], this.$store.state.Date[1]]
            this.fresh(datetime)
        },

    },
    methods: {
        /** 
         * @description: draw the left graph
         * @param data : packed(original) data
         * @return : void
        */
        draw(data) {
            var option = {
                title: {
                    text: 'opnominalamount',
                    subtext: 'Demo 数据',
                    x: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left:"right",
                    top: 'center',
                    align: 'left',
                    selected: {
                        "targetcode": true,
                        "money": true,
                        "money_c": true,
                        "money_p": true,


                        "money_00": false,
                        "money_01": false,
                        "money_c_00": false,
                        "money_c_01": false,
                        "money_p_00": false,
                        "money_p_01": false,

                    },
                },
                tooltip: {
                    trigger: "axis",

                    axisPointer: {
                        type: "cross"
                    },
                    textStyle: {

                        align: 'left'
                    },
                    // formatter: function (params) {
                    //     let str = '';
                    //     params.forEach((item, idx) => {
                    //         if (typeof item.data == 'string') {

                    //             str += `${item.marker}${item.seriesName}: ${item.data}`
                    //         }
                    //         else {
                    //             console.log(item.data)
                    //             str += `${item.marker}${item.seriesName}: ${item.data.toFixed(4)}`
                    //         }
                    //         switch (idx) {
                    //             case 0:
                    //                 str += '';
                    //                 break;
                    //             case 1:
                    //                 str += '';
                    //                 break;
                    //             case 2:
                    //                 str += '';
                    //                 break;
                    //             default:
                    //                 str += ''
                    //         }
                    //         str += idx === params.length - 1 ? '' : '<br/>'
                    //     })
                    //     return str
                    // }

                },
                grid: [
                {
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        height: "70%"
                    },
                    {
                        left: "10%",
                        right: "10%",
                        bottom: "10%",
                        height: "10%"
                    }
                ],
                xAxis: [
                    {
                        data: data[0],
                        //type: "time",
                        scale: true,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "black"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitNumber: 20,
                        minInterval: 8.64e7
                    },
                    {
                        type: "time",
                        gridIndex: 1,
                        axisLabel: { show: false },
                        show: false
                    }
                ],
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: "red"
                            }
                        },
                        position: "right",

                    },
                    {
                        gridIndex: 1,
                        splitNumber: 3,
                        //axisLine: {  },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: {
                            show: true,

                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "red"
                            }
                        },
                        position: "left"
                    }

                ],

                dataZoom: [
                    {
                        type: "inside",
                        start: 80,
                        end: 100
                    },
                    {
                        show: true,
                        type: "slider",
                        y: "85%",
                        start: 50,
                        end: 100
                    },
                    {
                        show: false,
                        xAxisIndex: [0, 1],
                        type: "slider",
                        start: 20,
                        end: 100
                    }
                ],
                series: [

                    {
                        name: "targetcode",
                        type: "line",
                        data: data[1],
                    },

                    {
                        name: "money",
                        type: "line",
                        data: data[2],
                        // markPoint: {
                        //     data: [
                        //         {
                        //             type: 'max', name: '最大值'
                        //         },
                        //         {
                        //             type: 'min', name: '最小值'
                        //         }
                        //     ]
                        // },
                        // markLine: {
                        //     silent: true,
                        //     label: {
                        //         position: "start", //标线位置，start，middle，end
                        //     },
                        //     data: [
                        //         {
                        //             type: "average", //'min', 'max', 'average' 最小、最大、平均
                        //             label: {
                        //                 formatter: "Mean",
                        //                 fontSize: "10",
                        //             },
                        //         },

                        //     ],
                        // }
                    },
                    {
                        name: "money_00",
                        type: "line",
                        data: data[3],
                        //smooth: true,
                        // lineStyle: {
                        //     opacity: 0.5
                        // }
                    },
                    {
                        name: "money_01",
                        type: "line",
                        data: data[4],
                    },
                    {
                        name: "money_c",
                        type: "line",
                        data: data[5],
                    },
                    {
                        name: "money_c_00",
                        type: "line",
                        data: data[6],
                    },
                    {
                        name: "money_c_01",
                        type: "line",
                        data: data[7],
                    },
                    {
                        name: "money_p",
                        type: "line",
                        data: data[8],
                    },
                    {
                        name: "money_p_00",
                        type: "line",
                        data: data[9],
                    },
                    {
                        name: "money_p_01",
                        type: "line",
                        data: data[10],
                    },



                    // },
                    // {
                    //     name: "MACD",
                    //     type: "bar",
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1,
                    //     data: data0.macds,
                    //     itemStyle: {

                    //         color: function (params) {
                    //             var colorList;
                    //             if (params.data >= 0) {
                    //                 colorList = "#ef232a";
                    //             } else {
                    //                 colorList = "#14b143";
                    //             }
                    //             return colorList;
                    //         }

                    //     }

                ]
            };
            // 进行初始化

            this.chartLeft = echarts.init(this.$refs.OpNominalAmount);
            this.chartLeft.setOption(option);
            window.addEventListener("resize", () => {
                // 执行echarts自带的resize方法，即可做到让echarts图表自适应
                this.chartLeft.resize();
            });

        },

        /** 
         * @description: draw the right graph 2
         * @param data : packed(original) data
         * @return : void
        */
        fresh(data) {
            //console.log({ "time": [data[0], data[1]], "name": "opnominalamount", "targetcode": this.$store.state.QuoteType, "opcode": "", "front": "1" })
            get_data({ "time": [data[0], data[1]], "name": "opnominalamount", "targetcode": this.$store.state.QuoteType, "opcode": "", "front": "1" })
                .then(response => {
                    this.data = response.data
                    this.chartLeft.setOption({
                        xAxis: [{ data: this.data[0] }],

                        series: [
                            { data: this.data[1], },
                            { data: this.data[2], },
                            { data: this.data[3], },
                            { data: this.data[4], },
                            { data: this.data[5], },
                            { data: this.data[6], },
                            { data: this.data[7], },
                            { data: this.data[8], },
                            { data: this.data[9], },
                            { data: this.data[10], },

                        ]
                    })
                });
        },

        /** 
         * @description: debounce
         * @param func : function
         * @param delay : delay time
         * @return : void
        */
        debounce(func, delay) {
            let timer
            return (e) => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    func(e)
                }, delay)
            }
        },

        /** 
         * @description: initialize data and graph
         * @param start : start time
         * @param stop : stop time
         * @return : void
        */
        InitialDataGraph(startTime, stopTime) {

            const stop = stopTime || new Date().getTime() + 1 * 8.64e7
            const start = startTime || new Date().getTime() - 8 * 8.64e7
            //console.log({ "time": [start, stop], "name": "opnominalamount", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
            get_data({ "time": [start, stop], "name": "opnominalamount", "targetcode": this.$store.state.QuoteType, "opcode": "", "front": "1" })
                .then(response => {
                    this.data = response.data
                    //console.log(this.data)
                    this.draw(this.data);

                    // this.chartLeft.on('updateAxisPointer',
                    //     this.debounce((event) => {
                    //         var xAxisInfo = event.axesInfo[0];
                    //         if (xAxisInfo) {
                    //             this.freshRight(xAxisInfo.value)
                    //         }
                    //     }, 300)
                    // );
                });
        },

        /** 
         * @description: start timer
         * @return : void
        */
        start_timer(interval = 1000 * 30) {
            this.timer = setInterval(() => {
                if (this.ontime) {
                    const datetime = [this.$store.state.Date[0], this.$store.state.Date[1]]
                    this.fresh(datetime)
                }
            }, interval)
        },


    },
    mounted() {
        this.InitialDataGraph()
        this.start_timer()


    },
    /**
     * @description : 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
        容易导致内存泄漏和额外CPU或GPU占用哦
     */
    beforeUnmount() {
        window.removeEventListener("resize", () => {
            this.chartLeft.resize();
            this.chartRight.resize();
        });

        clearInterval(this.timer)
    },
}
</script>
<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>