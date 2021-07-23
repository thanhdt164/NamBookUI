import baseAPI from '@/api/baseAPI.js'

class payloadAPI extends baseAPI {
    constructor() { super('payloads') }
}

export default new payloadAPI();