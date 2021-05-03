import baseAPI from '@/api/baseAPI.js'

class bookAPI extends baseAPI {
    constructor() { super('books') }
}

export default new bookAPI();