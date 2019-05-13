function calc(count) {
    let circle = 0
    for (let i = 0; i < count; i++) {
        let x = Math.random()
        let y = Math.random()
        if(Math.sqrt(x * x + y * y) <= 1) circle++
    }
    console.log('PI:',circle / count * 4)
}

calc(10000000)
