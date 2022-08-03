export default {
  //日期设置 2017-01-01 到 今天的日期可选，其余选项置灰
  //截止日期 当前日期
  disabledDate (time) {
    return (
      time.getTime() > Date.now() ||
      time.getTime() < +new Date("2010-01-01")
    );
  },
  shortcuts: [
    {
      text: "最近一周",
      onClick (picker) {
        const end = new Date(new Date().setHours(0, 0, 0, 0));
        const start = new Date(new Date().setHours(0, 0, 0, 0));
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick (picker) {
        const end = new Date(new Date().setHours(0, 0, 0, 0));
        const start = new Date(new Date().setHours(0, 0, 0, 0));
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick (picker) {
        const end = new Date();
        const start = new Date(new Date().setHours(0, 0, 0, 0));
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: '最近六个月',
      onClick (picker) {
        const end = new Date(); 
        const start = new Date();
        start.setMonth(start.getMonth() - 6);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近一年',
      onClick (picker) {
        const end =new Date(); 
        const start =  new Date();
        start.setMonth(start.getMonth() - 12);
        picker.$emit('pick', [start, end]);
      }
    },
  ],
}


