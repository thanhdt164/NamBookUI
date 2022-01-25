import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'
import Vue from 'vue'

class authenticateAPI extends baseAPI {
    constructor() { super('authenticates') }

    authenticate(callback, userName, password) {
        return http.post(`${this.name}/Authenticate`, { userName: userName, password: password })
            .then(response => {
                callback ? callback(response.data) : true;
                if (response.status === 200 && 'token' in response.body) {
                    this.$session.start()
                    this.$session.set('jwt', response.body.token)
                    Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
                        // this.$router.push('/panel/search')
                }
            })
            .catch(e => console.log('err', e));
    }


}

export default new authenticateAPI();