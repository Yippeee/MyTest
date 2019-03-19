function machine(val) {
    let queues = []
    let wait, waitFirst
    return {
        execute() {
            let cb
            Promise.resolve(waitFirst).then(() => {
                console.log('start', val)
            }).then(() => {
                return Promise.resolve(wait)
            }).then(() => {
                while (cb = queues.shift()) {
                    cb()
                }
            })
        },
        do(doVal) {
            const run = () => {
                console.log(val, doVal)
            }
            queues.push(run)
            return this
        },
        wait(time) {
            wait = new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, time * 1000)
            })
            return this
        },
        waitFirst(time) {
            waitFirst = new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, time * 1000)
            })
            return this
        }
    }
}
// machine('ygy').execute()
// start ygy
// machine('ygy').do('eat').execute();
// start ygy
// ygy eat
// machine('ygy').wait(5).do('eat').execute();
// // start ygy
// // wait 5s（这里等待了5s）
// // ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat







