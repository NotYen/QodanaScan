const collection = 'testing-result'

module.exports.create = (data) => {
    data['created_at'] = new Date()
    return mongoDB.collection(collection).insertOne(data)
}