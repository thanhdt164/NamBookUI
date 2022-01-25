import { http } from '@/api/http.js'

export default class baseAPI {
    name = "";
    constructor(name) { this.name = name }

    /* Methods */
    /**
     * Hàm lấy toàn bộ dữ liệu
     * Created by: thanhdt - 01.05.2021
     * @param {*} callback 
     */
    getAll(callback) {
        return http.get(`${this.name}`)
            .then(response => {
                if (response.status && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => { console.log(e) })
    }

    Insert(data, callback) {
        return http.post(`${this.name}`, data)
            .then(response => {
                if (response.status && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => { console.log(e) })
    }

    Update(data, callback) {
        return http.put(`${this.name}`, data)
            .then(response => {
                if (response.status && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => { console.log(e) })
    }

    /**
     * Hàm lấy dữ liệu theo id
     * @param {*} id 
     * @param {*} callback 
     * @returns 
     */
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