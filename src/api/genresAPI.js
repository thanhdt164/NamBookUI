import baseAPI from '@/api/baseAPI.js'

class genresAPI extends baseAPI {
    constructor() { super('genress') }
}

export default new genresAPI();