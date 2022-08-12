<template>
    <SelectRightGraph />
    <div>
        <h1>名义本金</h1>
        <div id="KlineGraphL" ref="KlineGraphL" style="width:50%; height:500px;float:left"></div>
        <div id="KlineGraphR" ref="KlineGraphR" style="width:50%; height:500px;float:right"></div>
    </div>
</template>

<script>
import SelectRightGraph from '@/components/SelectRightGraph.vue';
import { getTestData } from '@/request/index.js';
import emitter from "@/utils/bus.js";
var echarts = require("echarts");

export default {
    name: 'KlineGraph',
    components: { SelectRightGraph, },
    data() {
        return {
            data: '',
            ontime: true,
        };
    },
    methods: {
        /** 
         * @description: unpack data
         * @param data : data
         * @param leng : length of results
         * @return : { values2 : [...], values3 : [...] }
        */
        process_data(data, leng = data.length) {
            var values2 = [];
            var values3 = [];
            for (var i = 0; i < leng; i++) {
                values2.push([data[i][0], data[i][1]])
                values3.push([data[i][0], data[i][2]])
            }
            return {
                values2: values2,
                values3: values3,
            };
        },

        /** 
         * @description: draw the left graph
         * @param data : packed(original) data
         * @return : void
        */
        drawLeft(data) {

            var data0 = this.process_data(data)
            var option = {
                legend: {
                    // Try 'horizontal'
                    orient: 'vertical',
                    right: 10,
                    top: 'center'
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
                        top: "0",
                        height: "75%"
                    },
                    {
                        left: "10%",
                        right: "10%",
                        top: "80%",
                        height: "10%"
                    }
                ],
                xAxis: [
                    {
                        type: "time",
                        //data: data0.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "red"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitNumber: 20
                    },
                    {
                        type: "time",
                        gridIndex: 1,
                        //data: data0.categoryData,
                        axisLabel: { show: false }
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
                        position: "right"
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
                        name: "成交名义本金",
                        type: "line",
                        data: data0.values2,
                        markPoint: {
                            data: [
                                {
                                    name: "XX标点"
                                }
                            ]
                        },
                        markLine: {
                            silent: true,
                            data: [
                                {
                                    yAxis: 2222
                                }
                            ]
                        }
                    },

                    {
                        name: "持仓名义本金",
                        type: "line",
                        data: data0.values3,//this.calculateMA(5, data0),
                        smooth: true,
                        lineStyle: {

                            opacity: 0.5

                        }
                    },
                    // {
                    //     name: "MA10",
                    //     type: "line",
                    //     data: this.calculateMA(10, data0),
                    //     smooth: true,
                    //     lineStyle: {

                    //         opacity: 0.5

                    //     }
                    // },
                    // {
                    //     name: "MA20",
                    //     type: "line",
                    //     data: this.calculateMA(20, data0),
                    //     smooth: true,
                    //     lineStyle: {

                    //         opacity: 0.5

                    //     }
                    // },
                    // {
                    //     name: "MA30",
                    //     type: "line",
                    //     data: this.calculateMA(30, data0),
                    //     smooth: true,
                    //     lineStyle: {

                    //         opacity: 0.5

                    //     }
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
                    // },
                    // {
                    //     name: "DIF",
                    //     type: "line",
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1,
                    //     data: data0.difs
                    // },
                    // {
                    //     name: "DEA",
                    //     type: "line",
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1,
                    //     data: data0.deas
                    // }
                ]
            };
            // 进行初始化

            this.chartLeft = echarts.init(this.$refs.KlineGraphL);
            this.chartLeft.setOption(option);
            window.addEventListener("resize", () => {
                // 执行echarts自带的resize方法，即可做到让echarts图表自适应
                this.chartLeft.resize();
            });

        },

        /** 
         * @description: draw the right graph
         * @param data : packed(original) data
         * @return : void
        */
        drawRight(data) {
            var data0
            if (data) {
                data0 = this.process_data(data)
            }
            else {
                data0 = { values2: [], values3: [] }
            }
            var option = {
                // legend: {
                //     // Try 'horizontal'
                //     orient: 'vertical',
                //     right: 10,
                //     top: 'center'
                // },
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
                        top: "0",
                        height: "75%"
                    },
                    {
                        left: "10%",
                        right: "10%",
                        top: "80%",
                        height: "10%"
                    }
                ],
                xAxis: [
                    {
                        type: "time",
                        name: "执行价",
                        //data: data0.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "red"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitNumber: 20
                    },
                    {
                        type: "time",
                        gridIndex: 1,
                        //data: data0.categoryData,
                        axisLabel: { show: false }
                    }
                ],
                yAxis: [
                    {
                        name: "波动率",
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
                        position: "right"
                    }
                ],
                dataZoom: [
                    {
                        type: "inside",
                        start: 50,
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
                        name: "执行价",
                        type: "line",
                        data: data0.values2,
                        markPoint: {
                            data: [
                                {
                                    name: "XX标点"
                                }
                            ]
                        },
                        markLine: {
                            silent: true,
                            data: [
                                {
                                    yAxis: 2222
                                }
                            ]
                        }
                    },

                    {
                        name: "波动率",
                        type: "line",
                        data: data0.values3,//this.calculateMA(5, data0),
                        smooth: true,
                        lineStyle: {

                            opacity: 0.5

                        }
                    },

                ]
            };
            // 进行初始化
            this.chartRight = echarts.init(this.$refs.KlineGraphR);
            this.chartRight.setOption(option);
            window.addEventListener("resize", () => {
                this.chartRight.resize();
            });

        },

        /** 
         * @description: draw the right graph 2
         * @param data : packed(original) data
         * @return : void
        */
        drawRight2(data) {
            var data0
            if (data) {
                data0 = this.process_data(data)
            }
            else {
                data0 = { values2: [], values3: [] }
            }
            var option = {
                // legend: {
                //     // Try 'horizontal'
                //     orient: 'vertical',
                //     right: 10,
                //     top: 'center'
                // },
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
                        top: "0",
                        height: "75%"
                    },
                    {
                        left: "10%",
                        right: "10%",
                        top: "80%",
                        height: "10%"
                    }
                ],
                xAxis: [
                    {
                        type: "time",
                        name: "成交量",
                        //data: data0.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "red"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        splitNumber: 20
                    },
                    {
                        type: "time",
                        gridIndex: 1,
                        //data: data0.categoryData,
                        axisLabel: { show: false }
                    }
                ],
                yAxis: [
                    {
                        name: "持仓量",
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
                        name: "持仓量",
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
                        position: "right"
                    }
                ],
                dataZoom: [
                    {
                        type: "inside",
                        start: 50,
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
                        name: "执行价",
                        type: "line",
                        data: data0.values2,
                        markPoint: {
                            data: [
                                {
                                    name: "XX标点"
                                }
                            ]
                        },
                        markLine: {
                            silent: true,
                            data: [
                                {
                                    yAxis: 2222
                                }
                            ]
                        }
                    },

                    {
                        name: "波动率",
                        type: "line",
                        data: data0.values3,//this.calculateMA(5, data0),
                        smooth: true,
                        lineStyle: {

                            opacity: 0.5

                        }
                    },

                ]
            };
            // 进行初始化
            this.chartRight = echarts.init(this.$refs.KlineGraphR);
            this.chartRight.setOption(option);
            window.addEventListener("resize", () => {
                this.chartRight.resize();
            });

        },

        /** 
         * @description: draw the right graph 2
         * @param data : packed(original) data
         * @return : void
        */
        freshLeft(data) {
            if (!data) {
                var d = [parseInt(this.data[this.data.length - 1]) + 1000, Math.random() * 100, Math.random() * 50]
                this.data.push(d)
                var data0 = this.process_data(this.data)

                this.chartLeft.setOption({
                    series: [
                        { data: data0.values2, },
                        { data: data0.values3, },
                    ]
                })
            }
            else {
                getTestData({ "start": data[0], "stop": data[1], "type": 1, })
                    .then(response => {
                        this.data = response.data
                        var data0 = this.process_data(this.data)

                        this.chartLeft.setOption({
                            series: [
                                { data: data0.values2, },
                                { data: data0.values3, },
                            ]
                        })
                    });


            }


        },

        /** 
         * @description: draw the right graph 2
         * @param data : packed(original) data
         * @return : void
        */
        freshRight(point) {
            const start = point
            const stop = point
            getTestData({ "start": start, "stop": stop + 10000, "type": 2, })
                .then(response => {
                    var new_data = response.data
                    //console.log(new_data)
                    var data0 = this.process_data(new_data)
                    this.chartRight.setOption({
                        series: [
                            {
                                data: data0.values2,
                            },
                            {
                                data: data0.values3,
                            },]
                    }
                    )
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

            const stop = stopTime || new Date().getTime() + 8.64e7
            const start = startTime || new Date().getTime() - 7 * 8.64e7

            getTestData({ "start": start, "stop": stop, "type": 1, })
                .then(response => {
                    this.data = response.data.slice(900, 1000)
                    this.drawLeft(this.data);
                    this.drawRight();

                    this.chartLeft.on('updateAxisPointer',
                        this.debounce((event) => {
                            var xAxisInfo = event.axesInfo[0];
                            if (xAxisInfo) {
                                this.freshRight(xAxisInfo.value)
                            }
                        }, 300)
                    );
                });
        },

        /** 
         * @description: start timer
         * @return : void
        */
        start_timer(interval = 2000) {
            this.timer = setInterval(() => {
                if (this.ontime) { this.freshLeft() }

            }, interval)
        },

        right(rawData) {
            var values2 = [];
            var values3 = [];


            for (var i = 0; i < 20; i++) {
                var randomint = Math.floor(Math.random() * this.data.length)
                values2.push([rawData[i][0], rawData[randomint][1]])
                values3.push([rawData[i][0], rawData[randomint][2]])

            }
            return {
                values2: values2,
                values3: values3,
            };
        },



    },
    mounted() {

        this.InitialDataGraph()

        this.start_timer()

        emitter.on('TimeTypeChange', data => {
            this.ontime = data.TimeType
        })

        emitter.on('DateChange', data => {
            this.freshLeft(data.DateChange)
        })

        emitter.on('RightGraphTypeChange', data => {
            this.chartRight.dispose()
            if (data.RightGraphType == "当天波动率曲面图") {
                this.drawRight(data)
            }
            else if (data.RightGraphType == "成交量/持仓量增量分布图") {
                this.drawRight2(data)
            }
        })

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

        emitter.off('TimeTypeChange')
        emitter.off('DateChange')
        emitter.off('RightGraphTypeChange')
        clearInterval(this.timer)
    },
}
</script>