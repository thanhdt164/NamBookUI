<template>
  <div>
  <CCard> 
   <CCardBody>
     <DxToast
      :visible="isVisibleToast"
      :message="messageToast"
      :type="typeToast"
      position="bottom left"
    />
    <CDataTable
      :items="items"
      :fields="fields"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="10"
      hover 
      sorter
      pagination
    >
      <template #status="{item}" >
        <td>
          <CBadge :color="getBadge(item.status)">
            {{item.status}}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Ẩn' : 'Hiện'}}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration" v-for="(ele,id) in item.books" :key="id">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 0 }">
              <CRow>
                  <CCol col="1.7">
                    <img :src="ele.book_avatar" alt="">
                  </CCol>
                  <CCol col="6">
                    <h4>
                      {{ele.book_nm}}
                    </h4>

                    <p>Giá nhập: <b>{{formatCurrency(ele.import_price)}}</b></p>
                    <p>Số lượng: <b>{{ele.amount}}</b></p>
                    <p>Tổng giá nhập riêng: <b>{{formatCurrency(ele.total_import_price)}}</b></p>
                  </CCol>
                  <CCol col="">
                     
                  </CCol>
                  <CCol col="2">
                    <p class="text-muted" style="height: 60px"></p>
                    <!-- <CButton size="sm" color="info" class="" @click="handleEditPayload(item)">
                      Sửa thông tin
                    </CButton> -->
                    <!-- <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton> -->
                  </CCol>
              </CRow>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
  </CCard>

  <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <strong>Thông tin khối hàng</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <!-- <CInput
                label="Tên khối hàng"
                horizontal
              /> -->
              <CRow form class="form-group">
                <CCol tag="label" sm="3" class="col-form-label">
                  Chọn sách nhập
                </CCol>
                <div class="scroll">
                  <CCol v-for="(book, id) in booksData" :key="id">
                    <CInputCheckbox
                      :label="book.book_nm"
                      
                      @update:checked="updateChecked(book)"
                    />
                  </CCol>
                </div>
              </CRow>
              <CRow>
                <CCol tag="label" sm="3" class="col-form-label">
                  
                </CCol>
                <CCol tag="label" sm="9" class="col-form-label">
                  <CRow  
                    style="display: block; border: 1px solid #3e3e3e; padding: 8px; border-radius: 4px; margin-bottom: 4px" 
                    v-for="(obj, id) in bookSelected" 
                    :key="id">
                    <CInput
                      col="6"
                      :label="'Tên sách: ' + obj.book_nm"
                      type="number"
                      :min='0'
                      v-model="obj.amount"
                      :horizontal="{ label: 'col-sm-8', input: 'col-sm-4'}"
                    />
                    <CInput
                      label="Giá nhập:"
                      :horizontal="{ label: 'col-sm-8', input: 'col-sm-4'}"
                      type="number"
                      :min='0'
                      v-model="obj.import_price"
                      @update:value="changePrice(obj.book_id)"
                      style="margin-bottom : 0"
                    />
                  </CRow>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" @click="handleSavePayload"><CIcon name="cil-check-circle" /> Xác nhận</CButton>
            <!-- <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton> -->
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
import payloadAPI from '@/api/payloadAPI.js'
import bookAPI from '@/api/bookAPI.js'
import { DxToast } from 'devextreme-vue/toast';

