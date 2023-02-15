const {InfluxDB, flux} = require('@influxdata/influxdb-client-browser')
const url = 'http://193.174.28.232:5102';
const token = 'qE83Rq0yQPGek6teUu745OkrOKW7jmInL5QrMq48-VIaXOagxPP3B8fvATAZsi7avaOlOSuMI0lRAKY9h9hnxg=='
const org = 'TeamEE'
const bucket = 'fdre818'
const client = new InfluxDB({url: url, token: token})
const o = [] 
const speed = []

//Execute a Flux query---------

const queryApi = client.getQueryApi(org)
const query = flux`from(bucket: "fdre818") 
  |> range(start: 2022-04-20T10:00:00Z, stop: 2022-04-20T10:02:00Z)
  |> filter(fn: (r) => r._measurement == "86B20CC8")
  |> filter(fn: (r) => r._field == "Speed")
  |> aggregateWindow(every: 5s, fn: mean)
  |> map(fn: (r) => ({ r with _value: r._value * 3.6 }))
  |> limit(n: 10)`
queryApi.queryRows(query, {
    next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        speed.push(o._value)
    
    },
    error(error) {
        console.error(error)
        console.log('Finished ERROR')
    },
    complete() {
        console.log('Finished SUCCESS')
        store.state.suppliedInflux.speed =  speed;
    },
})

export {client}