<template>
  <div>
    <!-- <WidgetsDropdown/> -->
 <!-- Khoản thu vào khoản chi -->
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="4">
            <h4 id="traffic" class="card-title mb-0">Khoản chi và Khoản thu</h4>
            <div class="small text-muted">Thống kê theo {{reportType=="Month"?'Tháng':'Năm'}} ({{formatDate(new Date(), 1)}})</div>
          </CCol>
          <CCol sm="8" class="d-none d-md-block">
            <CButton 
              @click="getDataRevenueAndSpending"
              color="primary" class="float-right">
              <CIcon name="cil-arrow-right"/>
            </CButton>
            <CButtonGroup class="float-right mr-3">
              <CButton
                color="outline-secondary"
                v-for="(value, key) in ['Month', 'Year']"
                :key="key"
                class="mx-0"
                :pressed="value === reportType ? true : false"
                @click="changeReportType(value)"
              >
                {{value}}
              </CButton>
            </CButtonGroup>
            <CInput
              v-if="reportType == 'Month'"
              label="Tháng"
              horizontal
              type="number"
              v-model="monthReport" 
              class="float-right mr-3"
              @update:value="changeMonthReport"
            />
          </CCol>
        </CRow>
        <MainChartExample 
          style="height:300px;margin-top:40px;"
          :dataRevenue="dataRevenue"
          :dataSpending="dataSpending"
          :label="label"
        ></MainChartExample>
      </CCardBody>
      <CCardFooter>
        <CRow class="text-center">
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Tổng nhập</div>
            <strong>{{formatCurrency(superTotalSpending)}} ({{Math.round(100*superTotalSpending/(superTotalSpending+superTotalRevenue))}}%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="info"
              :value="Math.round(100*superTotalSpending/(superTotalSpending+superTotalRevenue))"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Tổng bán</div>
            <strong>{{formatCurrency(superTotalRevenue)}} ({{Math.round(100*superTotalRevenue/(superTotalSpending+superTotalRevenue))}}%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="success"
              :value="Math.round(100*superTotalRevenue/(superTotalSpending+superTotalRevenue))"
            />
          </CCol>
          
        </CRow>
      </CCardFooter>
    </CCard>
<!-- TopBookSold -->
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol md="8">
            <h3>Top sách bán chạy</h3>
          </CCol>
          <CCol md="3">
            <CRow>
              <CCol  >
                <CInput
                  label="Từ ngày"
                  type="date"
                  horizontal
                  v-model="paramTopBookSold.fromTime"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol >
                <CInput
                  label="Đến ngày"
                  type="date"
                  horizontal
                  v-model="paramTopBookSold.toTime"
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol col="1" class="mb-3 mb-xl-0 ">
            <CButton block color="primary" @click="getDataTopBookSold">
              Gửi đi
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <!-- Row 1 -->
        <CRow v-for="(book, id) in dataTopBookSold" :key="id" v-model="dataTopBookSold">
          <CCol sm="12" lg="12" v-if="dataBookImportX[id]">
            <CWidgetProgress
              :header="book.book_nm"
              :text="book.author_nm"
              :footer="book.publisher_nm"
              color="gradient-info"
            >
              <CRow>
                <CCol sm="2" lg="2" class="avatar">
                  <img :src="book.avatar" alt="">
                </CCol>
                <CCol sm="10" lg="10">
                  <CRow>
                    <CCol col="12" sm="12" lg="6">
                      <CWidgetDropdown
                        :header="`${book.view} Lượt xem - ${JSON.parse(book.comment_json).length} Bình luận`"
                        text="."
                        color="gradient-success"
                        inverse
                      />
                      <CWidgetProgress
                        :header="`Tổng giá bán : ${formatCurrency(book.total_revenue)} (${(book.total_revenue==0?0: (dataBookImportX[id].total_spending==0?100: (book.total_revenue/dataBookImportX[id].total_spending*100))).toFixed(2)}%)`"
                        :text="`Tổng giá nhập : ${formatCurrency(dataBookImportX[id].total_spending)}`"
                        color="gradient-warning"
                        inverse
                        :value="book.total_revenue/dataBookImportX[id].total_spending*100"
                      />
                    </CCol>
                    <CCol col="12" sm="12" lg="6">
                      <CWidgetProgressIcon
                        :header="`Số lượng bán : ${book.sold_count} (${(book.sold_count == 0? 0 : (dataBookImportX[id].import_count == 0 ?100:(book.sold_count/dataBookImportX[id].import_count*100))).toFixed(2)}%)`"
                        :text="`Số lượng nhập : ${dataBookImportX[id].import_count}`"
                        color="gradient-primary"
                        inverse
                        :value="book.sold_count/dataBookImportX[id].import_count*100"
                      >
                        <CIcon name="cil-chartPie" height="36"/>
                      </CWidgetProgressIcon>
                    </CCol>
                  
                    <CCol sm="12" lg="6">
                    </CCol>
                    <CCol col="12" sm="12" lg="6">
                    </CCol>
                  </CRow> 
                </CCol>
              </CRow>
            </CWidgetProgress>
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>  

  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
// import WidgetsDropdown from './widgets/WidgetsDropdown'
import dashboardAPI from '@/api/dashboardAPI.js'
import moment from 'moment'
// import WidgetsBrand from './widgets/WidgetsBrand'
// import { CChartLineSimple, CChartBarSimple } from '@/views/charts/index.js'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    // WidgetsDropdown,
    // WidgetsBrand,
    // CChartLineSimple,
    // CChartBarSimple
  },
  data () {
    return {
      dataTopBookSold : null,
      paramTopBookSold: {
        fromTime: '2021-08-01',
        toTime: '2021-08-31',
        top: 5
      },
      dataBookImport: null,
      dataBookImportX: [],
      paramBookImport: {
        fromTime: '2021-08-01',
        toTime: '2021-08-31'
      },
      reportType: 'Month',
      monthReport: 8,
      dataRevenue: [], 
      dataSpending: [],
      label: [],
      superTotalSpending: 0,
      superTotalRevenue: 0,

    }
  },
  created(){
    setTimeout(() => {
      this.getDataTopBookSold();
    }, 0);
    this.getDataRevenueAndSpending();
  },
  methods: {
    changeMonthReport(val){
      if(val>12){
        this.monthReport = 12;
      }else if(val<1){
        this.monthReport = 1;
      }
    },
    /**
     * Hàm format tiền tệ
     */
    formatCurrency(val){
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(val)
    },

    changeReportType(value){
      this.reportType = value;
      // this.getDataRevenueAndSpending();
    },
    getDataTopBookSold(){
      if (this.paramTopBookSold.fromTime <= this.paramTopBookSold.toTime){
        this.paramBookImport.fromTime = this.paramTopBookSold.fromTime;
        this.paramBookImport.toTime = this.paramTopBookSold.toTime;
        dashboardAPI.getTopBookSold((res)=>{this.dataTopBookSold =res},this.paramTopBookSold.fromTime, this.paramTopBookSold.toTime, this.paramTopBookSold.top);
        dashboardAPI.getBookImport((res)=>{this.dataBookImport = res; this.setDataBookImportX()},this.paramBookImport.fromTime, this.paramBookImport.toTime);
      }
    },
    /**
     * Hàm xử lý dữ liệu cho dataBookImportX
     * Created by: thanhdt - 22.05.2021
     */
    setDataBookImportX(){
      var me = this;
      let import_book_ids = me.dataBookImport.map(el => el.book_id);
      me.dataTopBookSold.forEach(el => {
        if(import_book_ids.includes(el.book_id)){
          me.dataBookImport.forEach(it => {
            if(it.book_id == el.book_id){
              me.dataBookImportX.push({import_price: it.import_price, import_count: it.import_count, total_spending: it.total_spending})
            }
          })
        }else{
          me.dataBookImportX.push({import_price: 0, import_count: 0, total_spending: 0})
        }
      })
    },
    getDataRevenueAndSpending(){
      if(this.reportType == 'Month'){
        this.getReportByMonth();
      }else if(this.reportType == 'Year'){
        this.getReportByYear();
      }
    },
    /**
     * Hàm lấy giá trị fromTime, toTime của tháng hiện tại
     * Created by: thanhdt - 22.05.2021
     */
    getReportByMonth(){
      var now = new Date()
      var year = now.getFullYear();
      var month = this.monthReport;
      var date = 1;
      var d = new Date(`${year}-${month}-${date}`);
      let startOfMonth = moment(d).startOf('month').toDate();
      let endOfMonth = moment(d).endOf('month').toDate();
      let monthText = new Intl.DateTimeFormat('en', { month: 'short' }).format(endOfMonth);
      /* custom Lable */
      this.label = []
      let i
      for (i = 1; i<=endOfMonth.getDate(); i++){
        this.label.push(`${monthText} ${i}`)
      }
      /* Gọi api lấy dữ liệu */
      let fromDate = this.formatDate(startOfMonth, 3);
      let toDate = this.formatDate(endOfMonth, 3);
      dashboardAPI.getSpending((res) => {this.dataSpending = res}, fromDate, toDate, 1);
      dashboardAPI.getRevenue((res) => {this.dataRevenue = res}, fromDate, toDate, 1);
      /* Convert lại dữ liệu trước khi truyền lên chart */
      setTimeout(() => {
        this.convertDataSpendindAndRevenue();
      }, 250); 
    },
    /**
     * Hàm lấy giá trị fromTime, toTime của tháng hiện tại
     * Created by: thanhdt - 22.05.2021
     */
    getReportByYear(){
      var now = new Date()
      var year = now.getFullYear();
      var month = this.monthReport;
      var date = 1;
      var d = new Date(`${year}-${month}-${date}`);
      let startOfYear = moment(d).startOf('year').toDate();
      let endOfYear = moment(d).endOf('year').toDate();
      // let yearText = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(endOfYear);
      /* custom Lable */
      this.label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      /* Gọi api lấy dữ liệu */
      let fromDate = this.formatDate(startOfYear, 3);
      let toDate = this.formatDate(endOfYear, 3);
      dashboardAPI.getSpending((res) => {this.dataSpending = res}, fromDate, toDate, 2);
      dashboardAPI.getRevenue((res) => {this.dataRevenue = res}, fromDate, toDate, 2);
      /* Convert lại dữ liệu trước khi truyền lên chart */
      setTimeout(() => {
        this.convertDataSpendindAndRevenue();
      }, 200); 
    },
    /**
     * Hàm xử lý dữ liệu trước khi truyền lên chart
     */
    convertDataSpendindAndRevenue(){
      var me = this;
      if(this.reportType == 'Month'){
        let length = moment().endOf('month').toDate().getDate();
        let tempSpend = this.dataSpending.map(el => el.Day);
        let tempRevenue = this.dataRevenue.map(el => el.Day);

        let i
        for ( i = 1; i<=length; i++){
          if (!tempSpend.includes(i)){
            this.dataSpending.push({Day: i, TotalSpending: 0})
          }
          if (!tempRevenue.includes(i)){
            this.dataRevenue.push({Day: i, TotalRealRevenue: 0, TotalRevenue: 0})
          }
        }
        this.dataSpending.sort((a, b) => {return a.Day - b.Day})
        this.dataRevenue.sort((a, b) => {return a.Day - b.Day})
      }else{
        let tempSpend = this.dataSpending.map(el => el.Month);
        let tempRevenue = this.dataRevenue.map(el => el.Month);

        this.label.forEach(el => {
          if (!tempSpend.includes(el)){
            this.dataSpending.push({Month: el, TotalSpending: 0})
          }
          if (!tempRevenue.includes(el)){
            this.dataRevenue.push({Month: el, TotalRealRevenue: 0, TotalRevenue: 0})
          }
        })
        this.dataSpending.sort((a, b) => {return me.label.indexOf(a.Month) - me.label.indexOf(b.Month)})
        this.dataRevenue.sort((a, b) => {return me.label.indexOf(a.Month) - me.label.indexOf(b.Month)})
        console.log(this.dataSpending,  this.dataRevenue)
      }

      /* Gán giá trị cho superTotalSpending vs superTotalRevenue */
      me.superTotalSpending = parseInt(me.dataSpending.reduce(function(prev, cur) {
        return prev + cur.TotalSpending;
      }, 0).toFixed(0));
      me.superTotalRevenue = parseInt(me.dataRevenue.reduce(function(prev, cur) {
        return prev + cur.TotalRealRevenue;
      }, 0).toFixed(0));
    },

    /**
     * 
     */
    formatDate(date, type){
            date = new Date(date)
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
            if (type == 1) {
                return `${mo} ${ye}`
            }
            if (type == 2) {
                return `${mo} ${da}, ${ye}`
            }
            if(type == 3){
              return `${ye}-${mo}-${da}`
            }
    },
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>

<style scoped>
  .avatar{
    display: flex;
    justify-content: space-around;
  }
  
</style>
