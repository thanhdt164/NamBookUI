import Comment from '@/models/Comment.js'
class Book {

    init() {
        return {
            book_id: null,
            book_nm: null,
            avatar: null,
            price: null,
            sale: null,
            real_price: null,
            comment_obj: new Comment(),
        }
    }
}
export default new Book();