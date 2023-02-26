<template>
    <el-row justify="start" :gutter="10" style="width: 80%;">

        <el-col :span="3">
            <QuoteType />
        </el-col>

        <el-col :span="6">
            <DatePicker />
        </el-col>

        <el-col :span="6">
            <IntervalPicker />
        </el-col>


    </el-row>


    <div style="padding-bottom: 20px;"></div>
    <div>
        <div id="OpTargetDerivativeVol" ref="OpTargetDerivativeVol" style="width:90%; height:700% ;float:left"></div>
    </div>
</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
import IntervalPicker from '@/components/Utils/IntervalPicker.vue';
import { get_data } from '@/request/index.js';
var echarts = require("echarts");

export default {
    name: 'OpTargetDerivativeVol',
    components: { DatePicker, QuoteType, IntervalPicker },//, QuoteType
    data() {
        return {
            data: '',
            ontime: false,
        };
    },
    watch: {
        '$store.state.QuoteType': function () {
            const datetime = [
                new Date().getTime() - 3 * 8.64e7,
                new Date().getTime() + 1 * 8.64e7,
            ]
            this.fresh(datetime)
        },

        '$store.state.Interval': function () {
            const datetime = [
                new Date().getTime() - 3 * 8.64e7,
                new Date().getTime() + 1 * 8.64e7,
            ]
            this.fresh(datetime)
        },

        '$store.state.Date': function () {
            const datetime = [
                new Date(this.$store.state.Date[0]).getTime(),
                new Date(this.$store.state.Date[1]).getTime()]
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
                    text: 'optargetderivativevol',
                    subtext: 'Demo 数据',
                    x: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left: "right",
                    top: 'center',
                    align: 'left',
                    selected: {
                        "targetcode": true,

                        "1d_volatility_120_120_20": false,
                        "1d_volatility_120_120_80": false,
                        "1d_volatility_120_120_max": false,
                        "1d_volatility_120_120_mean": false,
                        "1d_volatility_120_120_min": false,
                        "1d_volatility_120_now": false,

                        "1d_volatility_20_120_20": false,
                        "1d_volatility_20_120_80": false,
                        "1d_volatility_20_120_max": false,
                        "1d_volatility_20_120_mean": false,
                        "1d_volatility_20_120_min": false,
                        "1d_volatility_20_now": true,

                        "1d_volatility_40_120_20": false,
                        "1d_volatility_40_120_80": false,
                        "1d_volatility_40_120_max": false,
                        "1d_volatility_40_120_mean": false,
                        "1d_volatility_40_120_min": false,
                        "1d_volatility_40_now": false,

                        "1d_volatility_60_120_20": false,
                        "1d_volatility_60_120_80": false,
                        "1d_volatility_60_120_max": false,
                        "1d_volatility_60_120_mean": false,
                        "1d_volatility_60_120_min": false,
                        "1d_volatility_60_now": false,


                        "1h_volatility_120_120_20": false,
                        "1h_volatility_120_120_80": false,
                        "1h_volatility_120_120_max": false,
                        "1h_volatility_120_120_mean": false,
                        "1h_volatility_120_120_min": false,
                        "1h_volatility_120_now": false,

                        "1h_volatility_20_120_20": false,
                        "1h_volatility_20_120_80": false,
                        "1h_volatility_20_120_max": false,
                        "1h_volatility_20_120_mean": false,
                        "1h_volatility_20_120_min": false,
                        "1h_volatility_20_now": true,

                        "1h_volatility_40_120_20": false,
                        "1h_volatility_40_120_80": false,
                        "1h_volatility_40_120_max": false,
                        "1h_volatility_40_120_mean": false,
                        "1h_volatility_40_120_min": false,
                        "1h_volatility_40_now": false,

                        "1h_volatility_60_120_20": false,
                        "1h_volatility_60_120_80": false,
                        "1h_volatility_60_120_max": false,
                        "1h_volatility_60_120_mean": false,
                        "1h_volatility_60_120_min": false,
                        "1h_volatility_60_now": false,


                        "2h_volatility_120_120_20": false,
                        "2h_volatility_120_120_80": false,
                        "2h_volatility_120_120_max": false,
                        "2h_volatility_120_120_mean": false,
                        "2h_volatility_120_120_min": false,
                        "2h_volatility_120_now": false,

                        "2h_volatility_20_120_20": false,
                        "2h_volatility_20_120_80": false,
                        "2h_volatility_20_120_max": false,
                        "2h_volatility_20_120_mean": false,
                        "2h_volatility_20_120_min": false,
                        "2h_volatility_20_now": true,

                        "2h_volatility_40_120_20": false,
                        "2h_volatility_40_120_80": false,
                        "2h_volatility_40_120_max": false,
                        "2h_volatility_40_120_mean": false,
                        "2h_volatility_40_120_min": false,
                        "2h_volatility_40_now": false,

                        "2h_volatility_60_120_20": false,
                        "2h_volatility_60_120_80": false,
                        "2h_volatility_60_120_max": false,
                        "2h_volatility_60_120_mean": false,
                        "2h_volatility_60_120_min": false,
                        "2h_volatility_60_now": false,


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
                        name: "1d_volatility_120_120_20",
                        type: "line",
                        data: data[2],
                    },
                    {
                        name: "1d_volatility_120_120_80",
                        type: "line",
                        data: data[3],
                    },

                    {
                        name: "1d_volatility_120_120_max",
                        type: "line",
                        data: data[4],

                    },
                    {
                        name: "1d_volatility_120_120_mean",
                        type: "line",
                        data: data[5],

                    },
                    {
                        name: "1d_volatility_120_120_min",
                        type: "line",
                        data: data[6],
                    },
                    {
                        name: "1d_volatility_120_now",
                        type: "line",
                        data: data[7],
                    },

                    {
                        name: "1d_volatility_20_120_20",
                        type: "line",
                        data: data[8],
                    },
                    {
                        name: "1d_volatility_20_120_80",
                        type: "line",
                        data: data[9],
                    },

                    {
                        name: "1d_volatility_20_120_max",
                        type: "line",
                        data: data[10],

                    },
                    {
                        name: "1d_volatility_20_120_mean",
                        type: "line",
                        data: data[11],

                    },
                    {
                        name: "1d_volatility_20_120_min",
                        type: "line",
                        data: data[12],
                    },
                    {
                        name: "1d_volatility_20_now",
                        type: "line",
                        data: data[13],
                    },
                    {
                        name: "1d_volatility_40_120_20",
                        type: "line",
                        data: data[14],
                    },
                    {
                        name: "1d_volatility_40_120_80",
                        type: "line",
                        data: data[15],
                    },

                    {
                        name: "1d_volatility_40_120_max",
                        type: "line",
                        data: data[16],

                    },
                    {
                        name: "1d_volatility_40_120_mean",
                        type: "line",
                        data: data[17],

                    },
                    {
                        name: "1d_volatility_40_120_min",
                        type: "line",
                        data: data[18],
                    },
                    {
                        name: "1d_volatility_40_now",
                        type: "line",
                        data: data[19],
                    },

                    {
                        name: "1d_volatility_60_120_20",
                        type: "line",
                        data: data[20],
                    },
                    {
                        name: "1d_volatility_60_120_80",
                        type: "line",
                        data: data[21],
                    },
                    {
                        name: "1d_volatility_60_120_max",
                        type: "line",
                        data: data[22],

                    },
                    {
                        name: "1d_volatility_60_120_mean",
                        type: "line",
                        data: data[23],

                    },
                    {
                        name: "1d_volatility_60_120_min",
                        type: "line",
                        data: data[24],
                    },
                    {
                        name: "1d_volatility_60_now",
                        type: "line",
                        data: data[25],
                    },

                    /////////////////////////////////////


                    // {
                    //     name: "1h_volatility_120_120_20",
                    //     type: "line",
                    //     data: data[26],
                    // },
                    // {
                    //     name: "1h_volatility_120_120_80",
                    //     type: "line",
                    //     data: data[27],
                    // },

                    // {
                    //     name: "1h_volatility_120_120_max",
                    //     type: "line",
                    //     data: data[28],

                    // },
                    // {
                    //     name: "1h_volatility_120_120_mean",
                    //     type: "line",
                    //     data: data[29],

                    // },
                    // {
                    //     name: "1h_volatility_120_120_min",
                    //     type: "line",
                    //     data: data[30],
                    // },
                    // {
                    //     name: "1h_volatility_120_now",
                    //     type: "line",
                    //     data: data[31],
                    // },

                    // {
                    //     name: "1h_volatility_20_120_20",
                    //     type: "line",
                    //     data: data[32],
                    // },
                    // {
                    //     name: "1h_volatility_20_120_80",
                    //     type: "line",
                    //     data: data[33],
                    // },

                    // {
                    //     name: "1h_volatility_20_120_max",
                    //     type: "line",
                    //     data: data[34],

                    // },
                    // {
                    //     name: "1h_volatility_20_120_mean",
                    //     type: "line",
                    //     data: data[35],

                    // },
                    // {
                    //     name: "1h_volatility_20_120_min",
                    //     type: "line",
                    //     data: data[36],
                    // },
                    // {
                    //     name: "1h_volatility_20_now",
                    //     type: "line",
                    //     data: data[37],
                    // },
                    // {
                    //     name: "1h_volatility_40_120_20",
                    //     type: "line",
                    //     data: data[38],
                    // },
                    // {
                    //     name: "1h_volatility_40_120_80",
                    //     type: "line",
                    //     data: data[39],
                    // },

                    // {
                    //     name: "1h_volatility_40_120_max",
                    //     type: "line",
                    //     data: data[40],

                    // },
                    // {
                    //     name: "1h_volatility_40_120_mean",
                    //     type: "line",
                    //     data: data[41],

                    // },
                    // {
                    //     name: "1h_volatility_40_120_min",
                    //     type: "line",
                    //     data: data[42],
                    // },
                    // {
                    //     name: "1h_volatility_40_now",
                    //     type: "line",
                    //     data: data[43],
                    // },

                    // {
                    //     name: "1h_volatility_60_120_20",
                    //     type: "line",
                    //     data: data[44],
                    // },
                    // {
                    //     name: "1h_volatility_60_120_80",
                    //     type: "line",
                    //     data: data[45],
                    // },
                    // {
                    //     name: "1h_volatility_60_120_max",
                    //     type: "line",
                    //     data: data[46],

                    // },
                    // {
                    //     name: "1h_volatility_60_120_mean",
                    //     type: "line",
                    //     data: data[47],

                    // },
                    // {
                    //     name: "1h_volatility_60_120_min",
                    //     type: "line",
                    //     data: data[48],
                    // },
                    // {
                    //     name: "1h_volatility_60_now",
                    //     type: "line",
                    //     data: data[49],
                    // },

                    // ///////////////

                    // {
                    //     name: "2h_volatility_120_120_20",
                    //     type: "line",
                    //     data: data[50],
                    // },
                    // {
                    //     name: "2h_volatility_120_120_80",
                    //     type: "line",
                    //     data: data[51],
                    // },

                    // {
                    //     name: "2h_volatility_120_120_max",
                    //     type: "line",
                    //     data: data[52],

                    // },
                    // {
                    //     name: "2h_volatility_120_120_mean",
                    //     type: "line",
                    //     data: data[53],

                    // },
                    // {
                    //     name: "2h_volatility_120_120_min",
                    //     type: "line",
                    //     data: data[54],
                    // },
                    // {
                    //     name: "2h_volatility_120_now",
                    //     type: "line",
                    //     data: data[55],
                    // },

                    // {
                    //     name: "2h_volatility_20_120_20",
                    //     type: "line",
                    //     data: data[56],
                    // },
                    // {
                    //     name: "2h_volatility_20_120_80",
                    //     type: "line",
                    //     data: data[57],
                    // },

                    // {
                    //     name: "2h_volatility_20_120_max",
                    //     type: "line",
                    //     data: data[58],

                    // },
                    // {
                    //     name: "2h_volatility_20_120_mean",
                    //     type: "line",
                    //     data: data[59],

                    // },
                    // {
                    //     name: "2h_volatility_20_120_min",
                    //     type: "line",
                    //     data: data[60],
                    // },
                    // {
                    //     name: "2h_volatility_20_now",
                    //     type: "line",
                    //     data: data[61],
                    // },
                    // {
                    //     name: "2h_volatility_40_120_20",
                    //     type: "line",
                    //     data: data[62],
                    // },
                    // {
                    //     name: "2h_volatility_40_120_80",
                    //     type: "line",
                    //     data: data[63],
                    // },

                    // {
                    //     name: "2h_volatility_40_120_max",
                    //     type: "line",
                    //     data: data[64],

                    // },
                    // {
                    //     name: "2h_volatility_40_120_mean",
                    //     type: "line",
                    //     data: data[65],

                    // },
                    // {
                    //     name: "2h_volatility_40_120_min",
                    //     type: "line",
                    //     data: data[66],
                    // },
                    // {
                    //     name: "2h_volatility_40_now",
                    //     type: "line",
                    //     data: data[67],
                    // },

                    // {
                    //     name: "2h_volatility_60_120_20",
                    //     type: "line",
                    //     data: data[68],
                    // },
                    // {
                    //     name: "2h_volatility_60_120_80",
                    //     type: "line",
                    //     data: data[69],
                    // },
                    // {
                    //     name: "2h_volatility_60_120_max",
                    //     type: "line",
                    //     data: data[70],

                    // },
                    // {
                    //     name: "2h_volatility_60_120_mean",
                    //     type: "line",
                    //     data: data[71],

                    // },
                    // {
                    //     name: "2h_volatility_60_120_min",
                    //     type: "line",
                    //     data: data[72],
                    // },
                    // {
                    //     name: "2h_volatility_60_now",
                    //     type: "line",
                    //     data: data[73],
                    // },


                ]
            };
            // 进行初始化

            this.chartLeft = echarts.init(this.$refs.OpTargetDerivativeVol);
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
            //10004405.XSHG
            //console.log({ "time": [data[0], data[1]], "name": "optargetderivativevol", "targetcode": "", "opcode": this.$store.state.Contract, "front": "1" })
            get_data({ "time": [data[0], data[1]], "name": this.$store.state.Interval, "targetcode": this.$store.state.QuoteType, "opcode": "", "front": "1" })
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
                            { data: this.data[11], },
                            { data: this.data[12], },
                            { data: this.data[13], },
                            { data: this.data[14], },
                            { data: this.data[15], },
                            { data: this.data[16], },
                            { data: this.data[17], },
                            { data: this.data[18], },
                            { data: this.data[19], },
                            { data: this.data[20], },
                            { data: this.data[21], },
                            { data: this.data[22], },
                            { data: this.data[23], },
                            { data: this.data[24], },
                            { data: this.data[25], },

                            // { data: this.data[26], },
                            // { data: this.data[27], },
                            // { data: this.data[28], },
                            // { data: this.data[29], },
                            // { data: this.data[30], },
                            // { data: this.data[31], },
                            // { data: this.data[32], },
                            // { data: this.data[33], },
                            // { data: this.data[34], },
                            // { data: this.data[35], },
                            // { data: this.data[36], },
                            // { data: this.data[37], },
                            // { data: this.data[38], },
                            // { data: this.data[39], },
                            // { data: this.data[40], },
                            // { data: this.data[41], },
                            // { data: this.data[42], },
                            // { data: this.data[43], },
                            // { data: this.data[44], },
                            // { data: this.data[45], },
                            // { data: this.data[46], },
                            // { data: this.data[47], },
                            // { data: this.data[48], },
                            // { data: this.data[49], },
                            // { data: this.data[50], },
                            // { data: this.data[51], },
                            // { data: this.data[52], },
                            // { data: this.data[53], },
                            // { data: this.data[54], },
                            // { data: this.data[55], },
                            // { data: this.data[56], },
                            // { data: this.data[57], },
                            // { data: this.data[58], },
                            // { data: this.data[59], },
                            // { data: this.data[60], },
                            // { data: this.data[61], },
                            // { data: this.data[62], },
                            // { data: this.data[63], },
                            // { data: this.data[64], },
                            // { data: this.data[65], },
                            // { data: this.data[66], },
                            // { data: this.data[67], },
                            // { data: this.data[68], },
                            // { data: this.data[69], },
                            // { data: this.data[70], },
                            // { data: this.data[71], },
                            // { data: this.data[72], },
                            // { data: this.data[73], },


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
            const start = startTime || new Date().getTime() - 5 * 8.64e7
            //console.log({ "time": [start, stop], "name": "optargetderivativevol", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
            get_data({ "time": [start, stop], "name": this.$store.state.Interval, "targetcode": this.$store.state.QuoteType, "opcode": "", "front": "1" })
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
        // start_timer(interval = 2000) {
        //     this.timer = setInterval(() => {
        //         if (this.ontime) { this.freshLeft() }

        //     }, interval)
        // },


    },
    mounted() {
        this.InitialDataGraph()
        //this.start_timer()


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