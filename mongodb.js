// CRUD operations

const { MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionURL);

const databaseName = 'task-manager'

async function main() {
    await client.connect()
    console.log('Connected successfully!')

    const db = client.db(databaseName)
    const collection = db.collection('users')

    const insertion = await collection.insertOne({
        name: 'buwu',
        age: 21
    }, (error, result) => {
        if (error) {
            console.log('insertion failed')
        }
    })
    const res = await collection.findOne({ _id: insertion.insertedId })
    console.log(res)

    return 'done.'
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());