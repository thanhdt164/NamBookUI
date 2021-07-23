import baseAPI from '@/api/baseAPI.js'

class detailOrdersAPI extends baseAPI {
    constructor() { super('detailOrders') }
}

export default new detailOrdersAPI();