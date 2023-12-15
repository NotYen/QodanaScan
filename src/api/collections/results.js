const collection = 'results'

module.exports = {
  getOne: async (query) => {
    return await mongoDB.collection(collection).findOne(query)
  },
  getAll: async () => {
      return await mongoDB.collection(collection).find().toArray()
  },
  create: async (data, results) => {
    data['created_at'] = new Date()
    data['results'] = results || {}
    return await mongoDB.collection(collection).insertOne(data)
  },
  addResult: async (query, result) => {
    result['created_at'] = new Date()
    const questionKey = `results.${result.question}`
    try {
      return await mongoDB.collection(collection).updateOne(query, {
        $set: {
          [questionKey]: {
            answer: result.answer,
            spend_time: result.spend_time,
            more: result.more,
            created_at: result.created_at
          }
        }
      })
    } catch (error) {
      return error
    }
  },
  addScore: async (query, score) => {
    try {
      return await mongoDB.collection(collection).updateOne(query, {
        $set: {
          score: score
        }
      })
    } catch (error) {
      return error
    }
  }
}
