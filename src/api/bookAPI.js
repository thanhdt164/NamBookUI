import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class bookAPI extends baseAPI {
    constructor() { super('books') }

    /**
     * Lấy dữ liệu sách khi vào trang home
     * Mặc định lấy ra 5 loại sách ngẫu nhiên khác nhau
     * Created by: thanhdt - 09.05.2021
     */
    getHomeBooks(callback, route = 'homebooks') {
        return http.get(`${this.name}/${route}`)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm lấy dữ liệu xếp hạng sách
     * @param {*} callback 
     * @param {*} route 
     * @returns 
     */
    getTopChart(callback, route = 'top-chart') {
        return http.get(`${this.name}/${route}`)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm lấy dữ liệu sách mới cập nhật
     * @param {*} callback 
     * @param {*} route 
     * @returns 
     */
    getTopArrivals(callback, route = 'top-arrivals') {
        return http.get(`${this.name}/${route}`)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm lấy dữ liệu sách theo genresIds
     * Created by: thanhdt - 09.05.2021
     * @param {*} genresIds 
     * @param {*} callback 
     * @returns 
     */
    getBooksByGenresId(genresIds, callback) {
        return http.post(`${this.name}/similars`, genresIds)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm lấy dữ liệu đầy đủ của sách theo bookId
     * Created by: thanhdt -12.05.2021
     * @param {*} bookId 
     * @param {*} callback 
     * @param {*} route 
     * @returns 
     */
    getBookInfor(bookId, callback, route = "bookinfor") {
        return http.post(`${this.name}/${route}`, bookId)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm lấy dữ liệu sách theo genresId
     * Created by: thanhdt - 09.05.2021
     * @param {*} genresId
     * @param {*} callback 
     * @returns 
     */
    getBooksByGenresId2(genresId, callback) {
        return http.post(`${this.name}/bookbygenres`, genresId)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    /**
     * Hàm tìm kiếm
     * Created by: thanhdt - 09.05.2021
     * @param {*} param
     * @param {*} callback 
     * @returns 
     */
    search(param, callback) {
        return http.post(`${this.name}/search`, param)
            .then(response => {
                if (response && response.status == 200) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new bookAPI();