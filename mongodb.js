// CRUD operations

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionURL);

const databaseName = 'task-manager'

async function main() {
    try {
        await client.connect()
        console.log('Connected successfully!')

        const db = client.db(databaseName)
        const collection = db.collection('users')

        // const insertion = await collection.insertMany([{
        //     name: 'buwu',
        //     age: 21
        // }, {
        //     name: 'kaan',
        //     age: 22
        // }]).then(function (error, result) {
        //     if (error) {
        //         console.log('insertion failed')
        //     }
        // })

        const collectionTask = db.collection('tasks')
        // const insertTask = await collectionTask.insertMany([{
        //     name: 'do homework',
        //     status: false
        // }, {
        //     name: 'clean desk',
        //     status: 'true'
        // }, {
        //     name: 'write code',
        //     status: true
        // }
        // ]).then(function (error, result) {
        //     if (error) {
        //         console.log('task insertion was failed')
        //     }
        // })
        db.collection.find({ name: 'kaan' }, { age: 22 }, (error, result) => {
            if (error) {
                console.log('unable to fetch')
            }
            console.log(result.ObjectId)
        })
    }
    catch (error) {
        console.log('error occured')
    }
    finally {
        await client.close()
    }

    // const res = await collection.findOne({ _id: insertion.insertedId })
    // console.log(res)
    // setTimeout(() => { client.close() }, 1500)
    return 'done.'
}


main();