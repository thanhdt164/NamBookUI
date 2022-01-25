import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class commentAPI extends baseAPI {
    constructor() { super('comments') }

    updateComment(param, callback) {
        return http.put(`${this.name}`, param)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new commentAPI();