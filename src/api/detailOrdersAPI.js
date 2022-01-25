import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class detailOrdersAPI extends baseAPI {
    constructor() { super('detailOrders') }

    /**
     * Hàm lấy dữ liệu đầy đủ của sách theo bookId
     * Created by: thanhdt -12.05.2021
     * @param {*} param 
     * @param {*} callback 
     * @param {*} route 
     * @returns 
     */
    insertDetailOrders(param, callback, route = "detail-orders-i") {
        return http.post(`${this.name}/${route}`, param)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new detailOrdersAPI();