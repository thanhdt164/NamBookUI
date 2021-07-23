import baseAPI from '@/api/baseAPI.js'

class publisherAPI extends baseAPI {
    constructor() { super('publishers') }
}

export default new publisherAPI();