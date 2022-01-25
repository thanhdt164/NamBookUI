<template>
  <CChartLine
    :datasets="customDatasets"
    :options="defaultOptions"
    :labels="label"
  />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: 'MainChartExample',
  data(){
    return {
      // defaultLabel : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    }
  },
  props:{
    label:{
      type: [Array, String],
      default: () => []
    },
    dataRevenue: {
      type: [Array, Object],
      default: () => []
    },
    dataSpending: {
      type: [Array, Object],
      default: () => []
    }
  },
  watch:{
    dataSpending: {
      handler(val){
        this.dataSpending = val;
      },
      // immediate: true
    },
    dataRevenue: {
      handler(val){
        this.dataRevenue = val;
      },
      // immediate: true
    }
  },
  components: {
    CChartLine
  },
  computed: {
    customDatasets() {
      const brandSuccess = getStyle('success2') || '#4dbd74'
      const brandInfo = getStyle('info') || '#20a8d8'

      return [
        {
          label: 'Tổng nhập',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: this.dataSpending.map(el => el.TotalSpending)
        },
        {
          label: 'Tổng bán',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: brandSuccess,
          borderWidth: 2,
          data: this.dataRevenue.map(el => el.TotalRealRevenue)
        }
      ]
    },

    defaultDatasets () {
      const brandSuccess = getStyle('success2') || '#4dbd74'
      const brandInfo = getStyle('info') || '#20a8d8'
      const brandDanger = getStyle('danger') || '#f86c6b'

      let elements = 27
      const data1 = []
      const data2 = []
      const data3 = []

      for (let i = 0; i <= elements; i++) {
        data1.push(random(50, 200))
        data2.push(random(80, 100))
        data3.push(65)
      }
      return [
        {
          label: 'My First dataset',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: data1
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: brandSuccess,
          borderWidth: 2,
          data: data2
        },
        {
          label: 'My Third dataset',
          backgroundColor: 'transparent',
          borderColor: brandDanger,
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,
          borderDash: [8, 5],
          data: data3
        }
      ]
    },
    defaultOptions () {
      return {

        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5)
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 8
          }
        }
      }
    }
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
  },

}
</script>
