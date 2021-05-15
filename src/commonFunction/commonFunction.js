/* Các hàm dùng chung */




/**
 * Hàm format Ngày tháng
 * type (1): 'Apr 1996'
 * type (2): 'July 21, 2015'
 */
export const formatDate = (date, type) => {
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    if (type == 1) {
        return `${mo} ${ye}`
    }
    if (type == 2) {
        return `${mo} ${da}, ${ye}`
    }
}