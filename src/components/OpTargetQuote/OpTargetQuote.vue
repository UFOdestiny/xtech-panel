<template>
    <el-row justify="start" :gutter="10" style="width: 80%;">

        <el-col :span="3">
            <QuoteType />
        </el-col>

        <el-col :span="6">
            <DatePicker />
        </el-col>

        <el-col :span="3">
            <SelectRightGraph />
        </el-col>

        <el-col :span="3">
            <SelectRightGraph />
        </el-col>

    </el-row>


    <div style="padding-bottom: 20px;"></div>
    <div>
        <div id="OpTargetQuote" ref="OpTargetQuote" style="width:60%; height:600% ;float:left"></div>
    </div>
</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
import { get_data } from '@/request/index.js';
var echarts = require("echarts");

export default {
    name: 'OpTargetQuote',
    components: {DatePicker, QuoteType, },
    data() {
        return {
            data: '',
            ontime: false,
        };
    },
    watch: {
        // '$store.state.RightGraphType': function () {
        //     this.chartRight.dispose()
        //     if (this.$store.state.RightGraphType == "当天波动率曲面图") {
        //         this.drawRight()
        //     }
        //     else if (this.$store.state.RightGraphType == "成交量/持仓量增量分布图") {
        //         this.drawRight2()
        //     }
        // },

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
                    text: 'optargetquote',
                    subtext: 'Demo 数据',
                    x: 'center'
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: 'bottom',
                    selected: {
                        "targetcode": true,
                        "pct": true,
                        "price": true,
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                grid: [
                    {
                        left: "10%",
                        right: "10%",
                        top: "10%",
                        height: "80%"
                    },
                    {
                        left: "10%",
                        right: "10%",
                        top: "90%",
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
                        minInterval: 8.64e7/2
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
                        position: "right"
                    },
                    {
                        gridIndex: 1,
                        splitNumber: 3,
                        //axisLine: {  },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: true },
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
                        y: "90%",
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
                        name: "code",
                        type: "line",
                        data: data[1],
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
                        name: "pct",
                        type: "line",
                        data: data[2],
                        //smooth: true,
                        // lineStyle: {
                        //     opacity: 0.5
                        // }
                    },
                    {
                        name: "price",
                        type: "line",
                        data: data[3],
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

            this.chartLeft = echarts.init(this.$refs.OpTargetQuote);
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
            if (!data) {
                var d = [parseInt(this.data[this.data.length - 1]) + 8.64e7]
                for (var i = 0; i < 11; i++) {
                    d.push(Math.random() * 100)
                }
                this.data.push(d)
                var data0 = this.unpack_data(this.data)
                this.chartLeft.setOption({
                    series: [
                        { data: data0.values2, },
                        { data: data0.values3, },
                    ]
                })
            }
            else {

                get_data({ "time": [data[0], data[1]], "name": "optargetquote", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
                    .then(response => {
                        this.data = response.data
                        this.chartLeft.setOption({
                            xAxis: [{ data: this.data[0] }],

                            series: [
                                { data: this.data[1], },
                                { data: this.data[2], },
                                { data: this.data[3], },

                            ]
                        })
                    });


            }


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
            //console.log({ "time": [start, stop], "name": "optargetquote", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
            get_data({ "time": [start, stop], "name": "optargetquote", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
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