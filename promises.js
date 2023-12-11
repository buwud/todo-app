const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('things went wrong') //accepts 1 callback
    }, 2000)
})

doWorkPromise.then((result) => { //it only works when everything is okay
    console.log('Success ', result)
}).catch((error) => {
    console.log('Error ', error)
})

