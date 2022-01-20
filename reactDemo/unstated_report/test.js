function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}
function setData(data) {
    console.log('data:', data);
}


const funA = (funB) => {
    const execute = (() => {
        return funB().then(res => {
            setData(res)
        })
    })

    return { execute }
}

const { execute } = funA(async() => {
    console.log('111');
    await sleep(1000)
    console.log('333');
    return 22
})


execute()
// console.log('execute', execute());