export default {
  name: 'Books',
  components:{
    DxToast
  },
  data () {
    return {
      items : [],
      options : [1, 2, 3],
      collapseDuration: 0,
      details: [],
      fields: [
        { key: 'username', _style:'min-width:200px' },
        'registered',
        { key: 'role', _style:'min-width:100px;' },
        { key: 'status', _style:'min-width:100px;' },
        { 
          key: 'show_details', 
          label: '', 
          _style: 'width:1%', 
          sorter: false, 
          filter: false
        }
      ],
      payloads: null,
      /* Thông báo */
      isVisibleToast: false,
      messageToast: "Thành công",
      typeToast: "success",
      booksData: null,
      bookSelected: [], // Danh sách sách đang chọn để nhập
    }
  },
  created(){
    let itemsX = [
      { username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
      { username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
      { username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
      { username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
      { username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
      { username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
      { username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
      { username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
      { username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
      { username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
      { username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-info'},
      { username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'}];
    this.items= itemsX.map((item, id) => { return {...item, id}});
    this.getDataPayload();
    bookAPI.getAll(res => {
      this.booksData = res;
    });
  },
  methods: {
    /**
     * Hàm xử lý lưu khối hàng
     */
    handleSavePayload(){
      var maxId = this.payloads.map(el => el.payload_id).reduce((a, b) => {return a>b?a:b})
      this.bookSelected.filter(el => el.amount>0&&el.import_price>0).forEach(el => {
        var param = {
          payload_id: maxId+1,
          book_id: el.book_id,
          amount: parseInt(el.amount),
          import_price: parseFloat(el.import_price)
        }
        payloadAPI.Insert(param, (res) => {
          console.log(res)
        })
      })
    },
    updateChecked(book){
      var index = this.bookSelected.findIndex(el => el.book_id == book.book_id);
      if(index == -1){
        var obj = {
          book_id: book.book_id,
          book_nm: book.book_nm,
          amount: 0,
          import_price: 0
        }
        this.bookSelected.push(obj)
      }else{
        this.bookSelected.splice(index, 1)
      }
    },

    changePrice(book_id){
      var obj = this.bookSelected.find(el => el.book_id == book_id)
      obj.import_price = obj.import_price.replace('-','')
    },

     /**
     * Hiển thị thông báo
     */
    showToast(message = "Thành công", type = true) {
        this.isVisibleToast = false;
        setTimeout(() => {
            this.isVisibleToast = true;
        }, 0);
        this.messageToast = message;
        this.typeToast = type? 'success' : 'error';
    },

    getDataPayload(){
      var me = this;
      payloadAPI.getAll((res) => {
        res = res.filter(el => el.payload_id != 10000);
        // Gán cho payloads
        this.payloads = res;
        
        res.reverse();
        /* Xử lý dữ liệu */
        let payloadIds = [];
        res.forEach(el => {
          if(payloadIds.indexOf(el.payload_id) == -1){
            payloadIds.push(el.payload_id)
          }
        })

        let resX = []
        let id = -1
        res.forEach(el => {
            let pos = payloadIds.indexOf(el.payload_id)
            if(pos != -1){
              id += 1
              resX.push({})
              resX[id].payload_id = el.payload_id;
              resX[id].payload_nm = `Khối hàng số ${el.payload_id}`;
              resX[id].import_date = el.import_date;
              
              resX[id].books = []
              payloadIds.splice(pos, 1)
            }
            resX[id].books.push(el)
            // Tính tổng giá nhập của khối hàng
            if(resX[id].payload_total_price){
              resX[id].payload_total_price += el.total_import_price;
            }else{
              resX[id].payload_total_price = el.total_import_price;
            }
        })
        setTimeout(() => {
          me.setItems(resX)
          me.setFields(resX)
        }, 10);
      })
    },
    setItems(res){
      this.items = res.map((item, id) => { 
        Object.keys(item).forEach(key => {
          if(key == "created_at" || key.indexOf('date') != -1){
            item[key] = this.formatDate(item[key], 4);
          }
          if(item[key] == null) item[key] = "";
          if(key.includes('price')){
            item[key] = this.formatCurrency(item[key])
          }
        })
        return {...item, id}
      });
    },
    setFields(res){
      let ignoreFields = ["updated_at", "deleted_at", "books"]
      let keyvalue = {
        payload_nm: "Tên khối hàng",
        import_date: "Ngày nhập",
        payload_total_price: "Tổng giá nhập"
      }
      this.fields = []
      Object.keys(res[0]).forEach(it => {
        if(!ignoreFields.includes(it) && it.indexOf('id') == -1){
          this.fields.push({
            key: it,
            label: keyvalue[it]?keyvalue[it]:it,
            _style:'min-width:100px;'
          })
        }
      })
      this.fields.push({ 
          key: 'show_details', 
          label: '', 
          _style: 'width:1%', 
          sorter: false, 
          filter: false
        })
    },

    /**
     * Hàm xử lý sửa khối hàng
     */
    handleEditPayload(item){
      console.log(item)
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

    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },  
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    validator (val) {
      return val ? val.length >= 4 : false
    },
     /**
     * Hàm format dữ liệu dạng ngày tháng
     * Created by: thanhdt - 12.05.2021
     */
    formatDate(date, type){
        date = new Date(date)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        if(month<10){
          month = '0' + month;
        }
        if (type == 1) {
            return `${mo} ${ye}`
        }
        if (type == 2) {
            return `${mo} ${da}, ${ye}`
        }
        if(type == 3){
            return `${mo} ${da} ${ye}`
        }
        if(type == 4){
          return `${year}-${month}-${da}`
        }
    },
  }
}
</script>

<style scoped lang="scss">
.scroll{
  max-height: 117px;
  overflow-y: auto;
  width: 74.7%;
}
</style>
