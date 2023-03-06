<template>
    <el-row justify="start" :gutter="10" style="width: 80%;">

        <!-- <el-col :span="3">
            <QuoteType />
        </el-col> -->

        <el-col :span="6">
            <DatePicker />
        </el-col>
        <el-col :span="6">
            <ContractPicker />
        </el-col>


    </el-row>


    <div style="padding-bottom: 20px;"></div>
    <div>
        <div id="OpContractQuote" ref="OpContractQuote" style="width:90%; height:700% ;float:left"></div>
    </div>
</template>

<script>
import DatePicker from '@/components/Utils/DatePicker.vue';
import ContractPicker from '@/components/Utils/ContractPicker.vue';
//import QuoteType from '@/components/Utils/QuoteType.vue';
import { get_data } from '@/request/index.js';
var echarts = require("echarts");

export default {
    name: 'OpContractQuote',
    components: { DatePicker, ContractPicker },//, QuoteType
    data() {
        return {
            data: '',
            ontime: false,
        };
    },
    watch: {
        '$store.state.Contract': function () {
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
                    text: 'opcontractquote',
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
                        "opcode": true,
                        "type": true,

                        "a1_p": false,
                        "a1_v": false,
                        "b1_p": false,
                        "b1_v": false,
                        "delta": true,
                        "gamma": true,
                        "theta": true,
                        "vega": true,

                        "close": true,
                        "high": false,
                        "iv": true,
                        "money": false,
                        "low": false,
                        "open": false,

                        "pct": true,

                        "strike": false,
                        "timevalue": true,
                        "volume": false,
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
                        name: "opcode",
                        type: "line",
                        data: data[1],
                    },
                    {
                        name: "targetcode",
                        type: "line",
                        data: data[2],
                    },
                    {
                        name: "type",
                        type: "line",
                        data: data[3],
                    },

                    {
                        name: "a1_p",
                        type: "line",
                        data: data[4],

                    },
                    {
                        name: "a1_v",
                        type: "line",
                        data: data[5],

                    },
                    {
                        name: "b1_p",
                        type: "line",
                        data: data[6],
                    },
                    {
                        name: "b1_v",
                        type: "line",
                        data: data[7],
                    },
                    {
                        name: "close",
                        type: "line",
                        data: data[8],
                    },
                    {
                        name: "delta",
                        type: "line",
                        data: data[9],
                    },
                    {
                        name: "gamma",
                        type: "line",
                        data: data[10],
                    },
                    {
                        name: "high",
                        type: "line",
                        data: data[11],
                    },
                    {
                        name: "iv",
                        type: "line",
                        data: data[12],
                    }, {
                        name: "low",
                        type: "line",
                        data: data[13],
                    }, {
                        name: "money",
                        type: "line",
                        data: data[14],
                    }, {
                        name: "open",
                        type: "line",
                        data: data[15],
                    }, {
                        name: "pct",
                        type: "line",
                        data: data[16],
                    }, {
                        name: "strikeprice",
                        type: "line",
                        data: data[17],
                    }, {
                        name: "theta",
                        type: "line",
                        data: data[18],
                    }, {
                        name: "timevalue",
                        type: "line",
                        data: data[19],
                    }, {
                        name: "vega",
                        type: "line",
                        data: data[20],
                    }, {
                        name: "volume",
                        type: "line",
                        data: data[21],
                    }
                ]
            };
            // 进行初始化

            this.chartLeft = echarts.init(this.$refs.OpContractQuote);
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
            //console.log({ "time": [data[0], data[1]], "name": "opcontractquote", "targetcode": "", "opcode": this.$store.state.Contract, "front": "1" })
            get_data({ "time": [data[0], data[1]], "name": "opcontractquote", "targetcode": "", "opcode": this.$store.state.Contract, "front": "1" })
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
            const stop = stopTime || this.$store.state.Date[1]
            const start = startTime || this.$store.state.Date[0]
            //console.log({ "time": [start, stop], "name": "opcontractquote", "targetcode": "510050.XSHG", "opcode": "", "front": "1" })
            get_data({ "time": [start, stop], "name": "opcontractquote", "targetcode": "", "opcode": "10004405.XSHG", "front": "1" })
                .then(response => {
                    this.data = response.data
                    console.log(this.data)
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