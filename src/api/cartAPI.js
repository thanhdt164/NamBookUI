import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class cartAPI extends baseAPI {
    constructor() { super('carts') }

    getCartInfo(userId, callback) {
        return http.post(`${this.name}/cart-info`, userId)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
    updateCart(cartModel, callback) {
        return http.put(`${this.name}`, cartModel)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new cartAPI();