/* eslint-disable */

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */

export function isvalidPhone(str) {
  // const reg = /^1[3|4|5|7|8][9][0-9]\d{8}$/
  const reg = /^.{11,}$/;
  return reg.test(str)
}
export function isPassword(str) {
  const reg = /^.{6,}$/;
  return reg.test(str)
}


export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}



/**
 * 判断字符是否为空
 * @param str {string} - 字符串
 */
export function isEmpty(str) {
  if (str == null || str == '' || typeof (str) === 'undefined') {
    return true
  } else {
    return false
  }
}


/**
 * 日期格式化
 * dateFormater(t, 'YYYY-MM-DD HH:mm') ==> 2019-06-26 18:30
 * dateFormater(t, 'YYYYMMDD') ==> 20190626
 */
export function dateFormater(t, formater = 'YYYY-MM-DD HH:mm:ss:hm',) {
  const date = t ? new Date(t) : new Date()
  const Y = date.getFullYear() + ''
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const hm = date.getMilliseconds()
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
    .replace(/hm/g, hm)
}

/**
 * 格式化时间转为时间戳
 * dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 */
export function dateStrForma(str, from, to) {
  // '20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
  str += ''
  let Y = ''
  if (~(Y = from.indexOf('YYYY'))) {
    Y = str.substr(Y, 4)
    to = to.replace(/YYYY|yyyy/g, Y)
  } else if (~(Y = from.indexOf('YY'))) {
    Y = str.substr(Y, 2)
    to = to.replace(/YY|yy/g, Y)
  }

  let k, i
  ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
    i = from.indexOf(s + s)
    k = ~i ? str.substr(i, 2) : ''
    to = to.replace(s + s, k)
  })
  return to
}

/**
 * 时间加减
 * @param date - 时间格式支持yyyy-MM-dd HH:mm:ss | yyyy/MM/dd HH:mm:ss
 * @param type - 类型：h-小时加减 m-分钟加减 s-秒加减 mi-毫秒加减
 * @param number - 加减的数值，负数表示减
 * @return dateCalc - 加减后的时间，格式yyyy-MM-dd HH:mm:ss
 */

export function computedDate(date, type, number, fm) {
  var timestamp1 = Date.parse(new Date(date))
  if (isNaN(timestamp1)) { // 兼容IE,safari...
    date = date.replace(/-/ig, '/')
    timestamp1 = Date.parse(new Date(date))
  }
  var timestamp2
  switch (type) {
    case 'h':
      timestamp2 = timestamp1 + number * 60000 * 60
      break
    case 'm':
      timestamp2 = timestamp1 + number * 60000
      break
    case 's':
      timestamp2 = timestamp1 + number * 1000
      break
    case 'mi':
      timestamp2 = timestamp1 + number
      break
  }
  var date = new Date(timestamp2)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return Y + M + D + h + m + s
}


/* 
elemen ui默认日期格式处理
defaultDate(Wed Jan 01 2020 00:00:00 GMT+0800 (中国标准时间)) => 2020-01-01 00:00:00
*/
export function defaultDate(str) {
  //默认返回yyyy-MM-dd HH-mm-ss
  var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
  var d = new Date(str);
  var year = d.getFullYear();
  var month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  if (hasTime) {
    return (
      [year, month, day].join("-") + " " + [hour, minute, second].join(":")
    );
  } else {
    return [year, month, day].join("-");
  }
}


/**
 * 10位时间戳转换
 * formatDate(1577977200) ==> 2019-06-26
 */
export function formatDate(value) {
  //10位时间戳转换
  let date = new Date(parseInt(value) * 1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d;
}


//13位时间戳转换方法    date:时间戳数字
export function timeFormat(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD;
}

//时间处理函数 得到小时分钟
export function dateConverter(index, date) {
  var time = {};
  var f = date.split(" ", 2); //过滤空格
  if (f[0].search("/") != -1) {
    //判断是否包含-
    var d = (f[0] ? f[0] : "").split("/", 3); //过滤-
  } else {
    var d = (f[0] ? f[0] : "").split("-", 3); //过滤-
  }
  time.year = parseInt(d[0]); //转换成整数形式的原因是 过滤掉 月份和时分秒的首位补零的情况
  time.month = parseInt(d[1]);
  time.day = parseInt(d[2]);
  var t = (f[1] ? f[1] : "").split(":", 3); //过滤:
  time.hour = t[0];
  time.minute = t[1];
  time.second = t[2];
  if (index == 1) {
    return time.hour + ":" + time.minute;
  } else if (index == 2) {
    return time.year + "-" + time.month + "-" + time.day;
  } else if (index == 3) {
    return time.month + "月" + time.day + "日";
  } else if (index == 4) {
    return time.year + "-" + time.month + "-" + time.day + " " + time.hour + ":" + time.minute;
  }
}


export function daysInterval(interval = 3) {
  let today = new Date(new Date().toLocaleDateString()).getTime();
  let a = today - 8.64e7 * 3 * interval
  let b = today + 8.64e7
  return [defaultDate(a), defaultDate(b)]
}

