import baseAPI from '@/api/baseAPI.js'

class ordersAPI extends baseAPI {
    constructor() { super('orders') }
}

export default new ordersAPI();