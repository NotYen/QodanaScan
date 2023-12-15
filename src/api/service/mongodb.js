const mongodb = require('mongodb')
// const MongodbConfig = require('../config/mongodb')
const async = require('async')
const _ = require('lodash')

/**
 * 建立 Index 設定
 */
const indexes = {
	'testing-result': [
		{ key: { created_at: -1 }},
	],
}

const start = (callback) => {
	const MongodbConfig = {
		HOST: process.env.MONGODB_HOST,
		DATABASE: process.env.MONGODB_DATABASE,
		USER: process.env.MONGODB_USER,
		PASSWORD: process.env.MONGODB_PASSWORD,
	}
	async.parallel({
		init: (cb) => {
			mongodb.MongoClient.connect(`${MongodbConfig.HOST}/${MongodbConfig.DATABASE}?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
				auth: {
					username: MongodbConfig.USER,
					password: MongodbConfig.PASSWORD,
				}
			}, function(err, client) {
				if(err) return cb(err);
				const db = client.db(MongodbConfig.DATABASE);
				global.mongoDB = db;

				log.success('MongoDB connected.')

				// Create indexes
				_.forEach(indexes, (value, key) => {
					value = _.map(value, (v) => {
						return _.merge(v, { background: true })
					})
					create_index(key, value)
				})

				return cb(err, client);
			});
		}
	}, callback)
}

const create_index = (collection, options) => {
	mongoDB.collection(collection).createIndexes(
		options
	, (err) => {
		if(err){
			log.error(err)
			return log.error(`Create ${collection} collection index fail.`);
		}
		log.success(`Create ${collection} collection index success.`);
	});
}

module.exports = start
