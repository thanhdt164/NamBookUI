import CommentJson from '@/models/CommentJson.js'
class Comment {

    init() {
        return {
            comment_id: null,
            comment_json: [
                new CommentJson(),
            ]
        }
    }
}
export default new Comment();