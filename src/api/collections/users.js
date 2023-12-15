const collection = 'users'

module.exports = {
  getOne: (query) => {
    return mongoDB.collection(collection).findOne(query)
  },
  getAll: async () => {
    return await mongoDB.collection(collection).find().toArray()
},
  create: (data) => {
    data['created_at'] = new Date()
    data['cases'] = []
    return mongoDB.collection(collection).insertOne(data)
  },
  update: (query, data) => {
    return mongoDB.collection(collection).updateOne(query, data)
  },
  addCase: (query, data) => {
    data['created_at'] = new Date()
    data['case_id'] = new Date().getTime()
    try {
      mongoDB.collection(collection).updateOne(query, {
        $push: {
          cases: data
        }
      })
      return data
    } catch (error) {
      return error
    }
  }

}