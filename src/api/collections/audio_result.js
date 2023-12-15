const { result } = require("lodash")

const collection = 'audio_result'

module.exports = {
  getOne: async (query) => {
    return await mongoDB.collection(collection).findOne(query)
  },
  getAll: async () => {
    return await mongoDB.collection(collection).find().toArray()
},
  update: async (query, data) => {
    let key = data.question_name
    try {
      return await mongoDB.collection(collection).updateOne(query, { $set: {
        ['result.' + key]: {
            result: data.result,
            url: data.url,
            updated_at: new Date()
          }
      }}, { upsert: true})
    } catch (error) {
      console.log(error)
    }
  },
}