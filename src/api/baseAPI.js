import { http } from '@/api/http.js'

export default class baseAPI {
    name = "";
    constructor(name) { this.name = name }

    /* Methods */
    getAll(callback) {
        http.get(`${this.name}`)
            .then(response => {
                if (response.status && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => { console.log(e) })
    }

    getById(id, callback) {
        return http.get(`${this.name}/${id}`)
            .then(response => {
                if (response.status && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => { console.log(e) })
    }

}