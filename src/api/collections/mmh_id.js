const collection = 'mmh_id'

module.exports = {
  getOne: (query) => {
    return mongoDB.collection(collection).findOne(query)
  }
}