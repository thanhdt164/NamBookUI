import baseAPI from '@/api/baseAPI.js'

class storageAPI extends baseAPI {
    constructor() { super('storages') }
}

export default new storageAPI();