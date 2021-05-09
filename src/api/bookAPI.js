import baseAPI from '@/api/baseAPI.js'

class bookAPI extends baseAPI {
    constructor() { super('books') }

    /**
     * Lấy dữ liệu sách khi vào trang home
     * Mặc định lấy ra 5 loại sách ngẫu nhiên khác nhau
     */
    getHomeBooks() {

    }
}

export default new bookAPI();