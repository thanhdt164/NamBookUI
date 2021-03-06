import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'
class storageAPI extends baseAPI {
    constructor() { super('storages') }

    getAmountInstorage(param, callback) {
        return http.post(`${this.name}/amount-in-storage`, param)
            .then(response => {
                if (response) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

}

export default new storageAPI();