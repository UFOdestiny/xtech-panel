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
        <div id="NotionalPrincipalL" ref="NotionalPrincipalL" style="width:60%; height:600% ;float:left"></div>
        <div id="NotionalPrincipalR" ref="NotionalPrincipalR" style="width:40%; height:600%;float:right"></div>
    </div>
</template>

<script>
import SelectRightGraph from '@/components/NotionalPrincipal/SelectRightGraph.vue';
import DatePicker from '@/components/Utils/DatePicker.vue';
import QuoteType from '@/components/Utils/QuoteType.vue';
import { get_NotionalPrincipal_all } from '@/request/index.js';
var echarts = require("echarts");

export default {
    name: 'NotionalPrincipal',
    components: { SelectRightGraph, DatePicker, QuoteType,},
    data() {
        return {
            data: '',
            ontime: false,
        };
    },
    watch: {
        '$store.state.RightGraphType': function () {
            this.chartRight.dispose()
            if (this.$store.state.RightGraphType == "当天波动率曲面图") {
                this.drawRight()
            }
            else if (this.$store.state.RightGraphType == "成交量/持仓量增量分布图") {
                this.drawRight2()
            }
        },

        '$store.state.Date': function () {
            const datetime = [
                new Date(this.$store.state.Date[0]).getTime(),
                new Date(this.$store.state.Date[1]).getTime()]
            this.freshLeft(datetime)
        },

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

        unpack_data(data, leng = data.length) {
            var dataset = [[], [], [], [], [], [], [], [], [], [], []]
            for (var i = 0; i < leng; i++) {
                for (var j = 0; j < 11; j++) {
                    dataset[j].push([data[i][0], data[i][j + 1]])
                }
            }
            return dataset
        },
        /** 
         * @description: draw the left graph
         * @param data : packed(original) data
         * @return : void
        */
        drawLeft(data) {
            var data0 = this.unpack_data(data)
            var option = {
                title: {
                    text: '名义本金',
                    subtext: 'Demo 虚构数据',
                    x: 'center'
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: 'bottom',
                    selected: {
                        "成交(总)": true,
                        "持仓(本金)": true,
                        "持仓(认购总)": true,
                        "持仓(认沽总)": true,
                        "标的": true,

                        "成交(当月)": false,
                        "成交(下月)": false,
                        "成交(认购总)": false,
                        "成交(认沽总)": false,
                        "持仓(当月)": false,
                        "持仓(下月)": false,
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
                        type: "time",
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
                        minInterval: 7200
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
                // dataZoom: [
                //     {
                //         type: "inside",
                //         start: 80,
                //         end: 100
                //     },
                //     {
                //         show: true,
                //         type: "slider",
                //         y: "90%",
                //         start: 50,
                //         end: 100
                //     },
                //     {
                //         show: false,
                //         xAxisIndex: [0, 1],
                //         type: "slider",
                //         start: 20,
                //         end: 100
                //     }
                // ],
                series: [
                    {
                        name: "成交(总)",
                        type: "line",
                        data: data0[0],
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
                        name: "持仓(本金)",
                        type: "line",
                        data: data0[1],
                        //smooth: true,
                        // lineStyle: {
                        //     opacity: 0.5
                        // }
                    },
                    {
                        name: "持仓(认购总)",
                        type: "line",
                        data: data0[2],
                    },

                    {
                        name: "持仓(认沽总)",
                        type: "line",
                        data: data0[3],
                    },

                    {
                        name: "标的",
                        type: "line",
                        data: data0[4],
                    },

                    {
                        name: "成交(当月)",
                        type: "line",
                        data: data0[5],
                    },

                    {
                        name: "成交(下月)",
                        type: "line",
                        data: data0[6],
                    },
                    {
                        name: "成交(认购总)",
                        type: "line",
                        data: data0[7],
                    },
                    {
                        name: "成交(认沽总)",
                        type: "line",
                        data: data0[8],
                    }, {
                        name: "持仓(当月)",
                        type: "line",
                        data: data0[9],
                    },
                    {
                        name: "持仓(下月)",
                        type: "line",
                        data: data0[10],
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

            this.chartLeft = echarts.init(this.$refs.NotionalPrincipalL);
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
        drawRight() {
            // var data0
            // if (data) {
            //     data0 = this.process_data(data)
            // }
            // else {
            //     data0 = { values2: [], values3: [] }
            // }
            var option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                title: {
                    text: '当天波动率',
                    subtext: 'Demo 虚构数据',
                    x: 'center'
                },

                legend: {
                    orient: 'horizontal',
                    x: 'left',
                    y: 'top',
                    data: ['猜想', '预期', '实际']
                },
                grid: {
                    top: '10%',
                    left: '3%',
                    right: '10%',
                    height: '85%',
                    containLabel: true
                },
                xAxis: {
                    name: '执行价',
                    type: 'category',
                    data: []// [1, 7, 6, 5, 13, 8, 4, 2, 15, 9, 11, 20,]
                },
                yAxis: {
                    scale: true,
                    name: '波动率',
                    type: 'value',
                    axisLine: {
                        show: true,

                    }
                },

                series: [ // 多组折线图数据
                    {
                        name: '猜想',
                        data: [],//[454, 226, 891, 978, 901, 581, 400, 543, 272, 955, 1294, 1581],
                        type: 'line'
                    },

                    {
                        name: '预期',
                        data: [],//[2455, 2534, 2360, 2301, 2861, 2181, 1944, 2197, 1745, 1810, 2283, 2298],
                        type: 'line',
                    },


                    {
                        name: '实际',
                        data: [],// [1107, 1352, 1740, 1968, 1647, 1570, 1343, 1757, 2547, 2762, 3170, 3665],
                        type: 'line'
                    }
                ],
                color: ['#3366CC', '#FFCC99', '#99CC33']
            }
            // 进行初始化
            this.chartRight = echarts.init(this.$refs.NotionalPrincipalR);
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
            this.chartRight = echarts.init(this.$refs.NotionalPrincipalR);
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
                get_NotionalPrincipal_all({ "start": data[0], "stop": data[1], "type": 1, })
                    .then(response => {
                        console.log(response)
                        var data0 = this.unpack_data(response.data)
                        this.chartLeft.setOption({
                            series: [
                                { data: data0[0], },
                                { data: data0[1], },
                                { data: data0[2], },
                                { data: data0[3], },
                                { data: data0[4], },
                                { data: data0[5], },
                                { data: data0[6], },
                                { data: data0[7], },
                                { data: data0[8], },
                                { data: data0[9], },
                                { data: data0[10], },
                                { data: data0[11], },
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
            //const start = point
            //const stop = point
            // get_NotionalPrincipal_all({ "start": start, "stop": stop + 10000, "type": 2, })
            //     .then(response => {
            //         var new_data = response.data
            //         //console.log(new_data)
            //         var data0 = this.process_data(new_data)
            //         this.chartRight.setOption({
            //             series: [
            //                 {
            //                     data: data0.values2,
            //                 },
            //                 {
            //                     data: data0.values3,
            //                 },]
            //         }
            //         )
            //     });
            if (point) {
                var dataset = [[], [], [], []]

                var start = Math.floor(Math.random() * 10)
                for (var i = 0; i < 10; i++) {
                    dataset[0].push(start + i / 10)
                }

                for (var i2 = 0; i2 < 3; i2++) {
                    for (var j = 0; j < 10; j++) {
                        dataset[i2 + 1].push(Math.random())
                    }
                }
                console.log(dataset)

                this.chartRight.setOption({
                    xAxis: { data: dataset[0] },
                    series: [
                        {
                            data: dataset[1],
                        },
                        {
                            data: dataset[2],
                        },
                        {
                            data: dataset[3],
                        },]
                }
                )
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

            const stop = stopTime || new Date().getTime() + 8.64e7
            const start = startTime || new Date().getTime() - 30 * 8.64e7

            get_NotionalPrincipal_all({ "start": start, "stop": stop, "type": 1, })
                .then(response => {
                    this.data = response.data
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
        // start_timer(interval = 2000) {
        //     this.timer = setInterval(() => {
        //         if (this.ontime) { this.freshLeft() }

        //     }, interval)
        // },

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