import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class userAPI extends baseAPI {
    constructor() { super('users') }

    getUserInfo(accountName, callback) {
        return http.post(`${this.name}/user-info`, { accountName: accountName })
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new userAPI();