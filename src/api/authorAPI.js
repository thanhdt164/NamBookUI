import baseAPI from '@/api/baseAPI.js'

class authorAPI extends baseAPI {
    constructor() { super('authors') }
}

export default new authorAPI();