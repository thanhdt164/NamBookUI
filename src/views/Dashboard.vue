<template>
  <div>
    <WidgetsDropdown/>
 <!-- Revenue and Spending -->
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Revenue and Spending (Khoản thu và chi)</h4>
            <div class="small text-muted">This {{reportType=="Month"?'Month':'Year'}} ({{new Date()}})</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-right">
              <CIcon name="cil-cloud-download"/>
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
            <div class="text-muted">ToTal Spending</div>
            <strong>{{superTotalSpending}} Vnd ({{Math.round(100*superTotalSpending/(superTotalSpending+superTotalRevenue))}}%)</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="info"
              :value="Math.round(100*superTotalSpending/(superTotalSpending+superTotalRevenue))"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Total Real Revenue</div>
            <strong>{{superTotalRevenue}} Vnd ({{Math.round(100*superTotalRevenue/(superTotalSpending+superTotalRevenue))}}%)</strong>
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
            <h3>Top books sold</h3>
          </CCol>
          <CCol md="3">
            <CRow>
              <CCol  >
                <CInput
                  label="From Date"
                  type="date"
                  horizontal
                  v-model="paramTopBookSold.fromTime"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol >
                <CInput
                  label="To Date"
                  type="date"
                  horizontal
                  v-model="paramTopBookSold.toTime"
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol col="1" class="mb-3 mb-xl-0">
            <CButton block color="primary" @click="getDataTopBookSold">Submit</CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <!-- Row 1 -->
        <CRow v-for="(book, id) in dataTopBookSold" :key="id" v-model="dataTopBookSold">
          <CCol sm="12" lg="12">
            <CWidgetProgress
              :header="book.book_nm"
              text="G. Wakeling"
              footer="Selective Entertainment LLC"
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
                        :header="`${120} Views - ${15} Comments`"
                        text="."
                        color="gradient-success"
                        inverse
                      />
                      <CWidgetProgress
                        :header="`REVENUE : ${formatCurrency(book.total_revenue)}`"
                        :text="`IMPORT COST : ${formatCurrency(dataBookImportX[id].total_spending)}`"
                        color="gradient-warning"
                        inverse
                        :value="67.2"
                      />
                    </CCol>
                    <CCol col="12" sm="12" lg="6">
                      <CWidgetProgressIcon
                        :header="`Sold Count : ${book.sold_count}`"
                        :text="`Import Count : ${dataBookImportX[id].import_count}`"
                        color="gradient-primary"
                        inverse
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
import WidgetsDropdown from './widgets/WidgetsDropdown'
import dashboardAPI from '@/api/dashboardAPI.js'
import moment from 'moment'
// import WidgetsBrand from './widgets/WidgetsBrand'
// import { CChartLineSimple, CChartBarSimple } from '@/views/charts/index.js'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    // WidgetsBrand,
    // CChartLineSimple,
    // CChartBarSimple
  },
  data () {
    return {
      dataTopBookSold : null,
      paramTopBookSold: {
        fromTime: '2021-05-01',
        toTime: '2021-06-30',
        top: 5
      },
      dataBookImport: null,
      dataBookImportX: [],
      paramBookImport: {
        fromTime: '2021-05-01',
        toTime: '2021-06-30'
      },
      reportType: 'Month',
      dataRevenue: [], 
      dataSpending: [],
      label: [],
      superTotalSpending: 0,
      superTotalRevenue: 0,

    }
  },
  created(){
    this.getDataTopBookSold();
    this.getDataRevenueAndSpending();
  },
  methods: {
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
      this.getDataRevenueAndSpending();
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
      let startOfMonth = moment().startOf('month').toDate();
      let endOfMonth = moment().endOf('month').toDate();
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
      let startOfYear = moment().startOf('year').toDate();
      let endOfYear = moment().endOf('year').toDate();
      // let yearText = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(endOfYear);
      /* custom Lable */
      this.label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
      }

      /* Gán giá trị cho superTotalSpending vs superTotalRevenue */
      me.superTotalSpending = parseFloat(me.dataSpending.reduce(function(prev, cur) {
        return prev + cur.TotalSpending;
      }, 0).toFixed(3));
      me.superTotalRevenue = parseFloat(me.dataRevenue.reduce(function(prev, cur) {
        return prev + cur.TotalRealRevenue;
      }, 0).toFixed(3));
    },
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
