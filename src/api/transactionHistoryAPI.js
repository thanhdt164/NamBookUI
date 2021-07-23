import baseAPI from '@/api/baseAPI.js'

class transactionHistoryAPI extends baseAPI {
    constructor() { super('transactionHistorys') }
}

export default new transactionHistoryAPI();