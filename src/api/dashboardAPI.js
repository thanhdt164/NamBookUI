import baseAPI from '@/api/baseAPI.js'
import { http } from '@/api/http.js'

class dashboardAPI extends baseAPI {
    constructor() { super('dashboards') }

    getTopBookSold(callback, fromTime, toTime, top) {
        return http.post(`${this.name}/getTopBookSold`, { fromTime: fromTime, toTime: toTime, top: top })
            .then(response => {
                if (response) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    getBookImport(callback, fromTime, toTime) {
        return http.post(`${this.name}/getBookImport`, { fromTime: fromTime, toTime: toTime })
            .then(response => {
                if (response) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    getSpending(callback, fromTime, toTime, reportType) {
        return http.post(`${this.name}/getSpending`, { fromTime: fromTime, toTime: toTime, reportType: reportType })
            .then(response => {
                if (response) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }

    getRevenue(callback, fromTime, toTime, reportType) {
        return http.post(`${this.name}/getRevenue`, { fromTime: fromTime, toTime: toTime, reportType: reportType })
            .then(response => {
                if (response) {
                    callback ? callback(response.data) : true;
                }
            })
            .catch(e => console.log(e));
    }
}

export default new dashboardAPI();