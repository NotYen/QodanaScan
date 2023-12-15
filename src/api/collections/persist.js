const collection = 'persist'

module.exports = {
  getOne: async (query) => {
    return await mongoDB.collection(collection).findOne(query)
  },
  create: async (data) => {
    data['created_at'] = new Date()
    try {
      return await mongoDB.collection(collection).insertOne(data)
    } catch (error) {
      console.log(error)
    }
  },
  update: async (query, data) => {
    try {
      data['updated_at'] = new Date()
      return await mongoDB.collection(collection).updateOne(query, { $set: data })
    } catch (error) {
      console.log(error)
    }
  },
}
