const client = require('../src/config/redisClient')

const cachingQueryHandler = async (key, callback) => {
    const cachedValue = await client.get(key);

    if (!cachedValue) {
        const data = await callback()
        await client.set(key, JSON.stringify(data), { EX: 3600 });
        return data
    }

    return JSON.parse(cachedValue)
}

const cachingMutationHandler = async (key) => {
    return client.del(key);
}

module.exports = {
    cachingQueryHandler,
    cachingMutationHandler
}